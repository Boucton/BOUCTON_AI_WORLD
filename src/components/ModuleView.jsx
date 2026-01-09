import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PromptCard from './PromptCard';

const ModuleView = ({ module, userData, setUserData }) => {
  const [activePrompt, setActivePrompt] = useState(null);

  if (!module) return <div className="flex-1 p-10">Module introuvable</div>;

  return (
    <div className="flex-1 h-screen overflow-y-auto bg-slate-950/50 p-10">
      {/* En-tête du module */}
      <div className="relative h-48 rounded-3xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
        <img
          src={module.img || `https://source.unsplash.com/random/1200x600/?${module.id}`}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          alt={module.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h2 className="text-4xl font-black text-white mb-2">{module.title}</h2>
          <p className="text-slate-300">{module.description}</p>
        </div>
      </div>

      {/* Contenu Markdown */}
      <div className="prose prose-invert max-w-none mb-10">
        <ReactMarkdown>{module.content}</ReactMarkdown>
      </div>

      {/* Cartes de prompts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
  );
};

export default ModuleView;
