import React, { useState } from 'react';

const Launchpad = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tools = [
    { 
      name: 'Gemini', 
      url: 'https://gemini.google.com/app',
      bg: 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500',
      text: 'text-white',
      icon: '✦'
    },
    { 
      name: 'NotebookLM', 
      url: 'https://notebooklm.google.com',
      bg: 'bg-white',
      text: 'text-slate-900',
      border: 'border border-slate-300',
      icon: '📔'
    },
    { 
      name: 'Mistral', 
      url: 'https://chat.mistral.ai',
      bg: 'bg-gradient-to-br from-orange-500 to-red-600',
      text: 'text-white',
      icon: '🌪️'
    },
    { 
      name: 'ChatGPT', 
      url: 'https://chat.openai.com',
      bg: 'bg-[#10a37f]',
      text: 'text-white',
      icon: '💬'
    },
    { 
      name: 'Claude', 
      url: 'https://claude.ai',
      bg: 'bg-gradient-to-br from-orange-400 to-amber-600',
      text: 'text-white',
      icon: '🧠'
    },
    { 
      name: 'Perplexity', 
      url: 'https://www.perplexity.ai',
      bg: 'bg-gradient-to-br from-teal-500 to-cyan-600',
      text: 'text-white',
      icon: '🔍'
    },
    { 
      name: 'OpenEvidence', 
      url: 'https://www.openevidence.com',
      bg: 'bg-gradient-to-br from-indigo-600 to-blue-700',
      text: 'text-white',
      icon: '🔬'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      {/* Liste des outils (dépliée) */}
      <div className={`flex flex-col items-end gap-2 transition-all duration-300 origin-bottom-right ${
        isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
      }`}>
        
        {tools.map((tool, index) => (
          <React.Fragment key={tool.name}>
            {/* Séparateur après les essentiels */}
            {index === 2 && (
              <div className="h-px w-20 bg-white/10 my-1 mr-2"></div>
            )}

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-2 pr-4 rounded-full shadow-xl hover:bg-slate-800 hover:scale-105 hover:border-white/20 transition-all w-max"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${tool.bg} ${tool.text} ${tool.border || ''} text-xl`}>
                {tool.icon}
              </div>
              <span className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors">
                {tool.name}
              </span>
              {index < 2 && (
                <i className="fas fa-star text-[10px] text-amber-400 animate-pulse"></i>
              )}
            </a>
          </React.Fragment>
        ))}
        
        <div className="text-[10px] text-slate-500 font-medium tracking-widest uppercase mr-3 mt-1">
          Connexion Rapide
        </div>
      </div>

      {/* Bouton Principal Fusée */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.4)] flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 z-50 border-2
          ${isOpen 
            ? 'bg-slate-900 text-white rotate-45 border-white/30' 
            : 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white border-white/20 animate-pulse'
          }`}
        title={isOpen ? "Fermer" : "Ouvrir le Launchpad"}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-rocket'}`}></i>
      </button>
    </div>
  );
};

export default Launchpad;
