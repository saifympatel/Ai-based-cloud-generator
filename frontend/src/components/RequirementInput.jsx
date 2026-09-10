import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Server, 
  Database, 
  Users, 
  IndianRupee, 
  ShieldCheck,
  ShoppingBag,
  UtensilsCrossed,
  GraduationCap,
  Sliders,
  Check,
  Wand2,
  AlertTriangle,
  FileSpreadsheet,
  Layers,
  Cpu
} from 'lucide-react';
import { DEMO_REQUIREMENT } from '../services/mockData';

export default function RequirementInput({ 
  prompt, 
  setPrompt, 
  structuredReq, 
  setStructuredReq,
  onGenerate, 
  isAnalyzing 
}) {
  const [selectedDomain, setSelectedDomain] = useState(structuredReq.domain || 'ecommerce');
  const [userCount, setUserCount] = useState(structuredReq.users || 50000);
  const [budget, setBudget] = useState(structuredReq.budget_monthly_inr || 30000);
  const [highAvailability, setHighAvailability] = useState(true);
  const [autoScaling, setAutoScaling] = useState(true);
  const [wafProtection, setWafProtection] = useState(true);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [showSrsPreview, setShowSrsPreview] = useState(false);

  const domainPresets = [
    { 
      id: 'ecommerce', 
      name: 'E-Commerce & Digital Retail', 
      icon: ShoppingBag,
      prompt: "Build an e-commerce application for 50,000 users with authentication, products, cart, payments, PostgreSQL, image storage, high availability and a ₹30,000 monthly cloud budget.",
      defaultUsers: 50000,
      defaultBudget: 30000
    },
    { 
      id: 'food_delivery', 
      name: 'Food Delivery & Hyperlocal Logistics', 
      icon: UtensilsCrossed,
      prompt: "Build a real-time food delivery platform for 25,000 users with live order tracking, restaurants catalog, payment gateway, PostgreSQL and Redis caching under ₹25,000/mo.",
      defaultUsers: 25000,
      defaultBudget: 25000
    },
    { 
      id: 'lms', 
      name: 'Learning Management System (LMS)', 
      icon: GraduationCap,
      prompt: "Build a video learning management system for 15,000 students with course enrollment, quiz engine, S3 video storage and PostgreSQL database with high availability.",
      defaultUsers: 15000,
      defaultBudget: 20000
    }
  ];

  const handleSelectDomain = (preset) => {
    setSelectedDomain(preset.id);
    setPrompt(preset.prompt);
    setUserCount(preset.defaultUsers);
    setBudget(preset.defaultBudget);
  };

  // AI Prompt Auto-Enhance simulation
  const handleEnhancePrompt = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setPrompt(
        `Architect an enterprise-grade ${selectedDomain} platform engineered for ${userCount.toLocaleString()} peak concurrent users. Require production-grade PostgreSQL with Multi-AZ automated failover, Amazon S3 encrypted object storage, Application Load Balancer with dynamic auto-scaling group, AWS WAF security protection, and strict cloud expenditure cap of ₹${budget.toLocaleString()} per month.`
      );
      setIsEnhancing(false);
    }, 600);
  };

  const handleTriggerGenerate = () => {
    setStructuredReq(prev => ({
      ...prev,
      domain: selectedDomain,
      users: userCount,
      budget_monthly_inr: budget,
      high_availability: highAvailability,
      auto_scaling: autoScaling,
      waf_protection: wafProtection
    }));
    onGenerate();
  };

  // Budget Feasibility Check
  const estimatedMinCost = Math.round((userCount / 50000) * 22000);
  const isBudgetFeasible = budget >= estimatedMinCost;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Domain Family Selector Pills */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {domainPresets.map(preset => {
            const Icon = preset.icon;
            const isSelected = selectedDomain === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectDomain(preset)}
                className={`flex items-center space-x-2 text-xs px-4 py-2.5 rounded-xl border font-medium transition shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowSrsPreview(true)}
          className="hidden sm:flex items-center space-x-1.5 text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 px-3 py-2 rounded-xl transition font-mono"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-blue-400" />
          <span>View Formal SRS</span>
        </button>
      </div>

      {/* Main Requirement Input Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Customer Requirement Specification Studio</span>
              <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded font-mono">
                Day 4 • Specification Layer
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Natural-language requirement synthesis powered by Fine-Tuned Domain LLM + RAG Knowledge Grounding.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleEnhancePrompt}
              disabled={isEnhancing}
              className="flex items-center space-x-1.5 text-xs bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-lg transition"
              title="Enhance natural language prompt with enterprise architecture parameters"
            >
              <Wand2 className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin' : 'text-indigo-400'}`} />
              <span>{isEnhancing ? 'Optimizing...' : 'AI Enhance Prompt'}</span>
            </button>

            <button
              onClick={() => setPrompt(DEMO_REQUIREMENT)}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-blue-400 border border-slate-700 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Demo</span>
            </button>
          </div>
        </div>

        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your cloud architecture requirements..."
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition resize-none leading-relaxed"
        />

        {/* Dynamic Sliders & Constraint Guardrails */}
        <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Slider */}
          <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800/60">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-blue-400" />
                <span>Peak Concurrent Users:</span>
              </span>
              <span className="font-bold text-white font-mono text-sm">{userCount.toLocaleString()} Users</span>
            </div>
            <input 
              type="range" 
              min="5000" 
              max="100000" 
              step="5000"
              value={userCount}
              onChange={(e) => setUserCount(Number(e.target.value))}
              className="w-full accent-blue-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>5k (Startup)</span>
              <span>50k (Production Target)</span>
              <span>100k (Enterprise)</span>
            </div>
          </div>

          {/* Budget Slider */}
          <div className="space-y-2 bg-slate-950 p-4 rounded-2xl border border-slate-800/60">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400 flex items-center space-x-1">
                <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                <span>Monthly Budget Cap:</span>
              </span>
              <span className="font-bold text-emerald-400 font-mono text-sm">₹{budget.toLocaleString()} / mo</span>
            </div>
            <input 
              type="range" 
              min="10000" 
              max="60000" 
              step="2000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-emerald-500 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₹10k</span>
              <span>₹30k (Target)</span>
              <span>₹60k</span>
            </div>
          </div>
        </div>

        {/* Budget Feasibility Bar */}
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">Budget Feasibility Guardrail:</span>
            {isBudgetFeasible ? (
              <span className="text-emerald-400 flex items-center space-x-1 font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>FEASIBLE (Budget covers est. ₹{estimatedMinCost.toLocaleString()}/mo)</span>
              </span>
            ) : (
              <span className="text-amber-400 flex items-center space-x-1 font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>WARNING (Target scale needs ~₹{estimatedMinCost.toLocaleString()}/mo)</span>
              </span>
            )}
          </div>
          <span className="text-slate-500">Margin: ₹{(budget - estimatedMinCost).toLocaleString()}</span>
        </div>

        {/* Feature Checkbox Toggles */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-3">
          <label className="flex items-center space-x-2 text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700">
            <input 
              type="checkbox" 
              checked={highAvailability} 
              onChange={(e) => setHighAvailability(e.target.checked)}
              className="accent-blue-500 rounded" 
            />
            <span className="text-slate-300">Multi-AZ High Availability</span>
          </label>

          <label className="flex items-center space-x-2 text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700">
            <input 
              type="checkbox" 
              checked={autoScaling} 
              onChange={(e) => setAutoScaling(e.target.checked)}
              className="accent-blue-500 rounded" 
            />
            <span className="text-slate-300">ALB Auto-Scaling Group</span>
          </label>

          <label className="flex items-center space-x-2 text-xs bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 cursor-pointer hover:border-slate-700">
            <input 
              type="checkbox" 
              checked={wafProtection} 
              onChange={(e) => setWafProtection(e.target.checked)}
              className="accent-blue-500 rounded" 
            />
            <span className="text-slate-300">AWS WAF Layer-7 Protection</span>
          </label>
        </div>

        {/* Submit Pipeline CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
          <div className="text-xs text-slate-500 font-mono">
            Extraction Confidence: <strong className="text-emerald-400 font-bold">98.4%</strong> | Grounded in AWS Docs
          </div>

          <button
            onClick={handleTriggerGenerate}
            disabled={isAnalyzing || !prompt.trim()}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition transform active:scale-95"
          >
            {isAnalyzing ? (
              <>
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                <span>Synthesizing Architecture...</span>
              </>
            ) : (
              <>
                <span>Run Agentic Pipeline</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Extracted Entity Provenance & Single Source of Truth Display */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
            <Server className="w-4 h-4 text-blue-400" />
            <span>Extracted Entity Provenance & Traceability (Section 12 & 19)</span>
          </h3>
          <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded">
            Single Source of Truth
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
            <div className="text-[10px] text-slate-500 uppercase font-mono">Target Capacity</div>
            <div className="text-base font-bold text-white">{userCount.toLocaleString()} Users</div>
            <div className="text-[10px] text-emerald-400 font-mono">Provenance: Specified (100%)</div>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
            <div className="text-[10px] text-slate-500 uppercase font-mono">Database Engine</div>
            <div className="text-base font-bold text-white">PostgreSQL 15 RDS</div>
            <div className="text-[10px] text-emerald-400 font-mono">Provenance: Specified (99%)</div>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
            <div className="text-[10px] text-slate-500 uppercase font-mono">Topology Pattern</div>
            <div className="text-base font-bold text-blue-400">Three-Tier Web App</div>
            <div className="text-[10px] text-indigo-400 font-mono">Provenance: Inferred (96%)</div>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
            <div className="text-[10px] text-slate-500 uppercase font-mono">Fault Tolerance</div>
            <div className="text-base font-bold text-purple-400">Multi-AZ Standby</div>
            <div className="text-[10px] text-amber-400 font-mono">Provenance: Recommended (95%)</div>
          </div>
        </div>
      </div>

      {/* SRS Preview Modal */}
      {showSrsPreview && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                <span>Formal Software Requirements Specification (SRS)</span>
              </h3>
              <button
                onClick={() => setShowSrsPreview(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="font-mono text-xs text-slate-300 space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-blue-400 font-bold">1. IDENTIFICATION</div>
              <div>Project: {selectedDomain.toUpperCase()}-PRODUCT-SPEC</div>
              <div>Generated: 2026-09-04</div>
              <div>Standard: IEEE 830 / ISO 29148</div>

              <div className="text-blue-400 font-bold pt-2">2. FUNCTIONAL REQUIREMENTS</div>
              <div>REQ-001: The system shall provide secure JWT authentication and user session management.</div>
              <div>REQ-002: The system shall render a paginated product catalog with category search.</div>
              <div>REQ-003: The system shall persist customer shopping cart state across sessions.</div>
              <div>REQ-004: The system shall securely process order checkouts and status notifications.</div>

              <div className="text-blue-400 font-bold pt-2">3. NON-FUNCTIONAL REQUIREMENTS & SLAs</div>
              <div>NFR-001 (Scale): Handle {userCount.toLocaleString()} concurrent users with &lt; 200ms API response.</div>
              <div>NFR-002 (Availability): Multi-AZ RDS failover ensuring 99.99% database uptime.</div>
              <div>NFR-003 (Security): TLS 1.3 transit encryption and S3 AES-256 rest encryption.</div>
              <div>NFR-004 (Cost): Total AWS expenditure bounded to ₹{budget.toLocaleString()} / month.</div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowSrsPreview(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-medium text-xs hover:bg-blue-500"
              >
                Close SRS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
