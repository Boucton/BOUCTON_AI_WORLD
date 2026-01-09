import React, { useState, useEffect } from 'react';

const FocusTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // focus | break

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Fin du timer
            setIsActive(false);
            const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
            audio.play();
            alert(mode === 'focus' ? "Pause bien méritée !" : "Retour au travail !");
            toggleMode();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, mode]);

  const toggleMode = () => {
    if (mode === 'focus') {
      setMode('break');
      setMinutes(5);
    } else {
      setMode('focus');
      setMinutes(25);
    }
    setSeconds(0);
    setIsActive(false);
  };

  const reset = () => {
    setIsActive(false);
    setMode('focus');
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="p-8 max-w-xl mx-auto animate-fade">
      <div className="glass-card rounded-3xl p-8 text-center border-t-4 border-blue-500 relative overflow-hidden">
        {/* Background Animation Subtile */}
        <div className={`absolute inset-0 opacity-10 transition-colors duration-1000 ${isActive ? (mode === 'focus' ? 'bg-blue-500' : 'bg-emerald-500') : 'bg-slate-900'}`}></div>
        
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest relative z-10">
            {mode === 'focus' ? 'Mode Deep Work' : 'Pause Café'}
        </h2>
        <p className="text-slate-400 text-sm mb-8 relative z-10">
            {mode === 'focus' ? 'Concentration maximale. Pas de notifications.' : 'Respirez. Oxygénez votre cerveau.'}
        </p>

        <div className="text-8xl font-mono font-bold text-white mb-8 tracking-tighter relative z-10">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="flex justify-center gap-4 relative z-10">
          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-xl shadow-xl transition hover:scale-110 ${isActive ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white'}`}
          >
            <i className={`fas ${isActive ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          
          <button 
            onClick={reset}
            className="w-16 h-16 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-xl shadow-xl hover:bg-slate-600 hover:text-white transition hover:scale-110"
          >
            <i className="fas fa-undo"></i>
          </button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
             <button onClick={toggleMode} className="text-xs text-slate-500 hover:text-white uppercase font-bold tracking-widest">
                 Passer au mode {mode === 'focus' ? 'Pause' : 'Focus'} (Force)
             </button>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
