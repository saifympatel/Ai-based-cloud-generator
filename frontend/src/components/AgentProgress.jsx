import React, { useState } from 'react';
import { 
  Bot, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw,
  ShieldAlert,
  Wrench,
  Check
} from 'lucide-react';

export default function AgentProgress({ agents, onProceedToArchitecture }) {
  const [selfCorrectionState, setSelfCorrectionState] = useState('idle'); // 'idle' | 'running' | 'repaired'

  const handleSimulateSelfCorrection = () => {
    setSelfCorrectionState('running');
    setTimeout(() => {
      setSelfCorrectionState('repaired');
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>Agentic AI Orchestrator Execution</span>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
              10 Specialized Agents (LangGraph)
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Section 9 & 20: Closed-loop multi-agent collaboration with automatic error detection and repair.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSimulateSelfCorrection}
            disabled={selfCorrectionState === 'running'}
            className="flex items-center space-x-1.5 text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-2 rounded-xl transition"
            title="Demonstrate Section 20/41: Deliberate error detection & automatic self-correction"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Self-Correction Loop</span>
          </button>

          <button
            onClick={onProceedToArchitecture}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition flex items-center space-x-2"
          >
            <span>View Architecture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Self-Correction Banner (Section 20 & 41) */}
      {selfCorrectionState === 'running' && (
        <div className="bg-amber-950/40 border border-amber-500/50 rounded-2xl p-5 space-y-3 animate-pulse">
          <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Self-Correction Cycle Triggered (Section 20 Loop)</span>
          </div>
          <div className="font-mono text-xs text-slate-300 space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800">
            <div className="text-rose-400 font-semibold">[DETECTED] Validator Agent flagged: RDS port 5432 exposed to 0.0.0.0/0 in generated terraform/database.tf!</div>
            <div className="text-amber-400">[ANALYZING] Security Agent diagnosing rule violation (CIS Benchmark 4.1: Database isolation)...</div>
            <div className="text-blue-400">[REPAIRING] Regenerating database security group with restricted ingress from ALB SG only...</div>
          </div>
        </div>
      )}

      {selfCorrectionState === 'repaired' && (
        <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Self-Correction Succeeded (Automatic Repair Verified)</span>
            </div>
            <span className="text-[11px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
              Pass Rate: 100%
            </span>
          </div>
          <div className="font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
            <div className="text-emerald-400">[PATCH APPLIED] Inbound CIDR 0.0.0.0/0 replaced with aws_security_group.alb_sg.id.</div>
            <div className="text-slate-400">[RETEST] Validator Agent rerun: 0 errors detected. Security Score restored to 91/100.</div>
          </div>
        </div>
      )}

      {/* Agents Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono text-xs font-bold">
                  {agent.id}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-200">{agent.name}</h3>
                  <span className="text-[10px] text-slate-500 font-mono">Latency: {agent.time}</span>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full font-medium">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span className="capitalize">{agent.status}</span>
              </div>
            </div>

            <div className="bg-slate-950/80 rounded-lg p-2.5 border border-slate-800/80 text-[11px] font-mono text-slate-300 flex items-start space-x-2">
              <Terminal className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <span className="leading-tight">{agent.message}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Traceability Summary */}
      <div className="bg-blue-950/30 border border-blue-800/40 rounded-xl p-4 flex items-start space-x-3">
        <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-semibold text-blue-300">Closed-Loop Validation Contract</div>
          <div className="text-slate-400 leading-relaxed">
            All 10 agents execute sequentially with state sharing. If tests or security checks fail downstream, the responsible agent automatically executes the repair routine before project export is permitted.
          </div>
        </div>
      </div>
    </div>
  );
}
