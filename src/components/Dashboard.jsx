import React, { useState, useMemo } from 'react';
import { THEMES } from '../styles/themes';

const Dashboard = ({ modules, setView, setActiveModule }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrage intelligent
  const filteredModules = useMemo(() => {
    return modules.filter(m => 
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [modules, searchTerm]);

  return (
    <div className="p-8 md:p-12 min-h-full">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* En-tête + Recherche */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Centre de Contrôle</h1>
            <p className="text-slate-400">Quelle connaissance souhaitez-vous activer aujourd'hui ?</p>
          </div>
          
          {/* Barre de recherche massive */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-search text-slate-500 group-focus-within:text-blue-400 transition-colors"></i>
            </div>
            <input
              type="text"
              placeholder="Rechercher un module, un concept, une urgence..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-lg shadow-inner"
              autoFocus
            />
          </div>
        </div>

        {/* Grille des Résultats */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            {filteredModules.length} Modules Détectés
          </h2>
          
          {filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => { setActiveModule(module.id); setView('module'); }}
                  className="glass-card p-6 rounded-2xl cursor-pointer hover:bg-slate-800 transition-all group relative overflow-hidden border border-white/5 hover:border-blue-500/30"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${THEMES[module.color]?.gradient || 'from-slate-700 to-slate-600'} shadow-lg group-hover:scale-110 transition-transform`}>
                      <i className={`fas ${module.icon || 'fa-box'} text-2xl text-white`}></i>
                    </div>
                    {module.is_core && <span className="bg-white/10 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">Core</span>}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{module.title}</h3>
                  <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{module.description}</p>
                  
                  <div className="mt-4 flex items-center gap-2 text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                    <span>Ouvrir le module</span> <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 opacity-50">
              <i className="fas fa-ghost text-4xl mb-4 text-slate-600"></i>
              <p>Aucun module ne correspond à votre recherche.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
