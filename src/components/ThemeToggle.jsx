import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('boucton_theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    // Application du thème
    if (theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('boucton_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: `Mode ${theme === 'dark' ? '☀️ clair' : '🌙 sombre'} activé` 
    }));
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 bg-slate-700 dark:bg-slate-800 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-inner"
      aria-label="Toggle theme"
      title={`Passer en mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
    >
      {/* Track avec dégradé */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 transition-opacity duration-300 ${
          theme === 'light' ? 'opacity-100' : 'opacity-0'
        }`}></div>
        <div className={`absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>

      {/* Switch */}
      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 flex items-center justify-center ${
        theme === 'dark' ? 'translate-x-9' : 'translate-x-1'
      }`}>
        {theme === 'dark' ? (
          <i className="fas fa-moon text-[10px] text-indigo-600"></i>
        ) : (
          <i className="fas fa-sun text-[10px] text-amber-500"></i>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
