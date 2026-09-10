import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import ProjectsManager from './components/ProjectsManager';
import RequirementInput from './components/RequirementInput';
import StructuredSpecView from './components/StructuredSpecView';
import SuggestionsView from './components/SuggestionsView';
import AgentProgress from './components/AgentProgress';
import ArchitectureView from './components/ArchitectureView';
import CodePreview from './components/CodePreview';
import ReportsView from './components/ReportsView';
import ExportView from './components/ExportView';
import PresentationModal from './components/PresentationModal';
import ProjectStatusArea from './components/ProjectStatusArea';
import { initialMockState, DEMO_REQUIREMENT } from './services/mockData';
import { apiService } from './services/api';
import { projectStore } from './services/projectStore';

export default function App() {
  const [projects, setProjects] = useState(() => projectStore.getProjects());
  const [activeProject, setActiveProject] = useState(() => projectStore.getActiveProject());
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);

  const [currentTab, setCurrentTab] = useState('overview');
  const [prompt, setPrompt] = useState(activeProject?.rawPrompt || initialMockState.rawPrompt);
  const [structuredReq, setStructuredReq] = useState({
    ...initialMockState.structuredRequirement,
    domain: activeProject?.domain || 'ecommerce',
    users: activeProject?.users || 50000,
    budget_monthly_inr: activeProject?.budget || 30000
  });
  const [suggestions, setSuggestions] = useState(initialMockState.suggestions);
  const [agents, setAgents] = useState(initialMockState.agents);
  const [alternatives, setAlternatives] = useState(initialMockState.architectureAlternatives);
  const [selectedAlt, setSelectedAlt] = useState(initialMockState.selectedAlternative);
  const [security, setSecurity] = useState(initialMockState.securityReport);
  const [cost, setCost] = useState(initialMockState.costBreakdown);
  const [traceability, setTraceability] = useState(initialMockState.traceabilityMatrix);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progressStep, setProgressStep] = useState(8);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Sync mode with apiService and poll health when Live
  useEffect(() => {
    apiService.setBackendMode(isLiveMode);
    if (isLiveMode) {
      apiService.checkBackendHealth().then(online => setIsBackendOnline(online));
      const interval = setInterval(() => {
        apiService.checkBackendHealth().then(online => setIsBackendOnline(online));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  // ── Project Management ─────────────────────────────────────────────
  const handleSelectProject = (id) => {
    projectStore.setActiveProject(id);
    const proj = projects.find(p => p.id === id);
    if (proj) {
      setActiveProject(proj);
      setPrompt(proj.rawPrompt);
      setStructuredReq(prev => ({
        ...prev,
        domain: proj.domain,
        users: proj.users,
        budget_monthly_inr: proj.budget
      }));
      setCurrentTab('overview');
    }
  };

  const handleCreateProject = (newProjData) => {
    const created = projectStore.createProject(newProjData);
    setProjects(projectStore.getProjects());
    setActiveProject(created);
    setPrompt(created.rawPrompt);
    setStructuredReq(prev => ({
      ...prev,
      domain: created.domain,
      users: created.users,
      budget_monthly_inr: created.budget
    }));
    setCurrentTab('input');
  };

  const handleDeleteProject = (id) => {
    const updated = projectStore.deleteProject(id);
    setProjects(updated);
    setActiveProject(projectStore.getActiveProject());
  };

  // ── Demo Reset ─────────────────────────────────────────────────────
  const handleResetDemo = () => {
    setPrompt(DEMO_REQUIREMENT);
    setStructuredReq(initialMockState.structuredRequirement);
    setSuggestions(initialMockState.suggestions);
    setSelectedAlt('balanced');
    setCurrentTab('input');
  };

  // ── Pipeline: Parse requirements ───────────────────────────────────
  const handleGenerate = async () => {
    setIsAnalyzing(true);
    try {
      const parsed = await apiService.parseRequirement(
        prompt, 
        structuredReq.domain, 
        structuredReq.users, 
        structuredReq.budget_monthly_inr
      );
      setStructuredReq(parsed);
      setCurrentTab('spec');
      setProgressStep(2);
    } catch (err) {
      console.error("Analysis error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ── Suggestion Actions (Day 6) ─────────────────────────────────────
  const handleUpdateSuggestionStatus = (id, newStatus, modifiedDescription) => {
    setSuggestions(prev => prev.map(s => {
      if (s.id === id) {
        return { 
          ...s, 
          status: newStatus,
          ...(modifiedDescription ? { description: modifiedDescription } : {})
        };
      }
      return s;
    }));
  };

  const handleAddCustomSuggestion = (newSuggestion) => {
    setSuggestions(prev => [newSuggestion, ...prev]);
  };

  const handleResetSuggestions = () => {
    setSuggestions(initialMockState.suggestions);
  };

  // Derived security/cost values that update as suggestions are accepted
  const acceptedCount = suggestions.filter(s => s.status === 'accepted').length;
  const dynamicSecurityScore = Math.min(100, (security?.score || 91) + acceptedCount);
  const dynamicEstimatedCost = Math.max(15000, (cost?.estimated || 22000) - acceptedCount * 300);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      <Header 
        onResetDemo={handleResetDemo} 
        isLiveMode={isLiveMode}
        setIsLiveMode={setIsLiveMode}
        isBackendOnline={isBackendOnline}
        onOpenPresentationMode={() => setIsPresentationOpen(true)}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentTab={currentTab} 
          setTab={setCurrentTab} 
          progressStep={progressStep} 
          activeProject={activeProject}
        />

        <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

          {/* ── Executive Dashboard ─────────────────────────── */}
          {currentTab === 'overview' && (
            <DashboardOverview
              activeProject={activeProject}
              onNavigateTab={setCurrentTab}
              onOpenNewProjectModal={() => setIsNewProjectModalOpen(true)}
            />
          )}

          {/* ── All Projects ─────────────────────────────────── */}
          {currentTab === 'projects' && (
            <ProjectsManager
              projects={projects}
              activeProjectId={activeProject.id}
              onSelectProject={handleSelectProject}
              onCreateProject={handleCreateProject}
              onDeleteProject={handleDeleteProject}
              isModalOpen={isNewProjectModalOpen}
              setIsModalOpen={setIsNewProjectModalOpen}
            />
          )}

          {/* ── Project Status (Day 6) ────────────────────────── */}
          {currentTab === 'status' && (
            <ProjectStatusArea
              activeProject={activeProject}
              isLiveMode={isLiveMode}
              isBackendOnline={isBackendOnline}
              securityScore={dynamicSecurityScore}
              estimatedCost={dynamicEstimatedCost}
            />
          )}

          {/* ── Step 1: Requirements Input ───────────────────── */}
          {currentTab === 'input' && (
            <RequirementInput
              prompt={prompt}
              setPrompt={setPrompt}
              structuredReq={structuredReq}
              setStructuredReq={setStructuredReq}
              onGenerate={handleGenerate}
              isAnalyzing={isAnalyzing}
            />
          )}

          {/* ── Step 2: Structured Spec ──────────────────────── */}
          {currentTab === 'spec' && (
            <StructuredSpecView
              structuredReq={structuredReq}
              onProceedToSuggestions={() => {
                setCurrentTab('suggestions');
                setProgressStep(3);
              }}
            />
          )}

          {/* ── Step 3: AI Suggestions (Day 6) ──────────────── */}
          {currentTab === 'suggestions' && (
            <SuggestionsView
              suggestions={suggestions}
              onUpdateStatus={handleUpdateSuggestionStatus}
              onAddCustomSuggestion={handleAddCustomSuggestion}
              onResetSuggestions={handleResetSuggestions}
              estimatedCost={dynamicEstimatedCost}
              securityScore={dynamicSecurityScore}
              isLiveMode={isLiveMode}
              isBackendOnline={isBackendOnline}
              onProceedToAgents={() => {
                setCurrentTab('agents');
                setProgressStep(4);
              }}
            />
          )}

          {/* ── Step 4: Agent Execution ──────────────────────── */}
          {currentTab === 'agents' && (
            <AgentProgress
              agents={agents}
              onProceedToArchitecture={() => {
                setCurrentTab('architecture');
                setProgressStep(5);
              }}
            />
          )}

          {/* ── Step 5: Cloud Architecture ───────────────────── */}
          {currentTab === 'architecture' && (
            <ArchitectureView
              alternatives={alternatives}
              selectedAlt={selectedAlt}
              setSelectedAlt={setSelectedAlt}
              onProceedToCode={() => {
                setCurrentTab('code');
                setProgressStep(6);
              }}
            />
          )}

          {/* ── Step 6: Generated Code ──────────────────────── */}
          {currentTab === 'code' && (
            <CodePreview
              domain={structuredReq.domain || 'ecommerce'}
              onProceedToReports={() => {
                setCurrentTab('reports');
                setProgressStep(7);
              }}
            />
          )}

          {/* ── Step 7: Reports ─────────────────────────────── */}
          {currentTab === 'reports' && (
            <ReportsView
              security={{ ...security, score: dynamicSecurityScore }}
              cost={{ ...cost, estimated: dynamicEstimatedCost, savings: (cost?.budget || 30000) - dynamicEstimatedCost }}
              traceability={traceability}
              onProceedToExport={() => {
                setCurrentTab('export');
                setProgressStep(8);
              }}
            />
          )}

          {/* ── Step 8: Export ───────────────────────────────── */}
          {currentTab === 'export' && (
            <ExportView
              structuredReq={structuredReq}
              selectedAlt={selectedAlt}
            />
          )}
        </main>
      </div>

      {/* Global New Project Modal (when triggered from non-projects tab) */}
      {isNewProjectModalOpen && currentTab !== 'projects' && (
        <ProjectsManager
          projects={projects}
          activeProjectId={activeProject.id}
          onSelectProject={handleSelectProject}
          onCreateProject={handleCreateProject}
          onDeleteProject={handleDeleteProject}
          isModalOpen={isNewProjectModalOpen}
          setIsModalOpen={setIsNewProjectModalOpen}
        />
      )}

      {/* Presentation Mode Modal */}
      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        onNavigateToTab={setCurrentTab}
      />
    </div>
  );
}
