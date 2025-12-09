import React, { useState, useRef } from 'react';
import { Button } from '../components/Button';
import { editImage } from '../services/geminiService';

export const ImageEditor: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImage(null); // Reset result on new upload
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!selectedImage || !prompt) return;

    setIsProcessing(true);
    try {
      const result = await editImage(selectedImage, prompt);
      setResultImage(result);
    } catch (error) {
      alert("Failed to edit image. Please ensure your API key supports Gemini 2.5 Flash Image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
          Generative Image Edit
        </h2>
        <p className="text-slate-400">
          Powered by Gemini 2.5 Flash Image (Nano Banana). Describe changes like "Add a retro filter" or "Make it snowing".
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer transition-all ${
              selectedImage ? 'border-primary/50 bg-slate-900/50' : 'border-slate-600 hover:border-slate-400 hover:bg-slate-800/30'
            }`}
          >
            {selectedImage ? (
              <img src={selectedImage} alt="Original" className="h-full object-contain rounded-lg" />
            ) : (
              <div className="text-center space-y-2 text-slate-400">
                <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Click to upload an image</p>
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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Edit Instruction</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Change the background to a futuristic city..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none h-24"
              />
            </div>
            <Button 
              onClick={handleEdit} 
              disabled={!selectedImage || !prompt || isProcessing}
              className="w-full"
            >
              Generate Edit
            </Button>
          </div>
        </div>

        {/* Output Section */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-medium text-white mb-4">Result</h3>
          <div className="flex-1 bg-slate-900/50 rounded-xl flex items-center justify-center overflow-hidden border border-slate-700/50 min-h-[300px]">
             {isProcessing ? (
               <div className="flex flex-col items-center gap-4 animate-pulse">
                 <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                 <p className="text-primary font-medium">Gemini is dreaming...</p>
               </div>
             ) : resultImage ? (
               <div className="relative group w-full h-full flex items-center justify-center">
                 <img src={resultImage} alt="Result" className="max-h-full max-w-full object-contain rounded-lg" />
                 <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={resultImage} download="gemini-edit.png" className="bg-primary text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium hover:bg-primary/90">
                      Download
                    </a>
                 </div>
               </div>
             ) : (
               <p className="text-slate-500">Result will appear here</p>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};