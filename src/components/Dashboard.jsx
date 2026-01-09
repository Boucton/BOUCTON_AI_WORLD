import React, { useState, useMemo } from 'react';
import { THEMES } from '../styles/themes';

const Dashboard = ({ modules, setView, setActiveModule }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrage intelligent (Deep Search)
  const filteredModules = useMemo(() => {
    if (!searchTerm) return modules;
    const lowerTerm = searchTerm.toLowerCase();
    
    return modules.filter(m => 
      m.title.toLowerCase().includes(lowerTerm) ||
      m.description.toLowerCase().includes(lowerTerm) ||
      // Recherche dans le contenu (Markdown) s'il est chargé
      (m.content && m.content.toLowerCase().includes(lowerTerm))
    );
  }, [modules, searchTerm]);

  return (
    <div className="p-8 md:p-12 min-h-full animate-fade">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* En-tête + Recherche */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Centre de Contrôle</h1>
            <p className="text-slate-400">Accès à la base de connaissances unifiée.</p>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-search text-slate-500 group-focus-within:text-blue-400 transition-colors"></i>
            </div>
            <input
              type="text"
              placeholder="Rechercher un module, un concept, une procédure..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-lg shadow-inner"
              autoFocus
            />
            {searchTerm && (
                <div className="absolute right-4 top-4 text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded">
                    Recherche profonde active
                </div>
            )}
          </div>
        </div>

        {/* Grille des Résultats */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            {filteredModules.length} Modules Pertinents
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
                  
                  {/* Affichage tags */}
                  {module.tags && (
                      <div className="flex flex-wrap gap-1 mt-3">
                          {module.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-500">{tag}</span>
                          ))}
                      </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 opacity-50">
              <i className="fas fa-ghost text-4xl mb-4 text-slate-600"></i>
              <p>Aucun résultat dans la base de données.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
