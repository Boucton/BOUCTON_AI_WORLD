import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import PromptCard from './PromptCard';

// Composants personnalisés pour le rendu Markdown
const MarkdownComponents = {
  // Titres avec design "Tech"
  h1: ({node, ...props}) => <h1 className="hidden" {...props} />, // On cache le H1 (géré par le header)
  h2: ({node, ...props}) => (
    <div className="flex items-center mt-16 mb-6 pb-2 border-b border-white/10">
      <div className="w-1.5 h-6 bg-blue-500 rounded-full mr-3 shadow-[0_0_10px_#3b82f6]"></div>
      <h2 className="text-2xl font-bold text-white tracking-tight" {...props} />
    </div>
  ),
  h3: ({node, ...props}) => (
    <h3 className="text-xl font-semibold text-blue-200 mt-10 mb-4 flex items-center" {...props}>
      <span className="text-blue-500/50 mr-2">#</span>
      {props.children}
    </h3>
  ),
  // Paragraphes aérés
  p: ({node, ...props}) => <p className="text-slate-300 leading-8 mb-6 text-lg font-light" {...props} />,
  // Listes stylisées
  ul: ({node, ...props}) => <ul className="space-y-3 my-6 pl-4" {...props} />,
  li: ({node, ...props}) => (
    <li className="relative pl-6 text-slate-300 leading-7">
      <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
      {props.children}
    </li>
  ),
  // Citations transformées en "Callouts"
  blockquote: ({node, ...props}) => (
    <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10 text-6xl pointer-events-none">❝</div>
      <div className="text-blue-100 italic relative z-10" {...props} />
    </div>
  ),
  // Tableaux RESPONSIVE (Crucial)
  table: ({node, ...props}) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-white/10 shadow-2xl bg-slate-900/50">
      <table className="w-full text-left border-collapse" {...props} />
    </div>
  ),
  thead: ({node, ...props}) => <thead className="bg-slate-800 text-blue-300 uppercase text-xs font-bold tracking-wider" {...props} />,
  th: ({node, ...props}) => <th className="p-4 border-b border-white/10" {...props} />,
  td: ({node, ...props}) => <td className="p-4 border-b border-white/5 text-slate-400 whitespace-nowrap md:whitespace-normal" {...props} />,
  // Code et Liens
  code: ({node, inline, ...props}) => 
    inline 
      ? <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded text-sm font-mono border border-white/10" {...props} />
      : <pre className="bg-[#0f172a] p-4 rounded-xl overflow-x-auto border border-white/10 my-6 shadow-inner text-sm text-slate-300" {...props} />,
  a: ({node, ...props}) => <a className="text-blue-400 hover:text-white underline underline-offset-4 decoration-blue-500/30 hover:decoration-white transition-all" {...props} />
};

const ModuleView = ({ module, userData, setUserData }) => {
  const [activePrompt, setActivePrompt] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  const handleScroll = (e) => setShowScroll(e.currentTarget.scrollTop > 300);
  const scrollToTop = () => document.querySelector('.custom-scrollbar')?.scrollTo({ top: 0, behavior: 'smooth' });

  if (!module) return <div className="p-20 text-center text-slate-500 animate-pulse">Chargement du module...</div>;

  return (
    <div className="h-full overflow-y-auto bg-slate-950 custom-scrollbar scroll-smooth" onScroll={handleScroll}>
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        
        {/* Fil d'Ariane & Header */}
        <div className="mb-12 animate-fade">
           <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-4">
              <i className="fas fa-circle text-[4px] text-blue-500"></i>
              <span>{module.title}</span>
           </div>
           
           <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 border border-white/10 shadow-2xl group">
             <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10"></div>
             <img src={module.img} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Cover" />
             <div className="absolute bottom-0 left-0 p-8 md:p-12 z-20 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{module.title}</h1>
                <p className="text-lg text-slate-300 font-light leading-relaxed border-l-2 border-blue-500 pl-4 bg-slate-950/50 backdrop-blur-sm rounded-r-lg py-2 pr-4">
                  {module.description}
                </p>
             </div>
           </div>
        </div>

        {/* CONTENU TEXTUEL RE-DESIGNÉ */}
        <div className="flex flex-col lg:flex-row gap-12 animate-fade animation-delay-500">
             {/* Colonne de texte principale */}
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
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
              {module.prompts?.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} moduleId={module.id} 
                    userData={userData} setUserData={setUserData} 
                    isActive={activePrompt === prompt.id} setActivePrompt={setActivePrompt} 
                  />
              ))}
            </div>
        </div>
      </div>

      {/* Bouton Retour Haut */}
      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all z-50 ${showScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default ModuleView;
