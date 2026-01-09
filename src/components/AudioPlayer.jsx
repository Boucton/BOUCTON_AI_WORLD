import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ text }) => {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSupported(true);
    }
  }, []);

  const handlePlay = () => {
    if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
      setSpeaking(true);
    } else {
      // Nettoyage du texte pour éviter de lire le markdown
      const cleanText = text.replace(/[#*`_\[\]]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'fr-FR';
      utterance.rate = 1.0;
      utterance.onend = () => {
        setSpeaking(false);
        setPaused(false);
      };
      window.speechSynthesis.cancel(); // Stop précédent
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setPaused(true);
    setSpeaking(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  if (!supported) return null;

  return (
    <div className="flex items-center gap-2 bg-slate-800/50 rounded-full p-1 border border-white/10 backdrop-blur-sm">
      {!speaking && !paused ? (
        <button onClick={handlePlay} className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-500 transition shadow-lg" title="Lire le module">
           <i className="fas fa-play text-xs pl-0.5"></i>
        </button>
      ) : (
        <>
            {paused ? (
                 <button onClick={handlePlay} className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white animate-pulse"><i className="fas fa-play text-xs pl-0.5"></i></button>
            ) : (
                 <button onClick={handlePause} className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-white"><i className="fas fa-pause text-xs"></i></button>
            )}
            <button onClick={handleStop} className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition"><i className="fas fa-stop text-xs"></i></button>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
