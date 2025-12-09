import React, { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { enhanceImage } from '../services/geminiService';

export const ImageEnhancer: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnhance = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    try {
      const result = await enhanceImage(selectedImage);
      setResultImage(result);
    } catch (error) {
      alert("Failed to enhance image. Ensure your API key is valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
          AI Image Enhancer
        </h2>
        <p className="text-slate-400">
          Turn low-quality images into 4K masterpieces. Remove noise and sharpen details instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="glass-panel rounded-2xl p-6 space-y-6 flex flex-col">
          <h3 className="text-lg font-medium text-slate-300">Original Image</h3>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`flex-1 border-2 border-dashed rounded-xl min-h-[300px] flex flex-col items-center justify-center cursor-pointer transition-all ${
              selectedImage ? 'border-blue-500/50 bg-slate-900/50' : 'border-slate-600 hover:border-blue-400 hover:bg-slate-800/30'
            }`}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Original" className="h-full w-full object-contain rounded-lg p-2" />
            ) : (
              <div className="text-center space-y-2 text-slate-400">
                <svg className="w-16 h-16 mx-auto mb-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-medium">Click to upload low-quality image</p>
                <p className="text-xs text-slate-500">Supports JPG, PNG, WEBP</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
          
          <Button 
            onClick={handleEnhance} 
            disabled={!selectedImage || isProcessing}
            className="w-full py-3 text-lg shadow-blue-500/20"
            variant="primary"
          >
            {isProcessing ? 'Enhancing Quality...' : '✨ Enhance to 4K'}
          </Button>
        </div>

        {/* Output Section */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-medium text-green-400">Enhanced Result</h3>
          <div className="flex-1 bg-slate-900/50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-700/50 min-h-[300px] relative">
             {isProcessing ? (
               <div className="flex flex-col items-center gap-4 animate-pulse">
                 <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-blue-400">AI</div>
                 </div>
                 <p className="text-blue-400 font-medium">Upscaling & Denoising...</p>
               </div>
             ) : resultImage ? (
               <div className="relative group w-full h-full flex items-center justify-center p-2">
                 <img src={resultImage} alt="Enhanced" className="h-full w-full object-contain rounded-lg shadow-2xl" />
                 
                 {/* Comparison Badge */}
                 <div className="absolute top-4 right-4 bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm">
                   4K UPSCALE
                 </div>

                 <div className="absolute bottom-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    <a href={resultImage} download="enhanced-image.png" className="bg-white text-slate-900 px-6 py-2 rounded-full shadow-xl font-bold hover:bg-slate-100 transition-colors">
                      Download HD
                    </a>
                 </div>
               </div>
             ) : (
               <div className="text-center text-slate-600">
                 <span className="text-6xl opacity-20 block mb-4">✨</span>
                 <p>Enhanced image will appear here</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};
