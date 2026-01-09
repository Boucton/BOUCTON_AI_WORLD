import React from 'react';

const Home = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center p-4 text-center mt-10">
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white animate-fade">
          L'Écosystème IA<br />pour Médecins & Chercheurs
        </h1>
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto animate-fade" style={{ animationDelay: '0.2s' }}>
          Une plateforme **interactive, modulaire et pédagogique** pour maîtriser l'IA, sans dispersion cognitive.
        </p>
        
        <button
          onClick={onStart}
          className="group px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-3 text-lg font-bold animate-fade"
          style={{ animationDelay: '0.4s' }}
        >
          <i className="fas fa-rocket group-hover:rotate-12 transition-transform"></i>
          Lancer l'Application
        </button>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon="fa-user-doctor" 
            color="from-rose-500 to-red-600" 
            title="Dr GOURMAND" 
            desc="Simulateur clinique réaliste avec scénarios dynamiques." 
          />
          <FeatureCard 
            icon="fa-cogs" 
            color="from-sky-500 to-blue-600" 
            title="META-IA" 
            desc="Méthodologie standardisée pour vos workflows." 
          />
          <FeatureCard 
            icon="fa-code" 
            color="from-indigo-500 to-violet-600" 
            title="CODEX IA" 
            desc="Bibliothèque de prompts prêts à l'emploi." 
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center text-slate-500 text-sm border-t border-white/5">
        <p>© 2026 BOUCTON_AI_WORLD. Un projet encyclopédique.</p>
      </footer>
    </div>
  );
};

// Petit composant interne pour éviter la répétition
const FeatureCard = ({ icon, color, title, desc }) => (
  <div className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1">
    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
      <i className={`fas ${icon} text-white`}></i>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-400">{desc}</p>
  </div>
);

export default Home;
