import React, { useState, useEffect } from 'react';

const Header = ({ xp, level, userName, setUserName, theme, toggleTheme }) => {
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
    <header className="h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-6 sticky top-0 z-30 ml-72 transition-colors duration-300">
      
      {/* Partie Gauche : Identité */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             
             {isEditing ? (
               <form onSubmit={handleNameSubmit}>
                 <input 
                   autoFocus
                   type="text" 
                   value={tempName} 
                   onChange={(e) => setTempName(e.target.value)}
                   onBlur={handleNameSubmit}
                   className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm px-2 py-0.5 rounded border border-blue-500 outline-none"
                 />
               </form>
             ) : (
               <h2 
                 onClick={() => setIsEditing(true)}
                 className="text-slate-900 dark:text-white font-bold text-sm tracking-wide cursor-pointer hover:text-blue-500 transition-colors border-b border-transparent hover:border-blue-400/50"
                 title="Cliquez pour modifier votre nom"
               >
                 {userName}
               </h2>
             )}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest pl-4">Système Online v2.0</span>
        </div>
      </div>

      {/* Partie Droite : Gamification & Temps */}
      <div className="flex items-center gap-6 pr-20"> {/* PR-20 pour ne pas chevaucher les boutons outils */}
        
        {/* Toggle Theme */}
        <button 
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-amber-500 dark:text-blue-400 hover:scale-110 transition shadow-sm"
            title={theme === 'dark' ? "Passer en mode Clair" : "Passer en mode Sombre"}
        >
            <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
        </button>

        {/* Barre d'XP */}
        <div className="flex flex-col items-end gap-1">
          <div className="text-xs text-blue-600 dark:text-blue-300 font-bold uppercase">{level}</div>
          <div className="w-32 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000" style={{ width: `${Math.min(xp % 100, 100)}%` }}></div>
          </div>
          <div className="text-[10px] text-slate-500">{xp} XP</div>
        </div>

        {/* Horloge */}
        <div className="pl-6 border-l border-slate-200 dark:border-white/10 text-right hidden lg:block">
          <div className="text-lg font-mono text-slate-700 dark:text-white leading-none">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {time.toLocaleDateString()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
