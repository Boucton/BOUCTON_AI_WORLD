import React, { useState, useEffect } from 'react';

// On ajoute 'onNavigate' dans les props
const Home = ({ onStart, onNavigate }) => {

  const [text, setText] = useState('');
const fullText = "BOUCTON_AI_WORLD";

useEffect(() => {
  let index = 0;
  const interval = setInterval(() => {
    setText(fullText.substring(0, index));
    index++;
    if (index > fullText.length) clearInterval(interval);
  }, 100); // Vitesse de frappe
  return () => clearInterval(interval);
}, []);
  
  // Fonction utilitaire pour les cartes
  const ModuleCard = ({ title, id, color }) => (
    <button 
      onClick={() => onNavigate(id)}
      className="p-6 border border-white/10 rounded-xl bg-slate-800/50 hover:bg-slate-800 hover:scale-105 hover:border-blue-500/50 transition-all duration-300 group text-left"
    >
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400">{title}</h3>
      <p className="text-sm text-slate-400">Cliquez pour ouvrir le module</p>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-slate-900 text-white relative overflow-hidden">
       {/* Fond animé simple */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
       </div>

      <div className="z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white font-mono">
  {text}<span className="animate-pulse">_</span>
</h1>
          BOUCTON AI
        </h1>
        <p className="text-2xl text-slate-300 mb-10 font-light">
          L'encyclopédie interactive pour <span className="text-blue-400 font-bold">maîtriser l'IA</span>.
        </p>
        
        <button
          onClick={onStart}
          className="px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-500 transition-all font-bold text-lg shadow-lg hover:shadow-blue-500/25 mb-16"
        >
          Accéder au Tableau de Bord 🚀
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <ModuleCard title="🏥 Dr GOURMAND" id="dr_gourmand" />
          <ModuleCard title="⚙️ META-IA" id="meta_ia" />
          <ModuleCard title="📘 CODEX IA" id="codex_ia" />
        </div>
      </div>
    </div>
  );
};

export default Home;
