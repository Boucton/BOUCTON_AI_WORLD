import React from 'react';

const Settings = () => {
  const handleReset = () => {
    if (confirm("⚠️ ATTENTION : Cela va effacer TOUTE votre progression (XP, Notes, Favoris). Êtes-vous sûr ?")) {
        localStorage.clear();
        window.location.reload();
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade">
      <h1 className="text-4xl font-black text-white mb-8">Paramètres Système</h1>

      <div className="space-y-6">
        {/* Section Apparence (Placeholder pour futur) */}
        <div className="glass-card p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold text-white mb-4"><i className="fas fa-paint-brush text-purple-400 mr-2"></i> Interface</h3>
            <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-slate-300">Animations Avancées</span>
                <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
            </div>
            <div className="flex items-center justify-between py-2 pt-4">
                <span className="text-slate-300">Mode "Neural Network" (Fond animé)</span>
                <div className="w-10 h-6 bg-blue-600 rounded-full relative cursor-pointer"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
            </div>
        </div>

        {/* Section Danger Zone */}
        <div className="glass-card p-6 rounded-2xl border border-red-500/30 bg-red-500/5">
            <h3 className="text-xl font-bold text-red-400 mb-4"><i className="fas fa-exclamation-triangle mr-2"></i> Zone de Danger</h3>
            <p className="text-sm text-slate-400 mb-6">Ces actions sont irréversibles. Manipulez avec précaution.</p>
            
            <button 
                onClick={handleReset}
                className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition shadow-lg flex items-center gap-2"
            >
                <i className="fas fa-trash-alt"></i> Réinitialiser toutes les données (Factory Reset)
            </button>
        </div>

        {/* Crédits */}
        <div className="text-center mt-12 text-slate-600 text-xs">
            <p>BOUCTON_AI_WORLD Kernel v2.0</p>
            <p>Développé avec React, Vite & Tailwind</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
