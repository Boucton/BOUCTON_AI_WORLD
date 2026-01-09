import React, { useState, useMemo, useEffect } from 'react';
import { THEMES } from '../styles/themes';

const PromptCard = ({ prompt, moduleId, isActive, setActivePrompt }) => {
  const [inputs, setInputs] = useState({});
  const [modifier, setModifier] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = THEMES[prompt.color || 'rose'];

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('boucton_favs') || '[]');
    setIsFavorite(favs.includes(prompt.id));
  }, [prompt.id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const favs = JSON.parse(localStorage.getItem('boucton_favs') || '[]');
    let newFavs;
    if (favs.includes(prompt.id)) {
        newFavs = favs.filter(id => id !== prompt.id);
    } else {
        newFavs = [...favs, prompt.id];
    }
    localStorage.setItem('boucton_favs', JSON.stringify(newFavs));
    setIsFavorite(!isFavorite);
  };

  const rollDice = (e) => {
    e.stopPropagation();
    if (!prompt.modifiers || prompt.modifiers.length === 0) return;
    const randomMod = prompt.modifiers[Math.floor(Math.random() * prompt.modifiers.length)];
    setModifier(randomMod);
  };

  const finalPrompt = useMemo(() => {
    let t = prompt.template?.system || '';
    Object.entries(inputs).forEach(([k, v]) => t = t.replace(`{{${k}}}`, v || `[${k}]`));
    return t.replace('{{modifier}}', modifier || '[Aucune]');
  }, [inputs, modifier, prompt]);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: '✅ Prompt copié !' }));
  };

  // Génération de liens directs (Gemini CORRIGÉ)
  const openInAI = (aiType) => {
    // Gemini n'accepte PAS les paramètres d'URL, on copie simplement et on ouvre
    if (aiType === 'gemini') {
      navigator.clipboard.writeText(finalPrompt);
      window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
      window.dispatchEvent(new CustomEvent('show-toast', { 
        detail: '✦ Prompt copié ! Collez-le dans Gemini' 
      }));
      return;
    }

    // Les autres IA supportent les paramètres URL
    const urls = {
      mistral: `https://chat.mistral.ai/chat`,
      chatgpt: `https://chat.openai.com/`,
      claude: `https://claude.ai/new`
    };
    
    // Copier le prompt dans le presse-papier pour toutes les IA
    navigator.clipboard.writeText(finalPrompt);
    window.open(urls[aiType], '_blank', 'noopener,noreferrer');
    
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: `🚀 Prompt copié ! Collez-le dans ${aiType.toUpperCase()}` 
    }));
  };

  return (
    <div 
      onClick={() => setActivePrompt(isActive ? null : prompt.id)}
      className={`relative group rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden
        ${isActive ? 'bg-slate-900 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'bg-slate-800/40 border-white/5 hover:bg-slate-800 hover:border-white/10'}
        ${isFavorite ? 'ring-1 ring-amber-500/50' : ''}
      `}
    >
      {/* Header Carte */}
      <div className="p-5 flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${theme.gradient} shadow-lg text-white font-bold text-xl`}>
          <i className={`fas ${prompt.icon || 'fa-bolt'}`}></i>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
             <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">{prompt.title}</h3>
             <button onClick={toggleFavorite} className={`text-sm transition-colors z-10 p-1 ${isFavorite ? 'text-amber-400' : 'text-slate-600 hover:text-slate-300'}`}>
                <i className={`${isFavorite ? 'fas' : 'far'} fa-star`}></i>
             </button>
          </div>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1">{prompt.description}</p>
        </div>
      </div>

      {/* Contenu Dépliable */}
      <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 pt-0 border-t border-white/5 space-y-4">
          
          {/* Inputs */}
          {prompt.inputs && prompt.inputs.length > 0 && (
            <div className="grid gap-3 bg-slate-950/50 p-4 rounded-xl border border-white/5">
              {prompt.inputs.map(input => (
                <div key={input.key}>
                  <label className="text-[10px] uppercase font-bold text-blue-400 tracking-wider mb-1 block">{input.label}</label>
                  <input 
                    type="text" 
                    placeholder={input.placeholder}
                    onChange={(e) => setInputs({...inputs, [input.key]: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Modifiers */}
          {prompt.modifiers && prompt.modifiers.length > 0 && (
            <div className="flex gap-2 items-center">
               <button 
                 onClick={rollDice} 
                 className="px-3 py-2 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20 hover:bg-amber-500 hover:text-white transition flex items-center gap-2"
               >
                 <i className="fas fa-dice"></i> Aléatoire
               </button>
               {modifier && (
                 <span className="text-xs text-amber-300 py-2 flex-1 truncate animate-pulse">
                   {modifier}
                 </span>
               )}
            </div>
          )}

          {/* Zone de Prompt */}
          <div className="relative">
            <pre className="bg-black/50 p-4 rounded-xl text-xs text-slate-300 font-mono whitespace-pre-wrap border border-white/10 max-h-64 overflow-y-auto custom-scrollbar">
              {finalPrompt}
            </pre>
            <button 
              onClick={handleCopy} 
              className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                copied ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white text-black hover:bg-blue-400 hover:text-white'
              }`}
            >
              <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i> 
              {copied ? 'Copié' : 'Copier'}
            </button>
          </div>

          {/* Boutons d'envoi direct vers IA */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-3 tracking-wider flex items-center gap-2">
              <i className="fas fa-rocket"></i>
              Ouvrir dans une IA :
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); openInAI('gemini'); }}
                className="py-2.5 px-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
              >
                <span className="text-base">✦</span> Gemini
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); openInAI('mistral'); }}
                className="py-2.5 px-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
              >
                <span className="text-base">🌪️</span> Mistral
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); openInAI('chatgpt'); }}
                className="py-2.5 px-3 bg-[#10a37f] hover:bg-[#0d8c6e] text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
              >
                <span className="text-base">💬</span> ChatGPT
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); openInAI('claude'); }}
                className="py-2.5 px-3 bg-gradient-to-r from-orange-400 to-amber-600 hover:from-orange-500 hover:to-amber-700 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
              >
                <span className="text-base">🧠</span> Claude
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-3 italic flex items-center gap-1">
              <i className="fas fa-info-circle"></i>
              Le prompt est copié automatiquement. Collez-le (Ctrl+V) dans l'IA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
