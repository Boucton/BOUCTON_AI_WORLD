import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PromptCard from './PromptCard';

const ModuleView = ({ module, userData, setUserData }) => {
  const [activePrompt, setActivePrompt] = useState(null);

  if (!module) return <div className="p-10 text-slate-400 flex items-center justify-center h-full">Chargement...</div>;

  return (
    <div className="h-full overflow-y-auto bg-slate-950 p-8 md:p-12 custom-scrollbar">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Module */}
        <header className="mb-12 relative rounded-3xl overflow-hidden h-64 border border-white/10 group">
          <div className="absolute inset-0 bg-slate-900">
             {/* Fallback si l'image ne charge pas */}
             <div className="w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cube-coat.png')]"></div>
          </div>
          <img
            src={module.img}
            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            alt={module.title}
            onError={(e) => e.target.style.display = 'none'} // Cache l'image si erreur
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">{module.title}</h1>
            <p className="text-lg text-slate-300 max-w-xl">{module.description}</p>
          </div>
        </header>

        {/* Contenu (Markdown) - Styled manually via Tailwind classes in components isn't easy, using 'prose' logic roughly */}
        <div className="prose prose-invert prose-lg max-w-none mb-16 text-slate-300">
           {/* On injecte des styles spécifiques pour le markdown */}
           <style>{`
             .markdown h1 { font-size: 2.25rem; font-weight: 800; color: white; margin-bottom: 1.5rem; }
             .markdown h2 { font-size: 1.8rem; font-weight: 700; color: #e2e8f0; margin-top: 2.5rem; margin-bottom: 1rem; border-bottom: 1px solid #334155; padding-bottom: 0.5rem; }
             .markdown h3 { font-size: 1.4rem; font-weight: 600; color: #94a3b8; margin-top: 2rem; margin-bottom: 0.75rem; }
             .markdown p { margin-bottom: 1.25rem; line-height: 1.8; }
             .markdown ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.5rem; }
             .markdown li { margin-bottom: 0.5rem; }
             .markdown strong { color: #60a5fa; font-weight: 600; }
             .markdown blockquote { border-left: 4px solid #3b82f6; padding-left: 1rem; font-style: italic; color: #94a3b8; background: rgba(59,130,246,0.05); padding: 1rem; border-radius: 0 0.5rem 0.5rem 0; }
             .markdown code { background: #1e293b; color: #e2e8f0; padding: 0.2rem 0.4rem; rounded; font-size: 0.875em; }
           `}</style>
           <div className="markdown">
             <ReactMarkdown>{module.content}</ReactMarkdown>
           </div>
        </div>

        {/* Section Prompts */}
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <i className="fas fa-terminal text-blue-500"></i>
            Prompts Disponibles
        </h2>
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

      </div>
    </div>
  );
};

export default ModuleView;
