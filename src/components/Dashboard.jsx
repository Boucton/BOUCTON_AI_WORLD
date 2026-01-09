import React from 'react';
import { THEMES } from '../styles/themes';

const Dashboard = ({ modules, setView, setActiveModule }) => {
  // Calcul rapide pour donner l'impression de data
  const totalPrompts = modules.reduce((acc, m) => acc + (m.prompts ? m.prompts.length : 0), 0);

  return (
    <div className="p-8 md:p-12 min-h-full">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* En-tête avec Statut */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Tableau de Bord</h1>
            <p className="text-slate-400">Prêt à augmenter votre productivité, Dr Boucton ?</p>
          </div>
          <div className="flex gap-4">
             <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">{modules.length}</div>
                <div className="text-xs text-slate-500 uppercase font-bold">Modules Actifs</div>
             </div>
             <div className="text-right pl-4 border-l border-white/10">
                <div className="text-2xl font-bold text-emerald-400">{totalPrompts}</div>
                <div className="text-xs text-slate-500 uppercase font-bold">Prompts Disponibles</div>
             </div>
          </div>
        </div>

        {/* Section Modules */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <i className="fas fa-cubes text-blue-500"></i> Vos Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <div
                key={module.id}
                onClick={() => { setActiveModule(module.id); setView('module'); }}
                className="glass-card p-6 rounded-2xl cursor-pointer hover:bg-slate-800 transition-all group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity`}>
                   <i className={`fas ${module.icon || 'fa-box'} text-6xl text-white`}></i>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${THEMES[module.color]?.gradient || 'from-slate-700 to-slate-600'} shadow-lg`}>
                    <i className={`fas ${THEMES[module.color]?.icon || 'fa-box'} text-white`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{module.title}</h3>
                </div>
                <p className="text-sm text-slate-400 line-clamp-2">{module.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Rapides (Fausse fonctionnalité pour l'instant, mais donne de la vie) */}
        <div>
           <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <i className="fas fa-bolt text-amber-500"></i> Actions Rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <button className="p-4 bg-slate-900 border border-white/5 rounded-xl text-left hover:border-blue-500/50 transition flex items-center gap-4 group"
                onClick={() => alert("Fonctionnalité 'Nouveau Projet' à venir !")}>
                <div className="bg-blue-500/20 p-2 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition"><i className="fas fa-plus"></i></div>
                <span className="text-slate-300 font-medium">Créer un nouveau projet META-IA</span>
             </button>
             <button className="p-4 bg-slate-900 border border-white/5 rounded-xl text-left hover:border-rose-500/50 transition flex items-center gap-4 group"
                onClick={() => alert("Mode Urgence non connecté !")}>
                <div className="bg-rose-500/20 p-2 rounded-lg text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition"><i className="fas fa-heart-pulse"></i></div>
                <span className="text-slate-300 font-medium">Lancer une simulation d'urgence</span>
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
