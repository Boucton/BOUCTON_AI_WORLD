import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import PromptCard from './PromptCard';
import VitalMonitor from './VitalMonitor';

const ModuleView = ({ module, allModules, userData, setUserData, setActiveModule }) => {
  const [activePrompt, setActivePrompt] = useState(null);
  const [showScroll, setShowScroll] = useState(false);
  
  // --- NOUVEAU : Contrôle de la taille de police (Lecteur Zen) ---
  const [fontSize, setFontSize] = useState(1); // 1 = normal, 1.1 = grand, 1.2 = très grand

  // Configuration des composants Markdown (Réactive à fontSize)
  const MarkdownComponents = {
    h1: ({node, ...props}) => <h1 className="hidden" {...props} />,
    h2: ({node, ...props}) => (
        <div className="flex items-center mt-16 mb-6 pb-2 border-b border-white/10">
        <div className="w-1.5 h-6 bg-current rounded-full mr-3 opacity-80"></div>
        <h2 className="text-2xl font-bold text-white tracking-tight" style={{ fontSize: `${1.5 * fontSize}rem` }} {...props} />
        </div>
    ),
    h3: ({node, ...props}) => (
        <h3 className="text-xl font-semibold text-blue-200 mt-10 mb-4 flex items-center" style={{ fontSize: `${1.25 * fontSize}rem` }} {...props}>
        <span className="opacity-50 mr-2">#</span>{props.children}
        </h3>
    ),
    p: ({node, ...props}) => <p className="text-slate-300 leading-8 mb-6 font-light" style={{ fontSize: `${1.1 * fontSize}rem` }} {...props} />,
    ul: ({node, ...props}) => <ul className="space-y-3 my-6 pl-4" {...props} />,
    li: ({node, ...props}) => (
        <li className="relative pl-6 text-slate-300 leading-7" style={{ fontSize: `${1.1 * fontSize}rem` }}>
        <span className="absolute left-0 top-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>{props.children}
        </li>
    ),
    blockquote: ({node, ...props}) => (
        <div className="bg-white/5 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl relative overflow-hidden" style={{ fontSize: `${1.1 * fontSize}rem` }}>
        <div className="absolute top-0 right-0 opacity-10 text-6xl pointer-events-none">❝</div>
        <div className="text-blue-100 italic relative z-10" {...props} />
        </div>
    ),
    table: ({node, ...props}) => (
        <div className="overflow-x-auto my-8 rounded-xl border border-white/10 shadow-2xl bg-slate-900/50">
        <table className="w-full text-left border-collapse" {...props} />
        </div>
    ),
    thead: ({node, ...props}) => <thead className="bg-slate-800 text-blue-300 uppercase text-xs font-bold tracking-wider" {...props} />,
    th: ({node, ...props}) => <th className="p-4 border-b border-white/10" {...props} />,
    td: ({node, ...props}) => <td className="p-4 border-b border-white/5 text-slate-400 whitespace-nowrap md:whitespace-normal" {...props} />,
    code: ({node, inline, ...props}) => inline 
        ? <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded text-sm font-mono border border-white/10" {...props} />
        : <pre className="bg-[#0f172a] p-4 rounded-xl overflow-x-auto border border-white/10 my-6 shadow-inner text-sm text-slate-300" {...props} />,
    a: ({node, ...props}) => <a className="text-blue-400 hover:text-white underline underline-offset-4 decoration-blue-500/30 hover:decoration-white transition-all" {...props} />
  };

  const handleScroll = (e) => setShowScroll(e.currentTarget.scrollTop > 300);
  const scrollToTop = () => document.querySelector('.custom-scrollbar')?.scrollTo({ top: 0, behavior: 'smooth' });

  const copyForPodcast = () => {
    const script = `CONTEXTE: Ceci est un contenu éducatif médical pour le projet BOUCTON_AI_WORLD.\nCONTENU À SYNTHÉTISER EN PODCAST:\n\n${module.content}`;
    navigator.clipboard.writeText(script);
    // Ici on déclenche le Toast global via un event (ou juste alert pour l'instant)
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Script copié pour Podcast !' }));
  };

  const relatedModules = allModules?.filter(m => m.id !== module.id && m.tags?.some(t => module.tags?.includes(t))).slice(0, 3) || [];

  if (!module) return <div className="p-20 text-center text-slate-500 animate-pulse">Chargement...</div>;

  return (
    <div className="h-full overflow-y-auto bg-slate-950 custom-scrollbar scroll-smooth" onScroll={handleScroll}>
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        
        {/* Ariane + Contrôles Zen */}
        <div className="mb-8 flex justify-between items-end animate-fade">
           <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              <i className="fas fa-circle text-[4px] text-blue-500"></i>
              <span>{module.title}</span>
           </div>
           
           <div className="flex gap-3">
               {/* Contrôle Taille Police */}
               <div className="flex items-center bg-slate-800 rounded-full border border-white/10 p-1">
                   <button onClick={() => setFontSize(1)} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition ${fontSize === 1 ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>A</button>
                   <button onClick={() => setFontSize(1.1)} className={`w-6 h-6 rounded-full flex items-center justify-center text-sm transition ${fontSize === 1.1 ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>A</button>
                   <button onClick={() => setFontSize(1.25)} className={`w-6 h-6 rounded-full flex items-center justify-center text-base transition ${fontSize === 1.25 ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>A</button>
               </div>
               
               <button onClick={copyForPodcast} className="text-[10px] flex items-center gap-2 bg-slate-800 hover:bg-white hover:text-black px-3 py-1.5 rounded-full transition-colors border border-white/10">
                  <i className="fas fa-podcast"></i> NotebookLM
               </button>
           </div>
        </div>
           
        {/* Header Image */}
        <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 border border-white/10 shadow-2xl group mb-12 animate-fade">
             <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10"></div>
             <img src={module.img} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Cover" />
             <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{module.title}</h1>
                <p className="text-lg text-slate-300 font-light leading-relaxed border-l-2 border-blue-500 pl-4 bg-slate-950/50 backdrop-blur-sm rounded-r-lg py-2 pr-4">
                  {module.description}
                </p>
             </div>
        </div>

        {module.id === 'dr_gourmand' && <VitalMonitor />}

        {/* CONTENU TEXTUEL */}
        <div className="flex flex-col lg:flex-row gap-12 animate-fade animation-delay-500">
             <div className="flex-1 min-w-0">
                <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                    {module.content}
                </ReactMarkdown>
            </div>
        </div>

        {/* Section Prompts */}
        <div className="mt-24 pt-12 border-t border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-sm"><i className="fas fa-terminal"></i></span>
                Prompts Disponibles
            </h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {module.prompts?.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} moduleId={module.id} 
                    userData={userData} setUserData={setUserData} 
                    isActive={activePrompt === prompt.id} setActivePrompt={setActivePrompt} 
                  />
              ))}
            </div>
        </div>

        {/* Synapses */}
        {relatedModules.length > 0 && (
            <div className="mt-20 pt-10 border-t border-white/5">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Connexions Neuronales</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {relatedModules.map(rm => (
                        <button key={rm.id} onClick={() => setActiveModule(rm.id)} className="text-left p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-blue-500/50 hover:bg-slate-800 transition group">
                            <div className="text-xs text-blue-500 font-bold mb-1">{rm.title}</div>
                            <div className="text-xs text-slate-400 line-clamp-2 group-hover:text-slate-300">{rm.description}</div>
                        </button>
                    ))}
                </div>
            </div>
        )}
      </div>

      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-50 ${showScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default ModuleView;
