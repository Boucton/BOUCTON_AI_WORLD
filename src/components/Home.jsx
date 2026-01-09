import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import V2
import { THEMES } from '../styles/themes';

const Home = ({ modules, onStart }) => {
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate(); // Hook V2

  useEffect(() => setLoaded(true), []);

  const handleQuickStart = () => {
    // On appelle la fonction onStart pour l'XP, puis on navigue
    if (onStart) onStart(); 
    navigate('/dashboard'); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
       
       {/* Fond subtil */}
       <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none" 
            style={{ 
              backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', 
              backgroundSize: '40px 40px',
              transform: 'perspective(500px) rotateX(20deg) scale(1.2)'
            }}>
       </div>
       
       <div className={`z-10 max-w-5xl w-full transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
              Système v2.0 Online
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
              BOUCTON<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">_AI</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Interface d'augmentation cognitive pour la pratique médicale. <br/>
              <span className="text-slate-900 dark:text-white font-medium">Maîtrisez l'IA. Ne la subissez pas.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
             {/* Bouton Principal */}
             <button onClick={handleQuickStart} className="col-span-1 md:col-span-2 lg:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl hover:scale-[1.02] transition-transform flex flex-col justify-between group cursor-pointer">
                <div className="text-4xl mb-4 group-hover:translate-x-2 transition-transform"><i className="fas fa-rocket"></i></div>
                <div className="text-left">
                  <div className="font-bold text-2xl">Accès Rapide</div>
                  <div className="text-blue-100 text-sm">Ouvrir le Tableau de Bord</div>
                </div>
             </button>

             {/* Modules */}
             {modules.slice(0, 5).map(module => (
               <button key={module.id} onClick={() => navigate(`/module/${module.id}`)} className="p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 hover:border-blue-500/30 transition-all text-left group shadow-sm hover:shadow-lg">
                 <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${THEMES[module.color]?.gradient || 'from-slate-700 to-slate-600'} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                   <i className={`fas ${THEMES[module.color]?.icon}`}></i>
                 </div>
                 <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">{module.title}</h3>
                 <p className="text-xs text-slate-500 dark:text-slate-500 line-clamp-2">{module.description}</p>
               </button>
             ))}
          </div>
       </div>
    </div>
  );
};

export default Home;
