import React, { useState, useMemo } from 'react';
import { THEMES } from '../styles/themes';

const Dashboard = ({ modules, setView, setActiveModule }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [sortBy, setSortBy] = useState('default'); // 'default', 'alpha', 'progress'

  // Extraction de tous les tags uniques
  const allTags = useMemo(() => {
    const tags = new Set();
    modules.forEach(m => m.tags?.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [modules]);

  // Filtrage et tri avancés
  const filteredModules = useMemo(() => {
    let result = modules;

    // Filtre par recherche
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(m => 
        m.title.toLowerCase().includes(lowerTerm) ||
        m.description.toLowerCase().includes(lowerTerm) ||
        (m.content && m.content.toLowerCase().includes(lowerTerm)) ||
        m.tags?.some(t => t.toLowerCase().includes(lowerTerm))
      );
    }

    // Filtre par tag
    if (selectedTag) {
      result = result.filter(m => m.tags?.includes(selectedTag));
    }

    // Tri
    if (sortBy === 'alpha') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'progress') {
      result = [...result].sort((a, b) => {
        const progressA = parseInt(localStorage.getItem(`progress_${a.id}`) || '0');
        const progressB = parseInt(localStorage.getItem(`progress_${b.id}`) || '0');
        return progressB - progressA;
      });
    }

    return result;
  }, [modules, searchTerm, selectedTag, sortBy]);

  return (
    <div className="p-8 md:p-12 min-h-full animate-fade">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* En-tête */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Centre de Contrôle</h1>
            <p className="text-slate-400">Accès à la base de connaissances unifiée.</p>
          </div>
          
          {/* Barre de Recherche */}
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
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition"
              >
                <i className="fas fa-times text-xs text-slate-300"></i>
              </button>
            )}
          </div>

          {/* Filtres et Tri */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                  !selectedTag 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Tous
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                    selectedTag === tag
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Tri */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-slate-500 uppercase tracking-wider">Trier :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-blue-500 outline-none"
              >
                <option value="default">Par défaut</option>
                <option value="alpha">Alphabétique</option>
                <option value="progress">Progression</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistiques Rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
            <div className="text-3xl font-black text-blue-400 mb-1">{modules.length}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Modules</div>
          </div>
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
            <div className="text-3xl font-black text-emerald-400 mb-1">
              {modules.filter(m => {
                const progress = parseInt(localStorage.getItem(`progress_${m.id}`) || '0');
                return progress === 10;
              }).length}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Terminés</div>
          </div>
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
            <div className="text-3xl font-black text-amber-400 mb-1">
              {modules.reduce((sum, m) => sum + (m.prompts?.length || 0), 0)}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Prompts</div>
          </div>
          <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
            <div className="text-3xl font-black text-purple-400 mb-1">
              {JSON.parse(localStorage.getItem('boucton_favs') || '[]').length}
            </div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Favoris</div>
          </div>
        </div>

        {/* Grille des Résultats */}
        <div>
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
            {filteredModules.length} Module{filteredModules.length > 1 ? 's' : ''} {selectedTag && `• Tag: ${selectedTag}`}
          </h2>
          
          {filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredModules.map((module) => {
                const progress = parseInt(localStorage.getItem(`progress_${module.id}`) || '0');
                const progressPercent = (progress / 10) * 100;

                return (
                  <div
                    key={module.id}
                    onClick={() => { setActiveModule(module.id); setView('module'); }}
                    className="glass-card p-6 rounded-2xl cursor-pointer hover:bg-slate-800 transition-all group relative overflow-hidden border border-white/5 hover:border-blue-500/30"
                  >
                    {/* Barre de progression en background */}
                    <div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    ></div>

                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${THEMES[module.color]?.gradient || 'from-slate-700 to-slate-600'} shadow-lg group-hover:scale-110 transition-transform`}>
                        <i className={`fas ${module.icon || 'fa-box'} text-2xl text-white`}></i>
                      </div>
                      <div className="flex gap-1">
                        {module.is_core && <span className="bg-white/10 text-white text-[10px] px-2 py-1 rounded font-bold uppercase">Core</span>}
                        {progressPercent === 100 && <span className="bg-emerald-500 text-white text-[10px] px-2 py-1 rounded font-bold">✓</span>}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2">{module.title}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{module.description}</p>
                    
                    {/* Tags */}
                    {module.tags && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {module.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-slate-500">{tag}</span>
                        ))}
                      </div>
                    )}

                    {/* Progression */}
                    {progress > 0 && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">{progress}/10</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 opacity-50">
              <i className="fas fa-ghost text-4xl mb-4 text-slate-600"></i>
              <p>Aucun résultat dans la base de données.</p>
              {(searchTerm || selectedTag) && (
                <button
                  onClick={() => { setSearchTerm(''); setSelectedTag(null); }}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
