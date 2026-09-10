import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Edit3, 
  AlertCircle, 
  Shield, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  Save, 
  Plus, 
  CheckCheck, 
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function SuggestionsView({ 
  suggestions, 
  onUpdateStatus, 
  onAddCustomSuggestion, 
  onResetSuggestions, 
  onProceedToAgents,
  estimatedCost,
  securityScore
}) {
  const [filterCategory, setFilterCategory] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [editText, setEditText] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSuggestionData, setNewSuggestionData] = useState({
    title: '',
    description: '',
    category: 'performance',
    impact: '+₹1,000/mo, +5% speed'
  });

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'security': return <Shield className="w-4 h-4 text-cyan-400" />;
      case 'reliability': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'scalability': return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'cost': return <DollarSign className="w-4 h-4 text-purple-400" />;
      default: return <AlertCircle className="w-4 h-4 text-blue-400" />;
    }
  };

  const handleStartModify = (item) => {
    setEditingItem(item);
    setEditText(item.description);
  };

  const handleSaveModify = () => {
    if (editingItem) {
      onUpdateStatus(editingItem.id, 'modified', editText);
      setEditingItem(null);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newSuggestionData.title.trim()) return;
    onAddCustomSuggestion({
      ...newSuggestionData,
      id: `sug-${Date.now()}`,
      status: 'accepted'
    });
    setNewSuggestionData({
      title: '',
      description: '',
      category: 'performance',
      impact: '+₹1,000/mo, +5% speed'
    });
    setIsAddModalOpen(false);
  };

  const handleAcceptAll = () => {
    suggestions.forEach(s => {
      if (s.status !== 'accepted') {
        onUpdateStatus(s.id, 'accepted');
      }
    });
  };

  const filteredSuggestions = filterCategory === 'all'
    ? suggestions
    : suggestions.filter(s => s.category === filterCategory);

  const acceptedCount = suggestions.filter(s => s.status === 'accepted').length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner with Dynamic Impact Metrics */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold text-white">
                Human-in-the-Loop AI Suggestions Studio
              </h2>
              <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded font-mono">
                Day 6 • Decision Records
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Section 10 Requirement: Review architectural recommendations proposed by the Suggestion Agent based on AWS Well-Architected principles.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl transition"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span>Add Custom Suggestion</span>
            </button>

            <button
              onClick={onProceedToAgents}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition"
            >
              <span>Approve & Launch Agents</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Recalculation Impact Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 font-mono text-xs">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Accepted Recommendations:</span>
            <span className="text-emerald-400 font-bold">{acceptedCount} of {suggestions.length}</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Dynamic Security Score:</span>
            <span className="text-cyan-400 font-bold">{securityScore || 91} / 100</span>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Recalculated Monthly Spend:</span>
            <span className="text-emerald-400 font-bold">₹{estimatedCost?.toLocaleString() || '22,000'}</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills & Batch Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
          {['all', 'security', 'reliability', 'scalability', 'performance', 'cost'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-xl border font-mono capitalize transition ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white border-blue-500 font-semibold shadow'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleAcceptAll}
            className="flex items-center space-x-1 text-xs bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 px-3 py-1.5 rounded-xl transition"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Accept All</span>
          </button>

          <button
            onClick={onResetSuggestions}
            className="flex items-center space-x-1 text-xs bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 px-3 py-1.5 rounded-xl transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Suggestion Cards List */}
      <div className="space-y-3">
        {filteredSuggestions.map((item) => {
          const isAccepted = item.status === 'accepted';
          const isRejected = item.status === 'rejected';
          const isModified = item.status === 'modified';

          return (
            <div
              key={item.id}
              className={`border rounded-2xl p-5 transition-all ${
                isAccepted
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm shadow-emerald-500/5'
                  : isRejected
                  ? 'bg-slate-950/60 border-slate-800 opacity-50'
                  : isModified
                  ? 'bg-slate-900 border-indigo-500/40'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                    <span className="p-1.5 rounded-lg bg-slate-800 border border-slate-700">
                      {getCategoryIcon(item.category)}
                    </span>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {item.category}
                    </span>
                    {isModified && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Modified
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="text-[11px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded inline-block font-mono">
                    Impact: <span className="font-semibold text-slate-200">{item.impact}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => onUpdateStatus(item.id, 'accepted')}
                    className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-xl border font-medium transition ${
                      isAccepted
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept</span>
                  </button>

                  <button
                    onClick={() => handleStartModify(item)}
                    className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-xl border font-medium transition ${
                      isModified
                        ? 'bg-indigo-600 text-white border-indigo-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Modify</span>
                  </button>

                  <button
                    onClick={() => onUpdateStatus(item.id, 'rejected')}
                    className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-xl border font-medium transition ${
                      isRejected
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modify Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-indigo-400" />
              <span>Modify AI Suggestion</span>
            </h3>

            <p className="text-xs text-slate-400">
              Customize the architectural rationale for: <strong className="text-white">{editingItem.title}</strong>
            </p>

            <textarea
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 resize-none font-mono"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setEditingItem(null)}
                className="text-xs px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveModify}
                className="text-xs px-4 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-500 flex items-center space-x-1"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Modification</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Suggestion Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Add Custom Architectural Recommendation</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Recommendation Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Integrate Redis ElastiCache for user session caching"
                  value={newSuggestionData.title}
                  onChange={(e) => setNewSuggestionData({ ...newSuggestionData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={newSuggestionData.category}
                    onChange={(e) => setNewSuggestionData({ ...newSuggestionData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="security">Security</option>
                    <option value="reliability">Reliability</option>
                    <option value="scalability">Scalability</option>
                    <option value="performance">Performance</option>
                    <option value="cost">Cost</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Estimated Impact</label>
                  <input
                    type="text"
                    placeholder="e.g. +₹1,500/mo, 10x faster lookups"
                    value={newSuggestionData.impact}
                    onChange={(e) => setNewSuggestionData({ ...newSuggestionData, impact: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Technical Rationale & Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explain why this architecture component is recommended..."
                  value={newSuggestionData.description}
                  onChange={(e) => setNewSuggestionData({ ...newSuggestionData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-blue-500 focus:outline-none resize-none font-mono"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-500"
                >
                  Add to Specification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
