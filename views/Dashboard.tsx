import React from 'react';
import { ToolType } from '../types';
import { TOOLS } from '../constants';

interface DashboardProps {
  onNavigate: (tool: ToolType) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">NanoStudio</span>
        </h2>
        <p className="text-slate-400 text-lg">
          Select a tool to begin your creative workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS.map((tool) => (
          <button
            key={tool.id}
            onClick={() => onNavigate(tool.id)}
            className="group relative overflow-hidden rounded-2xl glass-panel p-6 text-left transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 border border-slate-700 hover:border-primary/30"
          >
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
               <div className={`w-32 h-32 rounded-full blur-2xl bg-gradient-to-br ${tool.color}`}></div>
            </div>
            
            <div className="relative z-10 space-y-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl shadow-lg`}>
                {tool.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{tool.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{tool.description}</p>
              </div>
              <div className="pt-2 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                Launch Tool <span className="ml-2">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};