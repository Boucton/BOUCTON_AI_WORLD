import React, { useState, useEffect, useRef } from 'react';

const NotesPanel = ({ isOpen, onClose }) => {
  const [note, setNote] = useState(() => localStorage.getItem('boucton_notes') || '');
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem('boucton_notes', note);
      if (note) setLastSaved(new Date());
    }, 1000);
    return () => clearTimeout(handler);
  }, [note]);

  useEffect(() => {
    // Compter les mots
    const words = note.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
  }, [note]);

  useEffect(() => {
    // Auto-focus quand ouvert
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const clearNotes = () => {
    if (confirm('Êtes-vous sûr de vouloir effacer toutes vos notes ?')) {
      setNote('');
      localStorage.removeItem('boucton_notes');
      window.dispatchEvent(new CustomEvent('show-toast', { detail: '🗑️ Notes effacées' }));
    }
  };

  const downloadNotes = () => {
    const blob = new Blob([note], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boucton-notes-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: '💾 Notes téléchargées' }));
  };

  return (
    <div className={`fixed inset-y-0 right-0 w-96 bg-slate-900 border-l border-white/10 shadow-2xl transform transition-transform duration-300 z-[60] flex flex-col ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    }`}>
      
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-slate-950">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-white flex items-center gap-2">
            <i className="fas fa-note-sticky text-blue-500"></i> 
            Carnet de Bord
          </h3>
          <button 
            onClick={onClose} 
            className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span>{wordCount} mot{wordCount > 1 ? 's' : ''}</span>
          <span>{note.length} caractère{note.length > 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Zone de texte */}
      <div className="flex-1 relative group">
        <textarea
          ref={textareaRef}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-full bg-slate-900 p-6 text-slate-300 text-sm leading-relaxed resize-none focus:outline-none custom-scrollbar font-mono"
          placeholder="✏️ Notez vos idées, prompts modifiés, diagnostics...

Astuce : Ce carnet est sauvegardé automatiquement localement sur votre appareil."
          style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: '#334155 transparent'
          }}
        />
        
        {/* Indicateur de sauvegarde */}
        {lastSaved && (
          <div className="absolute bottom-4 right-4 text-[10px] text-slate-600 font-mono transition-opacity opacity-0 group-hover:opacity-100 bg-slate-950/80 px-2 py-1 rounded">
            💾 {lastSaved.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-white/10 bg-slate-950 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={downloadNotes}
            disabled={!note}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
          >
            <i className="fas fa-download"></i>
            Télécharger
          </button>
          <button
            onClick={clearNotes}
            disabled={!note}
            className="px-3 py-2 bg-red-600/20 hover:bg-red-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-red-400 hover:text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
          >
            <i className="fas fa-trash"></i>
            Effacer
          </button>
        </div>
        
        <div className="text-xs text-slate-500 text-center pt-2 border-t border-white/5">
          <i className="fas fa-shield-halved mr-1"></i>
          Stockage local uniquement (aucun cloud)
        </div>
      </div>
    </div>
  );
};

export default NotesPanel;
