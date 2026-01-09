import React from 'react';
import { THEMES } from '../styles/themes';

const Sidebar = ({ modules, activeModule, setActiveModule, setView, mysteryUnlocked, onMysteryTrigger }) => {
  return (
    <div className="w-72 flex flex-col bg-slate-900/90 backdrop-blur-sm border-r border-white/10 z-50 h-screen fixed">
      <div className="p-6 flex flex-col items-center cursor-pointer" onClick={() => setView('dashboard')}>
        <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 tracking-tight">
          BOUCTON_AI_WORLD
        </h1>
        <button
          onClick={(e) => { e.stopPropagation(); onMysteryTrigger(); }}
          className={`mt-2 text-sm ${mysteryUnlocked ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <i className="fa-solid fa-hourglass-start mr-2"></i> {mysteryUnlocked ? 'TEMPS DÉVERROUILLÉ' : '🕰️'}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 no-scrollbar">
        <div className="text-xs uppercase text-slate-500 font-bold px-4 py-2 tracking-widest">MODULES PRINCIPAUX</div>
        {modules.map((module) => {
          const theme = THEMES[module.color] || THEMES.rose;
          return (
            <button
              key={module.id}
              onClick={() => { setActiveModule(module.id); setView('module'); }}
              className={`w-full p-3 rounded-xl flex items-center gap-3 mb-2 transition-all
                ${activeModule === module.id ? 'bg-white/10 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br ${theme.gradient}`}>
                <i className={`fas ${theme.icon} text-white text-xs`}></i>
              </div>
              <span className="font-medium text-sm">{module.title}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
