import React, { useState, useMemo, useEffect } from 'react';
import { THEMES } from '../styles/themes';

const PromptCard = ({ prompt, moduleId, isActive, setActivePrompt }) => {
  const [inputs, setInputs] = useState({});
  const [modifier, setModifier] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = THEMES[prompt.color || 'rose'];

  // Chargement état favori
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
    const randomMod = prompt.modifiers[Math.floor(Math.random() * prompt.modifiers.length)];
    setModifier(randomMod);
  };

  const finalPrompt = useMemo(() => {
    let t = prompt.template.system;
    Object.entries(inputs).forEach(([k, v]) => t = t.replace(`{{${k}}}`, v || `[${k}]`));
    return t.replace('{{modifier}}', modifier || '[Aucune]');
  }, [inputs, modifier, prompt]);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-5 pt-0 border-t border-white/5 space-y-4">
          
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

          <div className="flex gap-2">
             <button onClick={rollDice} className="px-3 py-2 rounded-lg bg-amber-500/10 text-amber-500 text-xs font-bold border border-amber-500/20 hover:bg-amber-500 hover:text-white transition flex items-center gap-2">
               <i className="fas fa-dice"></i> Aléatoire
             </button>
             {modifier && <span className="text-xs text-amber-300 py-2 flex-1 truncate text-right animate-pulse">{modifier}</span>}
          </div>

          <div className="relative">
            <pre className="bg-black/50 p-4 rounded-xl text-xs text-slate-300 font-mono whitespace-pre-wrap border border-white/10">
              {finalPrompt}
            </pre>
            <button onClick={handleCopy} className={`absolute top-2 right-2 px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-blue-400 hover:text-white'}`}>
              <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i> {copied ? 'Copié' : 'Copier'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
