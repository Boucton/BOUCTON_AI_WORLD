import React from 'react';

const VitalMonitor = () => {
  return (
    <div className="mb-8 bg-black border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-[0_0_20px_rgba(16,185,129,0.1)] relative overflow-hidden animate-fade">
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
      
      {/* ECG */}
      <div className="flex-1 h-16 relative overflow-hidden flex items-center gap-4">
        <div className="text-emerald-500 font-mono text-xs font-bold uppercase tracking-widest absolute top-0 left-0">ECG Lead II</div>
        <div className="w-full h-full flex items-center">
             {/* Animation CSS pure d'un tracé ECG (simplifié par un pulse pour l'instant) */}
             <div className="w-full h-0.5 bg-slate-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-20 h-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-[blob_2s_infinite]"></div>
             </div>
             <svg viewBox="0 0 500 100" className="w-full h-16 stroke-emerald-500 fill-none stroke-2 absolute animate-pulse">
                <polyline points="0,50 100,50 110,40 120,60 130,50 140,50 150,20 160,80 170,50 190,50 500,50" />
             </svg>
        </div>
      </div>

      {/* Chiffres */}
      <div className="flex gap-8 border-l border-slate-800 pl-8">
        <div className="text-center">
            <div className="text-emerald-500 text-3xl font-black font-mono leading-none animate-pulse">72</div>
            <div className="text-emerald-800 text-[10px] font-bold uppercase">BPM</div>
        </div>
        <div className="text-center">
            <div className="text-blue-500 text-3xl font-black font-mono leading-none">98</div>
            <div className="text-blue-800 text-[10px] font-bold uppercase">% SpO2</div>
        </div>
        <div className="text-center">
            <div className="text-amber-500 text-3xl font-black font-mono leading-none">12/8</div>
            <div className="text-amber-800 text-[10px] font-bold uppercase">TA</div>
        </div>
      </div>
    </div>
  );
};

export default VitalMonitor;
