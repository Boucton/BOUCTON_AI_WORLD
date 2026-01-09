import React from 'react';

const Header = () => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm border-b border-white/10 p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          BOUCTON_AI_WORLD
        </h1>
        <span className="text-xs bg-slate-800 px-2 py-1 rounded-full border border-white/20">
          v1.0
        </span>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white/10 transition">
          <i className="fas fa-moon text-slate-400"></i>
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 transition">
          <i className="fas fa-question-circle text-slate-400"></i>
        </button>
      </div>
    </header>
  );
};

export default Header;
