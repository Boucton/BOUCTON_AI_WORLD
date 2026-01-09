import React from 'react';
import { THEMES } from '../styles/themes';

const Sidebar = ({ modules, activeModule, setActiveModule, setView, mysteryUnlocked, onMysteryTrigger }) => {
  return (
    <aside className="w-72 h-screen fixed left-0 top-0 flex flex-col bg-slate-900/95 backdrop-blur-xl border-r border-white/10 z-40 shadow-2xl transition-all duration-500 ${mysteryUnlocked ? 'border-r-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)]' : 'border-r-white/10'}`}>">
      {/* Logo */}
      <div className="p-6 cursor-pointer group" onClick={() => setView('home')}>
        <div className="flex items-center gap-3 mb-1">
            <i className="fas fa-brain text-blue-500 text-xl group-hover:rotate-12 transition-transform"></i>
            <h1 className="text-lg font-black tracking-tight text-white">
            BOUCTON_AI
            </h1>
        </div>
        <div className="text-xs text-slate-500 font-medium tracking-widest pl-8">WORLD v1.1</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
        <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4 px-2">
          Modules
        </div>
        
        {modules.map((module) => {
          const theme = THEMES[module.color] || THEMES.rose;
          const isActive = activeModule === module.id;
      {module.is_core && (
  <span className="ml-auto text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">
    CORE
  </span>
)}        
          return (
            <button
              key={module.id}
              onClick={() => { setActiveModule(module.id); setView('module'); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
            >
              
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                ${isActive ? `bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]` : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                <i className={`fas ${theme.icon} text-xs`}></i>
              </div>
              <span className="font-medium text-sm">{module.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Sidebar (Easter Egg) */}
      <div className="p-4 border-t border-white/5 bg-slate-950/30">
        <button
            onClick={(e) => { e.stopPropagation(); onMysteryTrigger(); }}
            className={`w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors
            ${mysteryUnlocked ? 'text-amber-400 bg-amber-400/10' : 'text-slate-600 hover:text-slate-400'}`}
        >
            <i className="fas fa-hourglass-start"></i> 
            {mysteryUnlocked ? 'TEMPS DÉVERROUILLÉ' : 'v1.1.0'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
