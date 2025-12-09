import React, { useState } from 'react';
import { Button } from '../components/Button';
import { generateTags } from '../services/geminiService';
import { TagResult } from '../types';

export const TagGenerator: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState<TagResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setIsProcessing(true);
    try {
      const data = await generateTags(keyword);
      setResults(data);
    } catch (error) {
      alert("Error generating tags. Please check your network or API limit.");
    } finally {
      setIsProcessing(false);
    }
  };

  const copyTags = (tags: string[]) => {
    navigator.clipboard.writeText(tags.join(', '));
    // Optional: Add toast here
    alert('Tags copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-400">
          Smart Tag Generator
        </h2>
        <p className="text-slate-400">
          Get real-time, high-value keywords for YouTube and Instagram based on trends.
        </p>
      </div>

      <div className="glass-panel p-2 rounded-xl flex items-center gap-2 max-w-2xl mx-auto border border-slate-600 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500 transition-all">
        <span className="pl-4 text-2xl">🔍</span>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a main keyword (e.g., 'Fitness', 'Cyberpunk', 'ReactJS')"
          className="flex-1 bg-transparent border-none text-white placeholder-slate-500 focus:outline-none h-12"
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
        <Button onClick={handleGenerate} disabled={isProcessing} className="m-1">
          {isProcessing ? 'Analyzing...' : 'Generate Tags'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {results.map((result, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-xl space-y-4 hover:border-pink-500/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-slate-300 border border-slate-600">
                    Vol: {result.searchVolume}
                 </div>
                 <div className="px-3 py-1 rounded-full bg-slate-800 text-xs font-mono text-slate-300 border border-slate-600">
                    Trend: {result.trendingScore}/100
                 </div>
              </div>
              <button 
                onClick={() => copyTags(result.tags)}
                className="text-sm text-pink-400 hover:text-pink-300 font-medium"
              >
                Copy All
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {result.tags.map((tag, tIdx) => (
                <span 
                  key={tIdx} 
                  className="px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-200 border border-pink-500/20 text-sm hover:bg-pink-500/20 transition-colors cursor-default"
                >
                  #{tag.replace(/^#/, '')}
                </span>
              ))}
            </div>
          </div>
        ))}

        {!isProcessing && results.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p>Enter a keyword above to discover trending tags.</p>
          </div>
        )}
      </div>
    </div>
  );
};