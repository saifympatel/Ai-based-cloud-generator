import React from 'react';
import { 
  LayoutDashboard,
  FolderGit2,
  FileText,
  FileCheck2,
  Lightbulb, 
  Bot, 
  Layers, 
  Code, 
  ShieldCheck, 
  DownloadCloud,
  CheckCircle2,
  Activity
} from 'lucide-react';

export default function Sidebar({ currentTab, setTab, progressStep, activeProject }) {
  const primaryTabs = [
    { id: 'overview', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'All Projects', icon: FolderGit2 },
    { id: 'status', label: 'Project Status', icon: Activity },
  ];

  const pipelineTabs = [
    { id: 'input', label: '1. Requirements', icon: FileText, step: 1 },
    { id: 'spec', label: '2. Structured Spec', icon: FileCheck2, step: 2 },
    { id: 'suggestions', label: '3. AI Suggestions', icon: Lightbulb, step: 3 },
    { id: 'agents', label: '4. Agent Execution', icon: Bot, step: 4 },
    { id: 'architecture', label: '5. Cloud Architecture', icon: Layers, step: 5 },
    { id: 'code', label: '6. Generated Code', icon: Code, step: 6 },
    { id: 'reports', label: '7. Security & Cost', icon: ShieldCheck, step: 7 },
    { id: 'export', label: '8. One-Click Export', icon: DownloadCloud, step: 8 },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-4">
        {/* Primary Navigation */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3 py-1 font-mono">
            Navigation
          </div>
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-slate-800 text-blue-400 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Pipeline Steps */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold px-3 py-1 font-mono">
            Architecture Pipeline
          </div>
          {pipelineTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            const isDone = progressStep > tab.step;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </div>
                {isDone && !isActive && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Project Card */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-xs text-slate-400 space-y-1.5">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 font-mono font-semibold">
          Active Workspace
        </div>
        <div className="text-xs font-bold text-white truncate">
          {activeProject?.name || 'CloudScale E-Commerce'}
        </div>
        <div className="flex justify-between items-center text-[11px] pt-1 border-t border-slate-700/50">
          <span className="text-slate-500">Est. Bill:</span>
          <span className="text-emerald-400 font-mono font-semibold">
            ₹{activeProject?.estimatedCost?.toLocaleString() || '22,000'}
          </span>
        </div>
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-slate-500">Security:</span>
          <span className="text-cyan-400 font-mono font-semibold">
            {activeProject?.securityScore || 91} / 100
          </span>
        </div>
      </div>
    </aside>
  );
}
