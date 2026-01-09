import React, { useState, useMemo } from 'react';
import { THEMES } from '../styles/themes';

const PromptCard = ({ prompt, moduleId, userData, setUserData, isActive, setActivePrompt }) => {
  const [inputs, setInputs] = useState({});
  const [modifier, setModifier] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [copied, setCopied] = useState(false); // <--- NOUVEAU
  const theme = THEMES[prompt.color || 'rose'];

  const rollDice = () => {
    setSpinning(true);
    setTimeout(() => {
      setModifier(prompt.modifiers[Math.floor(Math.random() * prompt.modifiers.length)]);
      setSpinning(false);
    }, 500);
  };

  const finalPrompt = useMemo(() => {
    let template = prompt.template.system;
    Object.entries(inputs).forEach(([key, value]) => {
      template = template.replace(`{{${key}}}`, value || `[${key}]`);
    });
    template = template.replace('{{modifier}}', modifier || '[Aucune]');
    return template;
  }, [inputs, modifier, prompt.template.system]);

  const handleInputChange = (key, value) => {
    setInputs({ ...inputs, [key]: value });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset après 2 secondes
  };

  return (
    <div className={`glass-card rounded-2xl overflow-hidden ${isActive ? 'ring-2 ring-blue-500' : ''}`}>
      {/* En-tête */}
      <div className="p-5 border-b border-white/5 bg-white/5 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${theme.gradient} shadow-lg`}>
            <i className={`fas ${theme.icon} text-white`}></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">{prompt.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{prompt.description}</p>
          </div>
        </div>
        <button
          onClick={rollDice}
          className={`w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white transition-all ${spinning ? 'animate-spin text-blue-400' : ''}`}
          title="Ajouter une contrainte aléatoire"
        >
          <i className="fas fa-dice-d20"></i>
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Contrainte Aléatoire */}
        {modifier && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center gap-3 animate-fade">
            <i className="fas fa-bolt text-amber-500"></i>
            <span className="text-sm text-amber-200 font-medium">{modifier}</span>
          </div>
        )}

        {/* Champs */}
        <div className="grid gap-3">
          {prompt.inputs.map((input) => (
            <div key={input.key}>
              <label className="block text-xs text-slate-500 font-bold uppercase mb-1 ml-1">{input.label}</label>
              <input
                type="text"
                placeholder={input.placeholder}
                onChange={(e) => handleInputChange(input.key, e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
            </div>
          ))}
        </div>

        {/* Zone de code et Copie */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>
          <pre className="relative bg-slate-950 rounded-xl p-4 text-xs text-slate-300 whitespace-pre-wrap border border-white/10 font-mono shadow-inner max-h-60 overflow-y-auto custom-scrollbar">
            {finalPrompt}
          </pre>
          <button
            onClick={handleCopy}
            className={`absolute top-2 right-2 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              copied 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-800 text-slate-300 hover:bg-white hover:text-slate-900'
            }`}
          >
            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'}`}></i>
            {copied ? 'Copié !' : 'Copier'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
