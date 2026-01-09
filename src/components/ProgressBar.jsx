import React, { useState, useEffect } from 'react';

const ProgressBar = ({ moduleId, content }) => {
  // Auto-détection du nombre de sections (h2 dans le Markdown)
  const totalSections = (content?.match(/^##\s/gm) || []).length || 5;
  
  const [completedSections, setCompletedSections] = useState(() => {
    const saved = localStorage.getItem(`progress_${moduleId}`);
    return saved ? parseInt(saved) : 0;
  });

  const progress = Math.min((completedSections / totalSections) * 100, 100);

  useEffect(() => {
    localStorage.setItem(`progress_${moduleId}`, completedSections.toString());
  }, [completedSections, moduleId]);

  const markSection = (increment = true) => {
    setCompletedSections(prev => {
      const next = increment ? prev + 1 : Math.max(prev - 1, 0);
      return Math.min(next, totalSections);
    });
  };

  return (
    <div className="sticky top-16 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-6 py-3">
        <div className="flex items-center gap-4">
          
          {/* Icône + Titre */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-xs"></i>
            </div>
            <span className="text-sm font-bold text-white hidden md:block">Progression</span>
          </div>

          {/* Barre de progression */}
          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 relative h-3 bg-slate-800 rounded-full overflow-hidden border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-500 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                {/* Brillance animée */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
              
              {/* Pourcentage overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            {/* Compteur */}
            <div className="text-xs font-mono text-slate-400 whitespace-nowrap">
              {completedSections}/{totalSections}
            </div>
          </div>

          {/* Boutons de contrôle */}
          <div className="flex items-center gap-1 shrink-0">
            <button 
              onClick={() => markSection(true)}
              disabled={completedSections >= totalSections}
              className="w-8 h-8 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg transition flex items-center justify-center group"
              title="Marquer comme lu"
            >
              <i className="fas fa-check text-xs"></i>
            </button>
            
            <button 
              onClick={() => markSection(false)}
              disabled={completedSections === 0}
              className="w-8 h-8 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-slate-300 rounded-lg transition flex items-center justify-center"
              title="Annuler"
            >
              <i className="fas fa-minus text-xs"></i>
            </button>
            
            <button 
              onClick={() => setCompletedSections(0)}
              disabled={completedSections === 0}
              className="w-8 h-8 bg-red-600/20 hover:bg-red-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-red-400 hover:text-white rounded-lg transition flex items-center justify-center"
              title="Réinitialiser"
            >
              <i className="fas fa-rotate-left text-xs"></i>
            </button>
          </div>

          {/* Badge terminé */}
          {progress === 100 && (
            <div className="shrink-0 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 flex items-center gap-2 animate-fade">
              <i className="fas fa-trophy text-emerald-500 text-xs"></i>
              <span className="text-xs text-emerald-400 font-bold">Terminé !</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
