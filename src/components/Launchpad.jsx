import React, { useState } from 'react';

// --- ICONES SVG ---
const Icons = {
  Gemini: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 24c0-6.627-5.373-12-12-12 6.627 0 12-5.373 12-12 0 6.627 5.373 12 12 12-6.627 0-12 5.373-12 12z" /></svg>
  ),
  NotebookLM: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
  ),
  Mistral: () => (
    <svg viewBox="0 0 30 20" className="w-5 h-5">
      <rect width="10" height="20" fill="#0055A4" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#EF4135" />
    </svg>
  ),
  ChatGPT: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a4.006 4.006 0 0 1-4.455 10.129zm4.922-3.23a4.48 4.48 0 0 1-3.625 2.396v-3.837a.785.785 0 0 0-.392-.681l-6.246-3.606v-2.336l5.811 3.355a4.006 4.006 0 0 1 4.452 4.709zm1.023-9.424a4.013 4.013 0 0 1 .75 2.193 3.995 3.995 0 0 1-1.464 3.03l-2.02-1.168v-6.737a.792.792 0 0 0-.392-.681l-4.78-2.76a4.478 4.478 0 0 1 2.878 1.041 4.487 4.487 0 0 1 5.028 5.082zM4.809 11.237a4.476 4.476 0 0 1 3.626-2.396v3.837a.795.795 0 0 0 .391.681l6.248 3.606v2.336l-5.812-3.355a4.008 4.008 0 0 1-4.453-4.709zM4.98 4.18a4.484 4.484 0 0 1 5.512-.663l-4.778 2.758a.795.795 0 0 0-.393.681v6.738l-2.02-1.169a3.997 3.997 0 0 1 1.679-8.345zm10.785 4.312-5.81-3.355a4.006 4.006 0 0 1 3.253-.41 4.006 4.006 0 0 1 2.557 5.12l-2.02 1.168V6.737a.795.795 0 0 0-.391-.681l-2.02 1.168.14.081 2.29 1.325z" /></svg>
  ),
  Claude: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" /></svg>
  ),
  Perplexity: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2L9.5 9.5L2 12L9.5 14.5L12 22L14.5 14.5L22 12L14.5 9.5L12 2Z" /></svg>
  ),
  Manus: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M4 4h4v16H4V4zm6 0h4v11h-4V4zm6 0h4v16h-4V4z" /></svg>
  ),
  OpenEvidence: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V8h2v4zm4 4h-2v-2h2v2zm0-4h-2V8h2v4z" /></svg>
  )
};

const Launchpad = () => {
  const [isOpen, setIsOpen] = useState(false);

  // La liste ordonnée et configurée
  const tools = [
    // --- LES ESSENTIELS ---
    { 
      name: 'Gemini', 
      url: 'https://gemini.google.com', 
      icon: Icons.Gemini, 
      bg: 'bg-gradient-to-r from-blue-500 to-pink-500', 
      text: 'text-white' 
    },
    { 
      name: 'NotebookLM', 
      url: 'https://notebooklm.google.com', 
      icon: Icons.NotebookLM, 
      bg: 'bg-white', 
      text: 'text-slate-900',
      border: 'border-slate-300'
    },
    // --- LES AUTRES ---
    { 
      name: 'Mistral', 
      url: 'https://chat.mistral.ai', 
      icon: Icons.Mistral, 
      bg: 'bg-slate-800', 
      text: 'text-white',
      special: true 
    },
    { 
      name: 'ChatGPT', 
      url: 'https://chat.openai.com', 
      icon: Icons.ChatGPT, 
      bg: 'bg-[#10a37f]', 
      text: 'text-white' 
    },
    { 
      name: 'Claude', 
      url: 'https://claude.ai', 
      icon: Icons.Claude, 
      bg: 'bg-[#d97757]', 
      text: 'text-white' 
    },
    { 
      name: 'Manus', 
      url: 'https://manus.im/app', 
      icon: Icons.Manus, 
      bg: 'bg-indigo-600', 
      text: 'text-white' 
    },
    { 
      name: 'Perplexity', 
      url: 'https://www.perplexity.ai/', 
      icon: Icons.Perplexity, 
      bg: 'bg-[#22bfa0]', 
      text: 'text-slate-900' 
    },
    { 
      name: 'OpenEvidence', 
      url: 'https://www.openevidence.com/', 
      icon: Icons.OpenEvidence, 
      bg: 'bg-blue-800', 
      text: 'text-white' 
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      
      {/* Liste des outils (dépliée) */}
      <div className={`flex flex-col items-end gap-3 transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        
        {tools.map((tool, index) => (
          <React.Fragment key={tool.name}>
            {/* Séparateur après les essentiels (index 1 = NotebookLM) */}
            {index === 2 && (
               <div className="h-px w-24 bg-white/10 my-1 mr-2"></div>
            )}

            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-2 pr-5 rounded-full shadow-xl hover:bg-slate-800 hover:scale-105 transition-all group w-max"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${tool.bg} ${tool.text} ${tool.border || ''}`}>
                <tool.icon />
              </div>
              <span className="font-bold text-sm text-slate-200 group-hover:text-white">{tool.name}</span>
              {index < 2 && <i className="fas fa-star text-[10px] text-yellow-500 ml-1 animate-pulse"></i>}
            </a>
          </React.Fragment>
        ))}
        
        <div className="text-[10px] text-slate-400 font-medium tracking-widest uppercase mr-3 mb-1">
           Connexion Rapide
        </div>
      </div>

      {/* Bouton Principal Fusée */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-[0_0_40px_rgba(37,99,235,0.5)] flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 z-50 border-2 border-white/20
          ${isOpen 
            ? 'bg-slate-900 text-white rotate-45' 
            : 'bg-gradient-to-br from-blue-600 to-violet-600 text-white animate-blob'}`}
      >
        <i className={`fas ${isOpen ? 'fa-plus' : 'fa-rocket'}`}></i>
      </button>
    </div>
  );
};

export default Launchpad;
