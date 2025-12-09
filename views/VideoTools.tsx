import React, { useState } from 'react';
import { ToolType } from '../types';
import { TOOLS } from '../constants';
import { Button } from '../components/Button';

interface VideoToolsProps {
  type: ToolType;
}

export const VideoTools: React.FC<VideoToolsProps> = ({ type }) => {
  const toolInfo = TOOLS.find(t => t.id === type);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);

  const isDownloader = type === ToolType.YOUTUBE_DOWNLOADER || type === ToolType.INSTAGRAM_DOWNLOADER;

  const handleStart = () => {
    setStatus('processing');
    setProgress(0);
    
    // Simulation of processing time
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus('completed');
          return 100;
        }
        return prev + (Math.random() * 8);
      });
    }, 400);
  };

  const reset = () => {
    setFile(null);
    setUrl('');
    setStatus('idle');
    setProgress(0);
  };

  if (!toolInfo) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${toolInfo.color}`}>
          {toolInfo.title}
        </h2>
        <p className="text-slate-400">{toolInfo.description}</p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border-t border-slate-700/50">
        {status === 'completed' ? (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white">Processing Complete!</h3>
            <p className="text-slate-400">Your enhanced file is ready.</p>
            <div className="flex justify-center gap-4">
               <Button onClick={reset} variant="secondary">Process Another</Button>
               <Button onClick={() => alert("File downloaded!")}>Download Result</Button>
            </div>
          </div>
        ) : status === 'processing' ? (
           <div className="space-y-6 py-12">
             <div className="flex justify-between text-slate-300 font-medium text-sm">
               <span>Processing with AI...</span>
               <span>{Math.floor(progress)}%</span>
             </div>
             <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden shadow-inner relative">
               <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
               <div 
                  className={`h-full bg-gradient-to-r ${toolInfo.color} transition-all duration-200 ease-linear`}
                  style={{ width: `${progress}%` }}
               ></div>
             </div>
             <div className="grid grid-cols-3 gap-4 text-center text-xs text-slate-500 mt-8">
                <div className="bg-slate-900/50 p-2 rounded">Analyzing Frames</div>
                <div className="bg-slate-900/50 p-2 rounded">Reducing Noise</div>
                <div className="bg-slate-900/50 p-2 rounded">Enhancing Output</div>
             </div>
           </div>
        ) : (
          <div className="space-y-6">
            {isDownloader ? (
              <div className="space-y-4">
                 <label className="block text-sm font-medium text-slate-300">Paste Video URL</label>
                 <div className="flex gap-2">
                   <input 
                      type="url" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={`https://www.${type === ToolType.YOUTUBE_DOWNLOADER ? 'youtube' : 'instagram'}.com/watch?v=...`}
                      className="flex-1 bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                   />
                 </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-600 hover:border-slate-400 bg-slate-900/30 hover:bg-slate-900/50 rounded-xl p-12 text-center transition-all cursor-pointer relative group">
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <div className="space-y-2 pointer-events-none group-hover:scale-105 transition-transform">
                  <span className="text-5xl block mb-4 filter drop-shadow-lg">📁</span>
                  <p className="text-lg font-medium text-white">
                    {file ? file.name : "Drag & Drop Video Here"}
                  </p>
                  <p className="text-sm text-slate-400">
                    {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Supports MP4, MOV, MKV (Max 2GB)"}
                  </p>
                </div>
              </div>
            )}

            {/* Advanced Options Section */}
            {!isDownloader && (
               <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-700/50 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-yellow-500">⚙️</span>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Advanced Settings</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {type === ToolType.VIDEO_NOISE_CLEAR && (
                        <>
                           <div>
                             <label className="block text-xs text-slate-400 mb-1">Denoise Strength</label>
                             <select className="w-full bg-slate-800 border border-slate-700 rounded-lg text-sm p-2 text-white">
                                 <option>Low (Preserve Details)</option>
                                 <option selected>Medium (Balanced)</option>
                                 <option>High (Aggressive)</option>
                              </select>
                           </div>
                           <div>
                             <label className="block text-xs text-slate-400 mb-1">Audio Cleaning</label>
                             <select className="w-full bg-slate-800 border border-slate-700 rounded-lg text-sm p-2 text-white">
                                 <option>Off</option>
                                 <option selected>Remove Hiss/Hum</option>
                                 <option>Voice Isolation (AI)</option>
                              </select>
                           </div>
                        </>
                     )}
                     
                     {type === ToolType.VIDEO_QUALITY_INCREASE && (
                        <>
                           <div>
                             <label className="block text-xs text-slate-400 mb-1">Target Resolution</label>
                             <select className="w-full bg-slate-800 border border-slate-700 rounded-lg text-sm p-2 text-white">
                                 <option>1080p FHD</option>
                                 <option selected>4K UHD (Upscale)</option>
                                 <option>8K (Experimental)</option>
                              </select>
                           </div>
                           <div>
                             <label className="block text-xs text-slate-400 mb-1">AI Model</label>
                             <select className="w-full bg-slate-800 border border-slate-700 rounded-lg text-sm p-2 text-white">
                                 <option>Real-ESRGAN</option>
                                 <option selected>Gemini Video Enhance (Pro)</option>
                                 <option>Fast Restore</option>
                              </select>
                           </div>
                           <div className="col-span-2 flex items-center gap-4 mt-2">
                             <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                                <input type="checkbox" className="rounded bg-slate-800 border-slate-600 text-primary focus:ring-0" defaultChecked />
                                <span>Color Correction</span>
                             </label>
                             <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                                <input type="checkbox" className="rounded bg-slate-800 border-slate-600 text-primary focus:ring-0" />
                                <span>Frame Interpolation (60fps)</span>
                             </label>
                           </div>
                        </>
                     )}

                     {type === ToolType.MP4_TO_MP3 && (
                        <>
                          <div>
                             <label className="block text-xs text-slate-400 mb-1">Audio Bitrate</label>
                             <select className="w-full bg-slate-800 border border-slate-700 rounded-lg text-sm p-2 text-white">
                                <option>128 kbps</option>
                                <option>192 kbps</option>
                                <option selected>320 kbps (Studio)</option>
                             </select>
                          </div>
                          <div>
                             <label className="block text-xs text-slate-400 mb-1">Format</label>
                             <select className="w-full bg-slate-800 border border-slate-700 rounded-lg text-sm p-2 text-white">
                                <option selected>MP3</option>
                                <option>WAV (Lossless)</option>
                                <option>AAC</option>
                             </select>
                          </div>
                        </>
                     )}
                  </div>
               </div>
            )}

            <Button 
               className="w-full py-4 text-lg font-bold shadow-lg shadow-primary/20" 
               onClick={handleStart}
               disabled={!file && !url}
               variant="primary"
            >
               {isDownloader ? 'Fetch & Download' : `Start ${toolInfo.title.replace('AI ', '')}`}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};