import React, { useState } from 'react';
import { THEMES } from '../styles/themes';

const Sidebar = ({ modules, activeModule, setActiveModule, setView, mysteryUnlocked, onMysteryTrigger, xp }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredModule, setHoveredModule] = useState(null);

  const getModuleProgress = (moduleId) => {
    const content = modules.find(m => m.id === moduleId)?.content || '';
    const totalSections = (content.match(/^##\s/gm) || []).length || 5;
    const completed = parseInt(localStorage.getItem(`progress_${moduleId}`) || '0');
    return { completed, total: totalSections, percent: Math.round((completed / totalSections) * 100) };
  };

  const totalProgress = modules.reduce((sum, m) => {
    const prog = getModuleProgress(m.id);
    return sum + prog.percent;
  }, 0) / modules.length;

  return (
    <aside className={`h-screen fixed left-0 top-0 flex flex-col bg-slate-900/95 backdrop-blur-xl border-r transition-all duration-500 z-50 ${
      mysteryUnlocked ? 'border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : 'border-white/10 shadow-2xl'
    } ${isCollapsed ? 'w-20' : 'w-72'}`}>
      
      {/* Logo + Toggle Collapse */}
      <div className="p-6 cursor-pointer group border-b border-white/5 relative" onClick={() => !isCollapsed && setView('home')}>
        <button 
          onClick={(e) => { e.stopPropagation(); setIsCollapsed(!isCollapsed); }}
          className="absolute top-4 right-4 w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition z-10"
          title={isCollapsed ? "Étendre" : "Réduire"}
        >
          <i className={`fas fa-angles-${isCollapsed ? 'right' : 'left'} text-xs`}></i>
        </button>

        {!isCollapsed ? (
          <>
            <div className="flex items-center gap-3 mb-1">
              <i className="fas fa-brain text-blue-500 text-xl group-hover:rotate-12 transition-transform"></i>
              <h1 className="text-lg font-black tracking-tight text-white">BOUCTON_AI</h1>
            </div>
            <div className="text-xs text-slate-500 font-medium tracking-widest pl-8 group-hover:text-blue-400 transition-colors">
              WORLD v1.1
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center">
            <i className="fas fa-brain text-blue-500 text-2xl group-hover:rotate-12 transition-transform"></i>
          </div>
        )}
      </div>

      {/* Progression Globale */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-b border-white/5 bg-slate-950/30">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Progression Totale</span>
            <span className="text-xs font-mono text-blue-400">{Math.round(totalProgress)}%</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-1000"
              style={{ width: `${totalProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        
        {/* Bouton Tableau de Bord */}
        <button
          onClick={() => { setActiveModule(null); setView('dashboard'); }}
          className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200 font-bold border group
            ${activeModule === null 
              ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/20' 
              : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
            } ${isCollapsed ? 'justify-center' : ''}`}
          title="Tableau de Bord"
        >
          <i className="fas fa-grid-2 text-lg w-6 text-center"></i>
          {!isCollapsed && <span>Tableau de Bord</span>}
        </button>

        {!isCollapsed && (
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 px-2 mt-6">
            Modules ({modules.length})
          </div>
        )}
        
        {modules.map((module) => {
          const theme = THEMES[module.color] || THEMES.rose;
          const isActive = activeModule === module.id;
          const progress = getModuleProgress(module.id);
          
          return (
            <div
              key={module.id}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
              className="relative"
            >
              <button
                onClick={() => { setActiveModule(module.id); setView('module'); }}
                className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200 group border relative overflow-hidden
                  ${isActive 
                    ? 'bg-slate-800 text-white border-white/10 shadow-inner' 
                    : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? module.title : ''}
              >
                {/* Barre de progression en background */}
                {progress.percent > 0 && (
                  <div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-500"
                    style={{ width: `${progress.percent}%` }}
                  ></div>
                )}

                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0
                  ${isActive 
                      ? `bg-gradient-to-br ${theme.gradient} text-white shadow-lg` 
                      : 'bg-slate-800 group-hover:bg-slate-700 text-slate-500 group-hover:text-slate-300'
                  }`}>
                  <i className={`fas ${theme.icon} text-xs`}></i>
                </div>
                
                {!isCollapsed && (
                  <>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm truncate">{module.title}</div>
                      {progress.percent > 0 && (
                        <div className="text-[10px] text-slate-500 font-mono">{progress.completed}/{progress.total}</div>
                      )}
                    </div>
                    
                    {/* Badge Core */}
                    {module.is_core && (
                      <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-slate-700'}`}></div>
                    )}

                    {/* Badge Complété */}
                    {progress.percent === 100 && (
                      <i className="fas fa-check-circle text-emerald-500 text-xs"></i>
                    )}
                  </>
                )}
              </button>

              {/* Tooltip pour mode collapsed */}
              {isCollapsed && hoveredModule === module.id && (
                <div className="fixed left-24 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 shadow-xl z-[60] pointer-events-none animate-fade">
                  <div className="font-bold text-white text-sm mb-1">{module.title}</div>
                  <div className="text-xs text-slate-400">{progress.completed}/{progress.total} sections</div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
      
      <NavLink to="/workflow" className={({ isActive }) => `w-full p-3 rounded-xl flex items-center gap-3 mb-1 transition-all duration-200 font-bold border ${isActive ? 'bg-cyan-600 text-white border-cyan-500 shadow-lg' : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-white'}`}>
      <i className="fas fa-project-diagram text-lg w-6 text-center"></i> <span>Moteur de Workflow</span>
      </NavLink>

      {/* Footer Sidebar */}
      <div className="p-4 border-t border-white/5 bg-slate-950/30 space-y-2">
        {/* XP Display */}
        {!isCollapsed && (
          <div className="bg-slate-800/50 rounded-lg p-3 mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-400">Niveau</span>
              <span className="text-xs font-bold text-blue-400">{xp} XP</span>
            </div>
            <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500"
                style={{ width: `${(xp % 100)}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onDoubleClick={(e) => { e.stopPropagation(); onMysteryTrigger(); }}
          className={`w-full py-2 rounded-lg text-xs font-medium flex items-center ${isCollapsed ? 'justify-center' : 'justify-center gap-2'} transition-colors select-none
          ${mysteryUnlocked ? 'text-amber-400 bg-amber-400/10 animate-pulse' : 'text-slate-600 hover:text-slate-400'}`}
          title="Double-cliquez pour déverrouiller"
        >
          <i className={`fas ${mysteryUnlocked ? 'fa-hourglass-half' : 'fa-hourglass-start'}`}></i> 
          {!isCollapsed && (mysteryUnlocked ? 'TEMPS DÉVERROUILLÉ' : 'v1.1.0')}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
