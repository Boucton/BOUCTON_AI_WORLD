import React from 'react';
import { THEMES } from '../styles/themes';

const Sidebar = ({ modules, activeModule, setActiveModule, setView, mysteryUnlocked, onMysteryTrigger }) => {
  return (
    <aside className={`w-72 h-screen fixed left-0 top-0 flex flex-col bg-slate-900/95 backdrop-blur-xl border-r transition-all duration-500 z-50 ${mysteryUnlocked ? 'border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.1)]' : 'border-white/10 shadow-2xl'}`}>
      
      {/* Logo */}
      <div className="p-6 cursor-pointer group border-b border-white/5" onClick={() => setView('home')}>
        <div className="flex items-center gap-3 mb-1">
            <i className="fas fa-brain text-blue-500 text-xl group-hover:rotate-12 transition-transform"></i>
            <h1 className="text-lg font-black tracking-tight text-white">
            BOUCTON_AI
            </h1>
        </div>
        <div className="text-xs text-slate-500 font-medium tracking-widest pl-8 group-hover:text-blue-400 transition-colors">WORLD v1.1</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        
        {/* Bouton Tableau de Bord (Nouveau) */}
        <button
          onClick={() => { setActiveModule(null); setView('dashboard'); }}
          className={`w-full p-3 rounded-xl flex items-center gap-3 mb-6 transition-all duration-200 font-bold border
            ${activeModule === null 
              ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/20' 
              : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
            }`}
        >
           <i className="fas fa-grid-2 text-lg w-6 text-center"></i>
           <span>Tableau de Bord</span>
        </button>

        <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 px-2 mt-6">
          Modules Disponibles
        </div>
        
        {modules.map((module) => {
          const theme = THEMES[module.color] || THEMES.rose;
          const isActive = activeModule === module.id;
          
          return (
            <button
              key={module.id}
              onClick={() => { setActiveModule(module.id); setView('module'); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200 group border
                ${isActive 
                  ? 'bg-slate-800 text-white border-white/10 shadow-inner' 
                  : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
                }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0
                ${isActive 
                    ? `bg-gradient-to-br ${theme.gradient} text-white shadow-lg` 
                    : 'bg-slate-800 group-hover:bg-slate-700 text-slate-500 group-hover:text-slate-300'
                }`}>
                <i className={`fas ${theme.icon} text-xs`}></i>
              </div>
              <span className="font-medium text-sm text-left truncate">{module.title}</span>
              
              {/* Badge Core */}
              {module.is_core && (
                <div className={`w-1.5 h-1.5 rounded-full ml-auto ${isActive ? 'bg-white' : 'bg-slate-700'}`}></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Sidebar (Easter Egg) */}
      <div className="p-4 border-t border-white/5 bg-slate-950/30">
        <button
            onDoubleClick={(e) => { e.stopPropagation(); onMysteryTrigger(); }}
            className={`w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors select-none
            ${mysteryUnlocked ? 'text-amber-400 bg-amber-400/10 animate-pulse' : 'text-slate-600 hover:text-slate-400'}`}
            title="Double-cliquez pour déverrouiller le temps"
        >
            <i className={`fas ${mysteryUnlocked ? 'fa-hourglass-half' : 'fa-hourglass-start'}`}></i> 
            {mysteryUnlocked ? 'TEMPS DÉVERROUILLÉ' : 'v1.1.0'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
