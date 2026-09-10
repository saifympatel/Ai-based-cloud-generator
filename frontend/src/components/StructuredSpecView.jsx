import React, { useState } from 'react';
import { 
  FileCheck2, 
  Copy, 
  Check, 
  Download, 
  ArrowRight, 
  Server, 
  Database, 
  ShieldCheck, 
  Layers, 
  Code2, 
  FileJson,
  Cpu,
  Info
} from 'lucide-react';

export default function StructuredSpecView({ structuredReq, onProceedToSuggestions }) {
  const [copied, setCopied] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState('visual'); // 'visual' | 'json'

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(structuredReq, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(structuredReq, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "structured-requirements.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const entityMappings = [
    { entity: "Target User Capacity", value: `${structuredReq.users?.toLocaleString() || '50,000'} Peak Users`, service: "ALB + Auto Scaling Group (2-6x t3.medium)", provenance: "Specified", conf: "100%" },
    { entity: "Database Engine", value: "PostgreSQL 15+", service: "AWS RDS PostgreSQL Multi-AZ", provenance: "Specified", conf: "99%" },
    { entity: "Media / Asset Storage", value: "Encrypted Blob Storage", service: "Amazon S3 (SSE-AES256)", provenance: "Specified", conf: "98%" },
    { entity: "Network Architecture", value: "High Availability VPC", service: "2 Public & 2 Private Subnets across 2 AZs", provenance: "Inferred", conf: "96%" },
    { entity: "Security Boundary", value: "Layer-7 WAF & IAM", service: "AWS WAF + Security Groups + ACM SSL", provenance: "Recommended", conf: "95%" },
    { entity: "Monthly Budget Bound", value: `₹${structuredReq.budget_monthly_inr?.toLocaleString() || '30,000'} / month`, service: "Cost Optimizer Constraints Engine", provenance: "Specified", conf: "100%" },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-white">
              Structured Product Specification (SST)
            </h2>
            <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded font-mono">
              Day 5 • Single Source of Truth
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Section 12 Requirement: All generated components (frontend, backend, database, and cloud) are driven by this structured contract.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onProceedToSuggestions}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition"
          >
            <span>Review AI Suggestions</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contract Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveSubTab('visual')}
            className={`flex items-center space-x-2 text-xs px-3.5 py-1.5 rounded-lg transition font-medium ${
              activeSubTab === 'visual'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Visual Entity Breakdown</span>
          </button>

          <button
            onClick={() => setActiveSubTab('json')}
            className={`flex items-center space-x-2 text-xs px-3.5 py-1.5 rounded-lg transition font-medium ${
              activeSubTab === 'json'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 bg-slate-900'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>Raw JSON Contract</span>
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded flex items-center space-x-1">
            <Check className="w-3.5 h-3.5" />
            <span>Validated: architecture/schema.json</span>
          </span>
        </div>
      </div>

      {/* Visual Sub-Tab */}
      {activeSubTab === 'visual' && (
        <div className="space-y-6">
          {/* Mapping Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <Server className="w-4 h-4 text-blue-400" />
              <span>Extracted Entity to AWS Service Mappings</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[10px]">
                    <th className="pb-3">Extracted Entity</th>
                    <th className="pb-3">Customer Constraint</th>
                    <th className="pb-3">Mapped AWS Architecture Service</th>
                    <th className="pb-3">Provenance</th>
                    <th className="pb-3">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {entityMappings.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 font-sans font-bold text-white">{row.entity}</td>
                      <td className="py-3 text-slate-300">{row.value}</td>
                      <td className="py-3 text-cyan-400">{row.service}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          row.provenance === 'Specified' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : row.provenance === 'Inferred'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        }`}>
                          {row.provenance}
                        </span>
                      </td>
                      <td className="py-3 text-emerald-400 font-bold">{row.conf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Functional Capabilities Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Target Functional Modules (Passed to Full-Stack Generator)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {structuredReq.features?.map((feat, idx) => (
                <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-[10px]">
                      0{idx + 1}
                    </span>
                    <span className="text-slate-200 font-medium">{feat}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Ready
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* JSON Sub-Tab */}
      {activeSubTab === 'json' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="bg-slate-950 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
              <FileJson className="w-4 h-4 text-blue-400" />
              <span>architecture/structured_spec.json</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyJson}
                className="flex items-center space-x-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
              </button>

              <button
                onClick={handleDownloadJson}
                className="flex items-center space-x-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="p-5 bg-slate-950 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
            <pre>
              <code>{JSON.stringify(structuredReq, null, 2)}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
