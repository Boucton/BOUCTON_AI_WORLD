import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du navigateur
import { THEMES } from '../styles/themes';

const Dashboard = ({ modules }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook de navigation

  // Filtrage intelligent
  const filteredModules = useMemo(() => {
    if (!searchTerm) return modules;
    const lowerTerm = searchTerm.toLowerCase();
    return modules.filter(m => 
      m.title.toLowerCase().includes(lowerTerm) ||
      m.description.toLowerCase().includes(lowerTerm) ||
      (m.content && m.content.toLowerCase().includes(lowerTerm))
    );
  }, [modules, searchTerm]);

  return (
    <div className="p-8 md:p-12 min-h-full animate-fade">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* En-tête + Recherche */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Centre de Contrôle</h1>
            <p className="text-slate-500 dark:text-slate-400">Accès à la base de connaissances unifiée.</p>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <i className="fas fa-search text-slate-400 group-focus-within:text-blue-500 transition-colors"></i>
            </div>
            <input
              type="text"
              placeholder="Rechercher un module, un concept, une procédure..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg shadow-sm"
            />
          </div>
        </div>

        {/* Grille des Résultats */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            {filteredModules.length} Modules Disponibles
          </h2>
          
          {filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => navigate(`/module/${module.id}`)} // NAVIGATION V2
                  className="glass-card p-6 rounded-2xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group relative overflow-hidden border border-slate-200 dark:border-white/5 hover:border-blue-500/30 shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${THEMES[module.color]?.gradient || 'from-slate-700 to-slate-600'} shadow-lg group-hover:scale-110 transition-transform`}>
                      <i className={`fas ${module.icon || 'fa-box'} text-2xl text-white`}></i>
                    </div>
                    {module.is_core && <span className="bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-white text-[10px] px-2 py-1 rounded font-bold uppercase">Core</span>}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">{module.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{module.description}</p>
                  
                  {module.tags && (
                      <div className="flex flex-wrap gap-1 mt-3">
                          {module.tags.slice(0, 3).map(tag => (
                              <span key={tag} className="text-[10px] bg-slate-100 dark:bg-white/5 px-1.5 py-0.5 rounded text-slate-500">{tag}</span>
                          ))}
                      </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 opacity-50">
              <i className="fas fa-ghost text-4xl mb-4 text-slate-400"></i>
              <p className="text-slate-500">Aucun résultat trouvé.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
