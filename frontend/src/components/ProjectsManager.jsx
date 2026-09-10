import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  ArrowRight, 
  Trash2, 
  Check, 
  Calendar, 
  Users, 
  IndianRupee, 
  ShieldCheck, 
  Layers,
  X
} from 'lucide-react';

export default function ProjectsManager({ 
  projects, 
  activeProjectId, 
  onSelectProject, 
  onCreateProject, 
  onDeleteProject,
  isModalOpen,
  setIsModalOpen
}) {
  const [newProjectData, setNewProjectData] = useState({
    name: '',
    description: '',
    domain: 'ecommerce',
    users: 50000,
    budget: 30000,
    rawPrompt: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProjectData.name.trim()) return;
    onCreateProject(newProjectData);
    setNewProjectData({
      name: '',
      description: '',
      domain: 'ecommerce',
      users: 50000,
      budget: 30000,
      rawPrompt: ''
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>Project Management</span>
            <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded font-mono">
              Multi-Project Workspace
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your AI-designed cloud products, switch between active architectures, or instantiate a new product specification.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((proj) => {
          const isActive = proj.id === activeProjectId;

          return (
            <div
              key={proj.id}
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all relative ${
                isActive
                  ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {isActive && (
                <span className="absolute -top-2.5 right-4 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                  CURRENT ACTIVE
                </span>
              )}

              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-400 border border-slate-700 px-2 py-0.5 rounded">
                    {proj.domain}
                  </span>

                  {projects.length > 1 && !isActive && (
                    <button
                      onClick={() => onDeleteProject(proj.id)}
                      className="text-slate-500 hover:text-rose-400 transition"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{proj.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="text-slate-400">
                    Users: <span className="text-slate-200 font-bold">{proj.users.toLocaleString()}</span>
                  </div>
                  <div className="text-slate-400">
                    Cost: <span className="text-emerald-400 font-bold">₹{proj.estimatedCost.toLocaleString()}</span>
                  </div>
                  <div className="text-slate-400">
                    Score: <span className="text-cyan-400 font-bold">{proj.securityScore}/100</span>
                  </div>
                  <div className="text-slate-400">
                    Budget: <span className="text-amber-400 font-bold">₹{proj.budget.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80">
                {isActive ? (
                  <div className="flex items-center justify-center space-x-1 text-xs text-emerald-400 font-medium py-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Selected Workspace</span>
                  </div>
                ) : (
                  <button
                    onClick={() => onSelectProject(proj.id)}
                    className="w-full flex items-center justify-center space-x-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 py-2 rounded-xl transition"
                  >
                    <span>Switch to this Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create New Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Plus className="w-4 h-4 text-blue-400" />
                <span>Create New Cloud Architecture Project</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NextGen Microservices Platform"
                  value={newProjectData.name}
                  onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Domain Family</label>
                <select
                  value={newProjectData.domain}
                  onChange={(e) => setNewProjectData({ ...newProjectData, domain: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-blue-500 focus:outline-none"
                >
                  <option value="ecommerce">E-Commerce & Retail</option>
                  <option value="food_delivery">Food Delivery & Hyperlocal Logistics</option>
                  <option value="lms">Learning Management & Video LMS</option>
                  <option value="custom">Custom Enterprise SaaS</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Expected Peak Users</label>
                  <input
                    type="number"
                    value={newProjectData.users}
                    onChange={(e) => setNewProjectData({ ...newProjectData, users: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Monthly Cloud Budget (INR)</label>
                  <input
                    type="number"
                    value={newProjectData.budget}
                    onChange={(e) => setNewProjectData({ ...newProjectData, budget: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 font-mono focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Product Description / High-level Idea</label>
                <textarea
                  rows={2}
                  placeholder="Short summary of product goals..."
                  value={newProjectData.description}
                  onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-100 focus:border-blue-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium shadow-md shadow-blue-600/20 hover:from-blue-500 hover:to-indigo-500"
                >
                  Create & Open Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
