import React, { useState, useEffect } from 'react';

const NotesPanel = ({ isOpen, onClose }) => {
  const [note, setNote] = useState(() => localStorage.getItem('boucton_notes') || '');
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('boucton_notes', note);
      if (note) setLastSaved(new Date());
    }, 1000);
    return () => clearTimeout(handler);
  }, [note]);

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-slate-900 border-l border-white/10 shadow-2xl transform transition-transform duration-300 z-[60] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      
      {/* Header */}
      <div className="p-4 border-b border-white/10 flex justify-between items-center bg-slate-950">
        <h3 className="font-bold text-white flex items-center gap-2">
          <i className="fas fa-edit text-blue-500"></i> Carnet de Bord
        </h3>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition">
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Zone de texte */}
      <div className="flex-1 relative group">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-full bg-slate-900 p-6 text-slate-300 text-sm leading-relaxed resize-none focus:outline-none custom-scrollbar font-mono"
          placeholder="Notez ici vos idées, prompts modifiés, ou diagnostics..."
        />
        <div className="absolute bottom-4 right-4 text-[10px] text-slate-600 font-mono transition-opacity opacity-0 group-hover:opacity-100">
          {lastSaved ? `Sauvegardé à ${lastSaved.toLocaleTimeString()}` : 'Prêt'}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/10 bg-slate-950 text-xs text-slate-500 text-center">
        Ces notes sont stockées localement sur votre appareil.
      </div>
    </div>
  );
};

export default NotesPanel;
