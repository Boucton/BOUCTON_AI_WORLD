import React, { useState } from 'react';
import workflows from '../../data/workflows.json';

const WorkflowEngine = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // Idéalement déclencher un toast ici
    alert("Prompt copié !");
  };

  if (!selectedWorkflow) {
    return (
      <div className="p-8 max-w-6xl mx-auto animate-fade">
        <h1 className="text-4xl font-black text-white mb-8">Moteur de Workflow Méta-IA</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((wf) => (
            <button
              key={wf.id}
              onClick={() => setSelectedWorkflow(wf)}
              className="text-left p-6 rounded-2xl bg-slate-900 border border-white/10 hover:border-blue-500 hover:bg-slate-800 transition group shadow-xl"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                <i className={`fas ${wf.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{wf.title}</h3>
              <p className="text-sm text-slate-400">{wf.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const step = selectedWorkflow.steps[currentStep];
  const progress = ((currentStep + 1) / selectedWorkflow.steps.length) * 100;

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade min-h-screen flex flex-col">
      <button onClick={() => { setSelectedWorkflow(null); setCurrentStep(0); }} className="text-slate-500 hover:text-white mb-6 flex items-center gap-2">
        <i className="fas fa-arrow-left"></i> Retour aux workflows
      </button>

      {/* Header Workflow */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">{selectedWorkflow.title}</h2>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="text-right text-xs text-blue-400 mt-2 font-mono">ÉTAPE {currentStep + 1} / {selectedWorkflow.steps.length}</div>
      </div>

      {/* Carte Étape Active */}
      <div className="glass-card p-8 rounded-3xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.1)] flex-1 flex flex-col">
        
        <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold uppercase tracking-widest">
                {step.tool}
            </span>
            <span className="text-slate-400 text-sm font-bold uppercase">
                Action : {step.action}
            </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">Instructions :</h3>
        <p className="text-slate-300 mb-8 text-lg">{step.instruction}</p>

        <div className="bg-slate-950 p-6 rounded-xl border border-white/10 relative group mb-8">
            <div className="absolute top-0 right-0 bg-slate-800 text-slate-500 text-[10px] px-2 py-1 rounded-bl-lg">PROMPT OPTIMISÉ</div>
            <pre className="text-blue-300 font-mono text-sm whitespace-pre-wrap">{step.prompt}</pre>
            <button 
                onClick={() => handleCopy(step.prompt)}
                className="absolute bottom-4 right-4 bg-white text-slate-900 px-4 py-2 rounded-lg font-bold hover:bg-blue-50 shadow-lg flex items-center gap-2 transition-transform active:scale-95"
            >
                <i className="fas fa-copy"></i> Copier
            </button>
        </div>

        <div className="mt-auto flex justify-between pt-8 border-t border-white/5">
            <button 
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className={`px-6 py-3 rounded-xl font-bold border ${currentStep === 0 ? 'border-transparent text-slate-700 cursor-not-allowed' : 'border-white/10 text-white hover:bg-white/5'}`}
            >
                Précédent
            </button>
            
            {currentStep < selectedWorkflow.steps.length - 1 ? (
                <button 
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/50 flex items-center gap-2"
                >
                    Étape Suivante <i className="fas fa-arrow-right"></i>
                </button>
            ) : (
                <button 
                    onClick={() => { alert("Workflow Terminé !"); setSelectedWorkflow(null); setCurrentStep(0); }}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/50 flex items-center gap-2"
                >
                    <i className="fas fa-check"></i> Terminer
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowEngine;
