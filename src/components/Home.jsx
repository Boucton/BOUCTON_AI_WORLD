import React, { useState, useEffect } from 'react';
import { THEMES } from '../styles/themes';

const Home = ({ modules, onStart, onNavigate }) => {
  const [text, setText] = useState('');
  const fullText = "BOUCTON_AI_WORLD";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-slate-900 text-white relative overflow-hidden">
       {/* Fond animé */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
       </div>

      <div className="z-10 max-w-5xl mx-auto w-full">
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white font-mono h-20 md:h-24">
          {text}<span className="animate-pulse text-blue-500">_</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light max-w-2xl mx-auto">
          L'encyclopédie interactive pour <span className="text-blue-400 font-bold">maîtriser l'IA</span> médicale.
        </p>
        
        <button
          onClick={onStart}
          className="px-10 py-5 bg-blue-600 rounded-2xl hover:bg-blue-500 transition-all font-bold text-xl shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 mb-20"
        >
          Accéder au Tableau de Bord 🚀
        </button>
        
        {/* GRILLE DYNAMIQUE DES MODULES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left px-4">
          {modules.map((module) => {
             const theme = THEMES[module.color] || THEMES.rose;
             return (
                <button 
                  key={module.id}
                  onClick={() => onNavigate(module.id)}
                  className="p-5 border border-white/10 rounded-xl bg-slate-800/40 hover:bg-slate-800 hover:scale-105 hover:border-blue-500/50 transition-all duration-300 group flex items-center gap-4"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${theme.gradient} shadow-lg shrink-0`}>
                    <i className={`fas ${theme.icon} text-white text-sm`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 leading-tight">{module.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">Cliquez pour ouvrir</p>
                  </div>
                </button>
             );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
