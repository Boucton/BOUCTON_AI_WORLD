import React from 'react';
import { NavLink } from 'react-router-dom';
import { THEMES } from '../styles/themes';

const Sidebar = ({ modules, mysteryUnlocked, onMysteryTrigger }) => {
  return (
    <aside className="w-72 h-screen fixed left-0 top-0 flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-white/10 transition-all duration-300 z-50 shadow-2xl">
      
      {/* Logo */}
      <NavLink to="/" className="p-6 cursor-pointer group border-b border-slate-200 dark:border-white/5 block">
        <div className="flex items-center gap-3 mb-1">
            <i className="fas fa-brain text-blue-600 dark:text-blue-500 text-xl group-hover:rotate-12 transition-transform"></i>
            <h1 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">BOUCTON_AI</h1>
        </div>
        <div className="text-xs text-slate-500 font-medium tracking-widest pl-8 group-hover:text-blue-500 transition-colors">WORLD v2.0</div>
      </NavLink>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
        
        <NavLink to="/dashboard" className={({ isActive }) => `w-full p-3 rounded-xl flex items-center gap-3 mb-1 transition-all duration-200 font-bold border ${isActive ? 'bg-blue-600 text-white border-blue-500 shadow-lg' : 'text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}>
           <i className="fas fa-grid-2 text-lg w-6 text-center"></i> <span>Tableau de Bord</span>
        </NavLink>

        <NavLink to="/workflow" className={({ isActive }) => `w-full p-3 rounded-xl flex items-center gap-3 mb-1 transition-all duration-200 font-bold border ${isActive ? 'bg-cyan-600 text-white border-cyan-500 shadow-lg' : 'text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}>
           <i className="fas fa-project-diagram text-lg w-6 text-center"></i> <span>Moteur Workflow</span>
        </NavLink>

        <NavLink to="/playground" className={({ isActive }) => `w-full p-3 rounded-xl flex items-center gap-3 mb-1 transition-all duration-200 font-bold border ${isActive ? 'bg-purple-600 text-white border-purple-500 shadow-lg' : 'text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}>
           <i className="fas fa-flask text-lg w-6 text-center"></i> <span>Laboratoire</span>
        </NavLink>

        <NavLink to="/data" className={({ isActive }) => `w-full p-3 rounded-xl flex items-center gap-3 mb-6 transition-all duration-200 font-bold border ${isActive ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg' : 'text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}>
           <i className="fas fa-database text-lg w-6 text-center"></i> <span>Data Center</span>
        </NavLink>

        <div className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-3 px-2 mt-6">Modules</div>
        
        {modules.map((module) => {
          const theme = THEMES[module.color] || THEMES.rose;
          return (
            <NavLink
              key={module.id}
              to={`/module/${module.id}`}
              className={({ isActive }) => `w-full p-3 rounded-xl flex items-center gap-3 transition-all duration-200 group border ${isActive ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-white/10 shadow-inner' : 'text-slate-500 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'}`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 bg-white dark:bg-slate-800 shadow-sm group-hover:bg-slate-200 dark:group-hover:bg-slate-700 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300`}>
                 <i className={`fas ${theme.icon} text-xs ${module.is_core ? 'text-' + module.color + '-500' : ''}`}></i>
              </div>
              <span className="font-medium text-sm text-left truncate">{module.title}</span>
              {module.is_core && <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700 ml-auto"></div>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/30">
        <button onDoubleClick={(e) => { e.stopPropagation(); onMysteryTrigger(); }} className={`w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors select-none ${mysteryUnlocked ? 'text-amber-500 bg-amber-100 dark:bg-amber-400/10 animate-pulse' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>
            <i className={`fas ${mysteryUnlocked ? 'fa-hourglass-half' : 'fa-hourglass-start'}`}></i> 
            {mysteryUnlocked ? 'TEMPS DÉVERROUILLÉ' : 'v2.0.0 Stable'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
