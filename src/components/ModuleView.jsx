import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import PromptCard from './PromptCard';

const ModuleView = ({ module, userData, setUserData }) => {
  const [activePrompt, setActivePrompt] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  // Gestion du scroll
  const handleScroll = (e) => {
    setShowScroll(e.currentTarget.scrollTop > 300);
  };

  const scrollToTop = () => {
    const container = document.querySelector('.custom-scrollbar');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!module) return <div className="p-10 text-slate-400 flex items-center justify-center h-full animate-pulse">Chargement des données...</div>;

  return (
    <div 
      className="h-full overflow-y-auto bg-slate-950 custom-scrollbar relative scroll-smooth"
      onScroll={handleScroll}
    >
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        
        {/* Fil d'Ariane */}
        <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-8 uppercase tracking-[0.2em] font-bold animate-fade">
            <span><i className="fas fa-home"></i> ACCUEIL</span>
            <i className="fas fa-chevron-right text-[8px] opacity-30"></i>
            <span className="text-blue-500">{module.title.toUpperCase()}</span>
        </div>

        {/* HEADER VISUEL (Pleine Largeur) */}
        <header className="mb-20 relative rounded-3xl overflow-hidden h-80 border border-white/10 group shadow-2xl animate-fade">
           <div className="absolute inset-0 bg-slate-900">
             <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cube-coat.png')]"></div>
           </div>
           
           <img
            src={module.img}
            className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
            alt={module.title}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${module.color || 'blue'}-500/10 border border-${module.color || 'blue'}-500/20 text-${module.color || 'blue'}-300 text-[10px] font-bold uppercase mb-4 backdrop-blur-md tracking-widest`}>
                <i className={`fas ${module.icon || 'fa-box'}`}></i> Module Actif
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight drop-shadow-xl">{module.title}</h1>
            <p className="text-lg text-slate-300 max-w-2xl drop-shadow-md font-light leading-relaxed border-l-2 border-white/20 pl-4">{module.description}</p>
          </div>
        </header>

        {/* CONTENU TEXTUEL (COLONNE CENTRALE OPTIMISÉE) */}
        {/* C'est ici qu'on contraint la largeur pour la lisibilité "Livre/Magazine" */}
        <div className="flex justify-center mb-24 animate-fade animation-delay-500">
             <div className="w-full max-w-3xl"> 
                <div className="markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {module.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>

        {/* Section Prompts (Pleine largeur à nouveau) */}
        <div className="border-t border-white/10 pt-16">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                    <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white text-xl">
                        <i className="fas fa-terminal"></i>
                    </span>
                    <span>Centre de Commandes</span>
                </h2>
            </div>
            
            {module.prompts && module.prompts.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 pb-20">
                {module.prompts.map((prompt) => (
                    <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    moduleId={module.id}
                    userData={userData}
                    setUserData={setUserData}
                    isActive={activePrompt === prompt.id}
                    setActivePrompt={setActivePrompt}
                    />
                ))}
                </div>
            ) : (
                <div className="p-12 border border-dashed border-white/10 rounded-3xl text-center text-slate-500 bg-slate-900/30 flex flex-col items-center">
                    <i className="fas fa-box-open text-5xl mb-4 opacity-30"></i>
                    <p className="text-lg">Aucun script disponible pour le moment.</p>
                </div>
            )}
        </div>
      </div>

      {/* Bouton Retour Haut */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-50 hover:scale-110 transition-all duration-300 z-50 cursor-pointer ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <i className="fas fa-arrow-up text-xl"></i>
      </button>
    </div>
  );
};

export default ModuleView;
