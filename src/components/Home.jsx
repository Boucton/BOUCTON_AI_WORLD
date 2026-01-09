import React from 'react';

const Home = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-slate-900 text-white">
      <h1 className="text-5xl font-bold mb-6 text-blue-500">
        BOUCTON AI WORLD
      </h1>
      <p className="text-xl text-slate-400 mb-8 max-w-2xl">
        Bienvenue dans ton encyclopédie intelligente.
      </p>
      
      <button
        onClick={onStart}
        className="px-8 py-4 bg-blue-600 rounded-xl hover:bg-blue-700 transition font-bold text-lg"
      >
        Lancer l'Application 🚀
      </button>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
        <div className="p-4 border border-white/10 rounded-lg">Dr GOURMAND</div>
        <div className="p-4 border border-white/10 rounded-lg">META-IA</div>
        <div className="p-4 border border-white/10 rounded-lg">CODEX IA</div>
      </div>
    </div>
  );
};

export default Home;
