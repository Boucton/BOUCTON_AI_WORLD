import React, { useState } from 'react';

const Playground = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Bienvenue dans le Laboratoire. Collez un prompt pour analyser sa structure.' }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', content: "Analyse META-IA : Votre prompt contient les balises nécessaires. Pensez à préciser les restrictions pour éviter les hallucinations." }]);
    }, 800);
    setInput('');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col animate-fade">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-black text-white italic">LABORATOIRE_PROMPT</h2>
        <p className="text-slate-500 text-sm">Testez vos itérations avant déploiement clinique.</p>
      </div>
      
      <div className="flex-1 bg-slate-900/50 border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 border border-white/5'}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-950 border-t border-white/10 flex gap-2">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Entrez votre prompt expérimental..."
            className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-blue-500"
          />
          <button onClick={handleSend} className="bg-blue-600 hover:bg-blue-500 p-3 rounded-xl transition shadow-lg">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playground;
