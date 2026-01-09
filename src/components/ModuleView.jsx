import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
// Si l'installation de remark-gfm échoue, on commente la ligne suivante et on retire remarkPlugins plus bas
import remarkGfm from 'remark-gfm'; 
import PromptCard from './PromptCard';

const ModuleView = ({ module, userData, setUserData }) => {
  const [activePrompt, setActivePrompt] = useState(null);
  const [showScroll, setShowScroll] = useState(false);

  // Gestion du scroll pour afficher le bouton "Haut de page"
  const handleScroll = (e) => {
    if (e.currentTarget.scrollTop > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    const container = document.querySelector('.custom-scrollbar-container');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!module) return <div className="p-10 text-slate-400 flex items-center justify-center h-full">Chargement...</div>;

  return (
    <div 
      className="h-full overflow-y-auto bg-slate-950 p-8 md:p-12 custom-scrollbar-container"
      onScroll={handleScroll}
    >
      <div className="max-w-5xl mx-auto">
        
        {/* Fil d'Ariane */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 uppercase tracking-widest font-bold">
            <span><i className="fas fa-home"></i> Accueil</span>
            <i className="fas fa-chevron-right text-[10px]"></i>
            <span>Module</span>
            <i className="fas fa-chevron-right text-[10px]"></i>
            <span className="text-blue-400">{module.title}</span>
        </div>

        {/* Header Module */}
        <header className="mb-12 relative rounded-3xl overflow-hidden h-64 border border-white/10 group shadow-2xl">
           <div className="absolute inset-0 bg-slate-900">
             <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cube-coat.png')]"></div>
           </div>
           <img
            src={module.img}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            alt={module.title}
            onError={(e) => e.target.style.display = 'none'}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight drop-shadow-lg">{module.title}</h1>
            <p className="text-lg text-slate-200 max-w-xl drop-shadow-md font-medium">{module.description}</p>
          </div>
        </header>

        {/* CONTENU TEXTUEL (Markdown) */}
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 mb-16">
            <style>{`
                .prose h1 { @apply text-3xl font-bold text-blue-400 mb-6 mt-8 border-b border-white/10 pb-2; }
                .prose h2 { @apply text-2xl font-semibold text-white mb-4 mt-8; }
                .prose h3 { @apply text-xl font-medium text-blue-200 mb-3 mt-6; }
                .prose p { @apply text-slate-300 leading-relaxed mb-4 text-lg; }
                .prose ul { @apply list-disc list-outside ml-6 text-slate-300 mb-4; }
                .prose ol { @apply list-decimal list-outside ml-6 text-slate-300 mb-4; }
                .prose li { @apply mb-2; }
                .prose strong { @apply text-white font-bold; }
                .prose blockquote { @apply border-l-4 border-blue-500 pl-4 italic text-slate-400 my-6 bg-slate-800/50 py-2 rounded-r; }
                .prose code { @apply bg-slate-800 text-blue-300 px-1 py-0.5 rounded text-sm font-mono; }
                .prose pre { @apply bg-slate-950 p-4 rounded-lg overflow-x-auto border border-white/10 mb-6; }
                .prose pre code { @apply bg-transparent text-slate-300 p-0; }
                .prose table { @apply w-full text-left border-collapse my-6; }
                .prose th { @apply bg-slate-800 text-white font-semibold p-3 border border-slate-700; }
                .prose td { @apply p-3 border border-slate-700 text-slate-300; }
                .prose tr:nth-child(even) { @apply bg-slate-800/30; }
                .prose a { color: #60a5fa; text-decoration: none; border-bottom: 1px dotted #60a5fa; }
            `}</style>

            <div className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {module.content}
                </ReactMarkdown>
            </div>
        </div>

        {/* Section Prompts */}
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i className="fas fa-terminal text-blue-500"></i>
            Prompts Disponibles
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-20">
          {module.prompts && module.prompts.map((prompt) => (
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
      </div>

      {/* Bouton Retour Haut */}
      {showScroll && (
        <button 
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-500 transition animate-fade z-50 cursor-pointer"
        >
            <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

export default ModuleView;
