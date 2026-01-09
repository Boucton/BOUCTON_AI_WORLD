import React, { useState, useEffect } from 'react';

const ProgressBar = ({ moduleId, totalSections = 10 }) => {
  const [completedSections, setCompletedSections] = useState(() => {
    const saved = localStorage.getItem(`progress_${moduleId}`);
    return saved ? parseInt(saved) : 0;
  });

  const progress = Math.min((completedSections / totalSections) * 100, 100);

  useEffect(() => {
    localStorage.setItem(`progress_${moduleId}`, completedSections);
  }, [completedSections, moduleId]);

  const markSection = (increment = true) => {
    setCompletedSections(prev => {
      const next = increment ? prev + 1 : Math.max(prev - 1, 0);
      return Math.min(next, totalSections);
    });
  };

  return (
    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4 space-y-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="fas fa-chart-line text-blue-500"></i>
          <span className="text-sm font-bold text-white">Progression</span>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {completedSections}/{totalSections} sections
        </span>
      </div>

      {/* Barre de progression */}
      <div className="relative">
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Brillance animée */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
        {/* Pourcentage */}
        <div className="absolute -top-1 right-0 text-[10px] font-bold text-white bg-blue-600 px-2 py-0.5 rounded-full shadow-lg">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Boutons de contrôle */}
      <div className="flex gap-2">
        <button 
          onClick={() => markSection(true)}
          disabled={completedSections >= totalSections}
          className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-1"
        >
          <i className="fas fa-check text-[10px]"></i>
          Marquer comme lu
        </button>
        <button 
          onClick={() => markSection(false)}
          disabled={completedSections === 0}
          className="py-1.5 px-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-300 text-xs rounded-lg transition"
        >
          <i className="fas fa-undo text-[10px]"></i>
        </button>
        <button 
          onClick={() => setCompletedSections(0)}
          className="py-1.5 px-3 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs rounded-lg transition"
          title="Réinitialiser"
        >
          <i className="fas fa-rotate-left text-[10px]"></i>
        </button>
      </div>

      {/* Milestone */}
      {progress === 100 && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2 flex items-center gap-2 animate-fade">
          <i className="fas fa-trophy text-emerald-500"></i>
          <span className="text-xs text-emerald-400 font-bold">Module terminé ! 🎉</span>
        </div>
      )}
    </div>
  );
};

// Animation shimmer
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;
document.head.appendChild(style);

export default ProgressBar;
