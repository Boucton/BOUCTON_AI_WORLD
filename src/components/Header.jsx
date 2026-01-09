import React, { useState, useEffect } from 'react';

const Header = ({ xp, level, userName = "Dr. Boucton" }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 sticky top-0 z-30 ml-72">
      {/* Partie Gauche : Identité & Statut */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <h2 className="text-white font-bold text-sm tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {userName}
          </h2>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Système Online</span>
        </div>
      </div>

      {/* Partie Droite : Gamification & Temps */}
      <div className="flex items-center gap-6">
        
        {/* Barre d'XP */}
        <div className="flex items-col gap-1 text-right">
          <div className="text-xs text-blue-300 font-bold uppercase">{level}</div>
          <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000"
              style={{ width: `${Math.min(xp % 100, 100)}%` }}
            ></div>
          </div>
          <div className="text-[10px] text-slate-500">{xp} XP</div>
        </div>

        {/* Horloge Médicale */}
        <div className="pl-6 border-l border-white/10 text-right">
          <div className="text-lg font-mono text-white leading-none">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            {time.toLocaleDateString()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
