import React, { useState, useMemo } from 'react';
import { THEMES } from '../styles/themes';

const PromptCard = ({ prompt, moduleId, userData, setUserData, isActive, setActivePrompt }) => {
  const [inputs, setInputs] = useState({});
  const [modifier, setModifier] = useState(null);
  const [spinning, setSpinning] = useState(false);
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

  return (
    <div className={`glass-card rounded-2xl overflow-hidden transition-all ${isActive ? 'ring-2 ring-blue-500' : ''}`}>
      {/* En-tête */}
      <div className="p-5 border-b border-white/10 bg-slate-900/50 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${theme.gradient}`}>
            <i className={`fas ${theme.icon} text-white`}></i>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{prompt.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{prompt.description}</p>
          </div>
        </div>
        <button
          onClick={rollDice}
          className={`w-8 h-8 rounded-lg flex items-center justify-center bg-slate-800 text-slate-400 hover:text-white transition-all ${spinning ? 'animate-spin' : ''}`}
          title="Contrainte aléatoire"
        >
          <i className="fas fa-dice-d20"></i>
        </button>
      </div>

      {/* Corps */}
      <div className="p-5">
        {modifier && (
          <div className="mb-4 p-2 bg-slate-800/50 rounded-lg flex items-center gap-2">
            <i className="fas fa-dice-d20 text-yellow-400"></i>
            <span className="text-xs text-slate-200">Contrainte: {modifier}</span>
          </div>
        )}

        {/* Champs d'entrée */}
        <div className="space-y-3 mb-4">
          {prompt.inputs.map((input) => (
            <div key={input.key}>
              <label className="text-xs text-slate-400 font-medium">{input.label}</label>
              <input
                type="text"
                placeholder={input.placeholder}
                onChange={(e) => handleInputChange(input.key, e.target.value)}
                className="w-full mt-1 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}
        </div>

        {/* Affichage du prompt final */}
        <div className="relative">
          <pre className="bg-slate-900 rounded-lg p-4 text-xs text-slate-300 whitespace-pre-wrap border border-white/10">
            {finalPrompt}
          </pre>
          <button
            onClick={() => {
              navigator.clipboard.writeText(finalPrompt);
              alert('Prompt copié dans le presse-papiers !');
            }}
            className="absolute top-2 right-2 px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs hover:bg-white hover:text-slate-900 transition"
          >
            <i className="fas fa-copy mr-1"></i> Copier
          </button>
        </div>

        {/* Bouton pour lancer la simulation */}
        {moduleId === 'dr_gourmand' && (
          <button
            onClick={() => setActivePrompt(prompt.id)}
            className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <i className="fas fa-play"></i> Lancer la Simulation
          </button>
        )}
      </div>
    </div>
  );
};

export default PromptCard;
