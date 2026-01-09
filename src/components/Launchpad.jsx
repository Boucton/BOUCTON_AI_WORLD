import React, { useState } from 'react';

const Launchpad = () => {
  const [isOpen, setIsOpen] = useState(false);

  const tools = [
    { name: 'Gemini', url: 'https://gemini.google.com', icon: 'fa-google', color: 'text-blue-400' },
    { name: 'ChatGPT', url: 'https://chat.openai.com', icon: 'fa-robot', color: 'text-emerald-400' },
    { name: 'Mistral', url: 'https://chat.mistral.ai', icon: 'fa-wind', color: 'text-amber-400' },
    { name: 'Claude', url: 'https://claude.ai', icon: 'fa-brain', color: 'text-rose-400' }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Liste des outils (dépliée) */}
      <div className={`flex flex-col gap-2 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-slate-800/90 backdrop-blur border border-white/10 p-3 rounded-full shadow-lg hover:bg-slate-700 hover:scale-105 transition-all text-white group pr-6"
          >
            <div className={`w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center ${tool.color}`}>
              <i className={`fab ${tool.icon} text-lg`}></i>
            </div>
            <span className="font-bold text-sm">{tool.name}</span>
          </a>
        ))}
      </div>

      {/* Bouton Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-white text-slate-900 rotate-45' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'}`}
      >
        <i className="fas fa-rocket"></i>
      </button>
    </div>
  );
};

export default Launchpad;
