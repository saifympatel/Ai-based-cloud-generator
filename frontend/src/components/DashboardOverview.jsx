import React from 'react';
import { 
  FolderGit2, 
  ShieldCheck, 
  IndianRupee, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ArrowRight, 
  Sparkles, 
  DownloadCloud, 
  PlusCircle,
  Clock,
  Server,
  Terminal
} from 'lucide-react';

export default function DashboardOverview({ 
  activeProject, 
  onNavigateTab, 
  onOpenNewProjectModal 
}) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Welcome & Active Project Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center space-x-2 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-mono">
              <span>Active Project</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="capitalize">{activeProject.domain}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {activeProject.name}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeProject.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenNewProjectModal}
              className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl transition shadow"
            >
              <PlusCircle className="w-4 h-4 text-blue-400" />
              <span>New Project</span>
            </button>

            <button
              onClick={() => onNavigateTab('input')}
              className="flex items-center space-x-1.5 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition"
            >
              <span>Resume Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core System KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Agents */}
        <div 
          onClick={() => onNavigateTab('agents')}
          className="cursor-pointer bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-2 transition group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Specialized Agents</span>
            <Cpu className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-white">10 / 10</div>
          <div className="text-[11px] text-emerald-400 flex items-center space-x-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Closed-Loop Active</span>
          </div>
        </div>

        {/* KPI 2: Security Score */}
        <div 
          onClick={() => onNavigateTab('reports')}
          className="cursor-pointer bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-2 transition group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Security Compliance</span>
            <ShieldCheck className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-cyan-400">{activeProject.securityScore} / 100</div>
          <div className="text-[11px] text-slate-400 font-mono">
            CIS AWS Benchmark Pass
          </div>
        </div>

        {/* KPI 3: Cost Optimization */}
        <div 
          onClick={() => onNavigateTab('reports')}
          className="cursor-pointer bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-2 transition group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Estimated Monthly Bill</span>
            <IndianRupee className="w-4 h-4 text-amber-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-emerald-400">
            ₹{activeProject.estimatedCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">
            ₹{(activeProject.budget - activeProject.estimatedCost).toLocaleString()} Under Budget
          </div>
        </div>

        {/* KPI 4: Coverage */}
        <div 
          onClick={() => onNavigateTab('architecture')}
          className="cursor-pointer bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 space-y-2 transition group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Traceability Coverage</span>
            <Layers className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition" />
          </div>
          <div className="text-2xl font-black text-white">100%</div>
          <div className="text-[11px] text-blue-400 font-mono">
            Zero Unmapped Features
          </div>
        </div>
      </div>

      {/* Quick Access Pipeline Stages */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
          <Server className="w-4 h-4 text-blue-400" />
          <span>Product Engineering Pipeline (Day 1 - 30 Closed-Loop Flow)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => onNavigateTab('input')}
            className="cursor-pointer bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 space-y-2 transition group"
          >
            <div className="text-xs font-bold text-blue-400 group-hover:text-blue-300">
              1. Requirements & Spec
            </div>
            <p className="text-xs text-slate-400">
              Input natural language prompt, configure user capacity & budget constraints.
            </p>
            <div className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
              <span>Status:</span>
              <span className="text-emerald-400">Analyzed ✓</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigateTab('architecture')}
            className="cursor-pointer bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 space-y-2 transition group"
          >
            <div className="text-xs font-bold text-indigo-400 group-hover:text-indigo-300">
              2. Interactive Cloud Topology
            </div>
            <p className="text-xs text-slate-400">
              Inspect AWS Multi-AZ topology and compare 3 cost/performance alternatives.
            </p>
            <div className="text-[11px] text-slate-500 font-mono flex items-center space-x-1">
              <span>Profile:</span>
              <span className="text-blue-400">Balanced (Recommended)</span>
            </div>
          </div>

          <div 
            onClick={() => onNavigateTab('export')}
            className="cursor-pointer bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 space-y-2 transition group"
          >
            <div className="text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
              3. One-Click Project Export
            </div>
            <p className="text-xs text-slate-400">
              Download complete ZIP containing React, FastAPI, PostgreSQL, Docker, and Terraform.
            </p>
            <div className="text-[11px] text-emerald-400 font-mono flex items-center space-x-1">
              <DownloadCloud className="w-3.5 h-3.5" />
              <span>Ready for ZIP packaging</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
