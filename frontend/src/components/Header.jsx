import React from 'react';
import { Cloud, Sparkles, Presentation, CheckCircle2 } from 'lucide-react';

export default function Header({ 
  onResetDemo, 
  isLiveMode, 
  setIsLiveMode, 
  isBackendOnline,
  onOpenPresentationMode 
}) {
  return (
    <header className="bg-slate-900/95 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-50 backdrop-blur">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Cloud className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              AI PRODUCT ARCHITECT
            </h1>
            <span className="text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-mono font-medium">
              Member 3 • Full-Stack / Cloud
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Agentic AI & Fine-Tuned Model Full-Stack Product & AWS Architecture Generator
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Presentation & Viva Defense Mode Button */}
        <button
          onClick={onOpenPresentationMode}
          className="flex items-center space-x-1.5 text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium px-3.5 py-1.5 rounded-lg shadow-md shadow-purple-600/20 transition"
          title="Open Executive Academic Presentation Mode"
        >
          <Presentation className="w-3.5 h-3.5" />
          <span>Presentation Mode</span>
        </button>

        {/* Backend Mode Switcher (Mock vs Live API) */}
        <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => setIsLiveMode(false)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition ${
              !isLiveMode 
                ? 'bg-blue-600 text-white font-medium shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Mock Engine</span>
          </button>

          <button
            onClick={() => setIsLiveMode(true)}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md transition ${
              isLiveMode 
                ? 'bg-blue-600 text-white font-medium shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Connects to Member 2 FastAPI server at http://localhost:8000"
          >
            <span className={`w-2 h-2 rounded-full ${isBackendOnline ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span>Live FastAPI</span>
          </button>
        </div>

        {/* Load Demo Button */}
        <button
          onClick={onResetDemo}
          className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition"
          title="Load Section 41 Demo Scenario (50k users / ₹30k budget)"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Demo Scenario</span>
        </button>

        <div className="hidden lg:flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs text-emerald-400">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span className="font-mono">10 Agents Ready</span>
        </div>
      </div>
    </header>
  );
}
