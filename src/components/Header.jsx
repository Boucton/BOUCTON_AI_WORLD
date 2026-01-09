import React, { useState } from 'react';

const Header = ({ userName, setUserName, theme, toggleTheme }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setUserName(tempName);
    setIsEditing(false);
  };

  return (
    <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 flex items-center justify-between px-8 sticky top-0 z-30 transition-colors duration-300">
      
      {/* Identité */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
           {userName.charAt(0).toUpperCase()}
        </div>
        <div>
           {isEditing ? (
             <form onSubmit={handleNameSubmit}>
               <input 
                 autoFocus
                 type="text" 
                 value={tempName} 
                 onChange={(e) => setTempName(e.target.value)}
                 onBlur={handleNameSubmit}
                 className="bg-transparent border-b border-blue-500 text-slate-900 dark:text-white outline-none font-bold"
               />
             </form>
           ) : (
             <h2 
               onClick={() => setIsEditing(true)}
               className="text-slate-900 dark:text-white font-bold text-lg cursor-pointer hover:text-blue-500 transition-colors"
               title="Modifier nom"
             >
               {userName}
             </h2>
           )}
           <div className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2"></span>
              Prêt
           </div>
        </div>
      </div>

      {/* Contrôles Droite (Simplifiés) */}
      <div className="flex items-center gap-4 pr-32"> {/* Padding Right pour laisser place aux outils absolus */}
        <button 
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-slate-700 transition"
        >
            <i className={`fas ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
            <span className="text-xs font-bold uppercase">{theme === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
