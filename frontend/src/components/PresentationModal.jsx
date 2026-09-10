import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Presentation, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink,
  MessageSquare,
  Award,
  Layers
} from 'lucide-react';
import { initialMockState } from '../services/mockData';

export default function PresentationModal({ isOpen, onClose, onNavigateToTab }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = initialMockState.presentationSlides;
  const slide = slides[currentSlideIndex];

  // Map slide index to app tab
  const slideTabMapping = {
    0: 'overview',
    1: 'input',
    2: 'suggestions',
    3: 'agents',
    4: 'architecture',
    5: 'agents',
    6: 'export'
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' && currentSlideIndex < slides.length - 1) {
        setCurrentSlideIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
        setCurrentSlideIndex(prev => prev - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex, slides.length, onClose]);

  if (!isOpen) return null;

  const handleJumpToLiveDemo = () => {
    const targetTab = slideTabMapping[currentSlideIndex] || 'overview';
    onNavigateToTab(targetTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4 sm:p-8 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Presentation className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center space-x-2">
                <span>Executive Academic Presentation Mode</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded">
                  Slide {currentSlideIndex + 1} of {slides.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Evaluation Walkthrough & Defense Presentation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Content Area */}
        <div className="p-8 space-y-6 overflow-y-auto flex-1">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full font-mono font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>{slide.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {slide.title}
            </h2>
          </div>

          {/* Key Bullet Points */}
          <div className="space-y-3 bg-slate-950/60 p-5 rounded-2xl border border-slate-800/80">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Technical Architecture Highlights:
            </div>
            <ul className="space-y-3">
              {slide.points.map((pt, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-slate-200 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Speaker Notes / Viva Talking Points */}
          <div className="bg-blue-950/20 border border-blue-800/40 rounded-2xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" />
              <span>Presenter & Viva Defense Talking Points:</span>
            </div>
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "{slide.speakerNotes}"
            </p>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="flex items-center space-x-1 text-xs px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 disabled:opacity-30 hover:bg-slate-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex items-center space-x-1 text-xs px-3 py-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 disabled:opacity-30 hover:bg-slate-800 transition"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleJumpToLiveDemo}
              className="flex items-center space-x-1.5 text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium px-4 py-2 rounded-xl shadow-md shadow-blue-600/20 transition"
            >
              <span>Jump to Live Demo Feature</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
