import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Header = ({ xp, level, userName, setUserName, onOpenNotes, onOpenLibrary, isNotesOpen }) => {
  const [time, setTime] = useState(new Date());
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setUserName(tempName);
    setIsEditing(false);
  };

  return (
    <header className="h-16 bg-gradient-to-r from-slate-900/90 via-slate-900/80 to-slate-900/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-40 ml-72 shadow-lg">
      
      {/* Partie Gauche : Identité & Statut */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse"></div>
          </div>
          
          <div className="flex flex-col">
            {isEditing ? (
              <form onSubmit={handleNameSubmit} className="flex items-center gap-2">
                <input 
                  autoFocus
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={handleNameSubmit}
                  className="bg-slate-800 text-white text-sm px-3 py-1 rounded-lg border border-blue-500 outline-none w-40"
                />
                <button type="submit" className="text-emerald-500 hover:text-emerald-400">
                  <i className="fas fa-check text-xs"></i>
                </button>
              </form>
            ) : (
              <>
                <div 
                  onClick={() => setIsEditing(true)}
                  className="text-white font-bold text-sm tracking-wide cursor-pointer hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  {userName}
                  <i className="fas fa-pen text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"></i>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest">{level}</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                  <span className="text-[10px] text-emerald-500 font-mono">{xp} XP</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Partie Centre : Actions Rapides */}
      <div className="flex items-center gap-2">
        {/* Bouton Notes */}
        <button
          onClick={onOpenNotes}
          className={`px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all ${
            isNotesOpen 
              ? 'bg-blue-600 text-white shadow-lg' 
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
          }`}
          title="Carnet de Bord"
        >
          <i className="fas fa-note-sticky"></i>
          <span className="hidden md:inline">Notes</span>
        </button>

        {/* Bouton Bibliothèque */}
        <button
          onClick={onOpenLibrary}
          className="px-3 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-purple-600 hover:text-white flex items-center gap-2 text-xs font-bold transition-all"
          title="Bibliothèque Secrète"
        >
          <i className="fas fa-book-sparkles"></i>
          <span className="hidden md:inline">Bibliothèque</span>
        </button>

        {/* Séparateur */}
        <div className="w-px h-8 bg-white/10 mx-2"></div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>

      {/* Partie Droite : XP & Temps */}
      <div className="flex items-center gap-4">
        {/* Barre d'XP Compacte */}
        <div className="hidden lg:flex items-center gap-3 bg-slate-800/50 rounded-full px-4 py-2 border border-white/5">
          <i className="fas fa-star text-amber-400 text-sm"></i>
          <div className="w-32 h-1.5 bg-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-all duration-1000 shadow-lg"
              style={{ width: `${Math.min(xp % 100, 100)}%` }}
            ></div>
          </div>
          <span className="text-xs font-mono text-slate-400">{xp % 100}/100</span>
        </div>

        {/* Horloge */}
        <div className="flex items-center gap-3 bg-slate-800/50 rounded-full px-4 py-2 border border-white/5">
          <i className="fas fa-clock text-blue-400 text-sm"></i>
          <div className="text-right">
            <div className="text-sm font-mono text-white leading-none font-bold">
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-[9px] text-slate-500 font-mono">
              {time.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
