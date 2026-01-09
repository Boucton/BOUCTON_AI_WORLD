import React, { useState, useEffect } from 'react';
import { THEMES } from '../styles/themes';

const Home = ({ modules, onStart, onNavigate }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-950">
       
       {/* Background Grid Animation */}
       <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
              backgroundSize: '40px 40px',
              transform: 'perspective(500px) rotateX(20deg) scale(1.2)'
            }}>
       </div>
       
       <div className={`z-10 max-w-5xl w-full transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
              Système v1.1 Online
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
              BOUCTON<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">_AI</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Interface d'augmentation cognitive pour la pratique médicale. <br/>
              <span className="text-white">Maîtrisez l'IA. Ne la subissez pas.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
             {/* Bouton Principal */}
             <button onClick={onStart} className="col-span-1 md:col-span-2 lg:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl hover:scale-[1.02] transition-transform flex flex-col justify-between group">
                <div className="text-4xl mb-4 group-hover:translate-x-2 transition-transform"><i className="fas fa-rocket"></i></div>
                <div className="text-left">
                  <div className="font-bold text-2xl">Accès Rapide</div>
                  <div className="text-blue-200 text-sm">Ouvrir le Tableau de Bord</div>
                </div>
             </button>

             {/* Modules */}
             {modules.slice(0, 5).map(module => (
               <button key={module.id} onClick={() => onNavigate(module.id)} className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:bg-slate-800 hover:border-blue-500/30 transition-all text-left group">
                 <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${THEMES[module.color]?.gradient || 'from-slate-700 to-slate-600'} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                   <i className={`fas ${THEMES[module.color]?.icon}`}></i>
                 </div>
                 <h3 className="font-bold text-white text-lg mb-1 group-hover:text-blue-400">{module.title}</h3>
                 <p className="text-xs text-slate-500 line-clamp-2">{module.description}</p>
               </button>
             ))}
          </div>

       </div>
    </div>
  );
};

export default Home;
