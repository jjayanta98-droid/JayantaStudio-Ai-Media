import React from 'react';
import { ToolType } from '../types';
import { TOOLS } from '../constants';

interface LayoutProps {
  currentTool: ToolType | 'dashboard';
  onNavigate: (tool: ToolType | 'dashboard') => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ currentTool, onNavigate, children }) => {
  return (
    <div className="min-h-screen flex bg-background text-white overflow-hidden selection:bg-primary selection:text-white">
      {/* Sidebar */}
      <aside className="w-20 lg:w-64 flex-shrink-0 glass-panel border-r border-slate-700 flex flex-col z-20">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-700/50">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-lg font-bold">N</span>
          </div>
          <span className="ml-3 font-bold text-xl tracking-tight hidden lg:block bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            NanoStudio
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-2 px-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
              currentTool === 'dashboard'
                ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-white border border-primary/20'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-xl">🏠</span>
            <span className="hidden lg:block font-medium">Dashboard</span>
          </button>

          <div className="px-3 py-2">
            <p className="hidden lg:block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Tools
            </p>
            <div className="space-y-1">
              {TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => onNavigate(tool.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                    currentTool === tool.id
                      ? 'bg-white/10 text-white shadow-sm'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{tool.icon}</span>
                  <span className="hidden lg:block font-medium text-sm truncate">{tool.title}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <div className="glass-panel p-3 rounded-xl text-center">
             <span className="text-xs text-slate-400 block lg:hidden">Pro</span>
             <p className="text-xs text-slate-400 hidden lg:block">Running Gemini 2.5 Flash</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <header className="h-16 flex items-center justify-between px-6 lg:px-10 border-b border-slate-700/30 backdrop-blur-sm z-10">
          <h1 className="text-lg font-medium text-slate-200">
            {currentTool === 'dashboard' 
              ? 'Dashboard' 
              : TOOLS.find(t => t.id === currentTool)?.title}
          </h1>
          <div className="flex items-center gap-4">
             <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"></div>
             <span className="text-xs text-slate-400 font-mono">SYSTEM ONLINE</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-10 z-10 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {children}
        </div>
      </main>
    </div>
  );
};