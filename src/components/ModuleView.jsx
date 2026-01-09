import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import AudioPlayer from './AudioPlayer';
import ImageModal from './ImageModal';

const ModuleView = ({ allModules }) => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const [fontSize, setFontSize] = useState(1);

  // Sécurité : On cherche le module, s'il n'existe pas, on ne plante pas.
  useEffect(() => {
    if (allModules && allModules.length > 0) {
      const found = allModules.find(m => m.id === moduleId);
      setModule(found);
    }
  }, [moduleId, allModules]);

  if (!allModules || allModules.length === 0) return <div className="p-20 text-center text-slate-500">Chargement de la base de données...</div>;
  if (!module) return <div className="p-20 text-center text-red-400">Module introuvable (ID: {moduleId})</div>;

  // Composants Markdown (Design épuré)
  const MarkdownComponents = {
    h1: ({node, ...props}) => <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-12 mb-6 border-b border-blue-500/30 pb-4" {...props} />,
    h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-800 dark:text-blue-100 mt-10 mb-4 flex items-center gap-2" {...props} />,
    h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-slate-700 dark:text-blue-300 mt-8 mb-3" {...props} />,
    p: ({node, ...props}) => <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-light" style={{ fontSize: `${1.1 * fontSize}rem` }} {...props} />,
    ul: ({node, ...props}) => <ul className="space-y-2 my-6 pl-4 border-l-2 border-slate-200 dark:border-slate-700" {...props} />,
    li: ({node, ...props}) => <li className="pl-4 text-slate-600 dark:text-slate-300" {...props} />,
    blockquote: ({node, ...props}) => <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 my-8 rounded-r-xl italic text-slate-700 dark:text-blue-200" {...props} />,
    img: ({node, ...props}) => (
        <img 
            {...props} 
            className="rounded-xl shadow-lg border border-slate-200 dark:border-white/10 cursor-zoom-in hover:opacity-90 transition max-w-full my-8 mx-auto" 
            onClick={() => setModalImage(props.src)}
        />
    ),
    code: ({node, inline, className, children, ...props}) => {
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
            <div className="rounded-xl overflow-hidden my-6 shadow-xl text-sm">
                <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>{String(children).replace(/\n$/, '')}</SyntaxHighlighter>
            </div>
        ) : ( <code className="bg-slate-200 dark:bg-slate-800 text-red-500 dark:text-amber-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code> );
    },
    a: ({node, ...props}) => <a className="text-blue-600 dark:text-blue-400 hover:underline font-medium" {...props} />
  };

  return (
    <div className="min-h-full pb-20 animate-fade">
      {/* Bannière Hero */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-950 via-transparent to-transparent z-10"></div>
         <img src={module.img} className="w-full h-full object-cover" alt="Cover" onError={(e) => e.target.style.display='none'} />
         
         <div className="absolute bottom-0 left-0 p-8 z-20 max-w-4xl">
             <div className="flex items-center gap-2 mb-2">
                 <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">Module</span>
                 {module.is_core && <span className="px-3 py-1 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">Core System</span>}
             </div>
             <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight drop-shadow-lg">{module.title}</h1>
         </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-10 relative z-30">
        {/* Barre d'outils Flottante */}
        <div className="glass-card p-4 rounded-2xl flex items-center justify-between mb-12 shadow-xl">
             <div className="text-sm text-slate-500 dark:text-slate-400 font-medium pl-2">{module.description}</div>
             <div className="flex gap-2">
                <AudioPlayer text={module.content} />
                <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10 mx-2"></div>
                <button onClick={() => setFontSize(Math.max(0.8, fontSize - 0.1))} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-blue-500 transition"><i className="fas fa-minus text-xs"></i></button>
                <button onClick={() => setFontSize(Math.min(1.5, fontSize + 0.1))} className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-blue-500 transition"><i className="fas fa-plus text-xs"></i></button>
             </div>
        </div>

        {/* CONTENU PRINCIPAL */}
        <article className="markdown-content">
            <ReactMarkdown components={MarkdownComponents} remarkPlugins={[remarkGfm]}>
                {module.content}
            </ReactMarkdown>
        </article>
      </div>

      <ImageModal src={modalImage} isOpen={!!modalImage} onClose={() => setModalImage(null)} />
    </div>
  );
};

export default ModuleView;
