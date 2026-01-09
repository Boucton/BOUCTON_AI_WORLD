import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 
import PromptCard from './PromptCard';

const ModuleView = ({ module, userData, setUserData }) => {
  const [activePrompt, setActivePrompt] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  // Gestion du scroll
  const handleScroll = (e) => {
    if (e.currentTarget.scrollTop > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    const container = document.querySelector('.custom-scrollbar');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!module) return <div className="p-10 text-slate-400 flex items-center justify-center h-full">Chargement du module...</div>;

  return (
    <div 
      className="h-full overflow-y-auto bg-slate-950 custom-scrollbar relative"
      onScroll={handleScroll}
    >
      <div className="max-w-5xl mx-auto p-8 md:p-12">
        
        {/* Fil d'Ariane */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 uppercase tracking-widest font-bold animate-fade">
            <span><i className="fas fa-home"></i> Accueil</span>
            <i className="fas fa-chevron-right text-[10px] opacity-50"></i>
            <span>Module</span>
            <i className="fas fa-chevron-right text-[10px] opacity-50"></i>
            <span className="text-blue-400">{module.title}</span>
        </div>

        {/* Header Module */}
        <header className="mb-16 relative rounded-3xl overflow-hidden h-72 border border-white/10 group shadow-2xl animate-fade">
           <div className="absolute inset-0 bg-slate-900">
             <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cube-coat.png')]"></div>
           </div>
           
           {/* Image avec gestion d'erreur */}
           <img
            src={module.img}
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
            alt={module.title}
            onError={(e) => {
                e.target.onerror = null; 
                e.target.style.display = 'none'; // Cache l'image si elle plante
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-${module.color || 'blue'}-500/20 border border-${module.color || 'blue'}-500/30 text-${module.color || 'blue'}-300 text-xs font-bold uppercase mb-4 backdrop-blur-md`}>
                <i className={`fas ${module.icon || 'fa-box'}`}></i> Module
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight drop-shadow-lg">{module.title}</h1>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl drop-shadow-md font-medium leading-relaxed">{module.description}</p>
          </div>
        </header>

        {/* CONTENU TEXTUEL (Markdown) - Utilise maintenant la classe CSS globale */}
        <div className="bg-slate-900/40 p-8 md:p-10 rounded-2xl border border-white/5 mb-16 backdrop-blur-sm shadow-xl">
            <div className="markdown-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {module.content}
                </ReactMarkdown>
            </div>
        </div>

        {/* Section Prompts */}
        <div className="border-t border-white/10 pt-10">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <i className="fas fa-terminal text-white text-lg"></i>
                </div>
                Prompts Disponibles
            </h2>
            
            {module.prompts && module.prompts.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
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
                <div className="p-8 border border-dashed border-white/10 rounded-xl text-center text-slate-500 bg-slate-900/30">
                    <i className="fas fa-box-open text-4xl mb-3 opacity-50"></i>
                    <p>Aucun prompt disponible pour ce module pour l'instant.</p>
                </div>
            )}
        </div>
      </div>

      {/* Bouton Retour Haut */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all duration-300 z-50 cursor-pointer ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default ModuleView;
