import React, { useState, useEffect } from 'react';
import config from '../data/config.json';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Header from './components/Header';
import Launchpad from './components/Launchpad';
import NotesPanel from './components/NotesPanel'; // <---

const App = () => {
  const [view, setView] = useState(() => localStorage.getItem('boucton_view') || 'home'); 
  const [activeModule, setActiveModule] = useState(() => localStorage.getItem('boucton_module') || null);
  const [modules, setModules] = useState([]);
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [userData, setUserData] = useState({});
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('boucton_xp') || '0'));
  
  // État du carnet de bord
  const [isNotesOpen, setIsNotesOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('boucton_view', view);
    if (activeModule) localStorage.setItem('boucton_module', activeModule);
  }, [view, activeModule]);

  const getLevel = (xp) => {
    if (xp < 100) return "Interne IA";
    if (xp < 500) return "Chef de Clinique IA";
    if (xp < 1000) return "Professeur IA";
    return "Architecte Système";
  };

  const addXp = (amount) => {
    const newXp = xp + amount;
    setXp(newXp);
    localStorage.setItem('boucton_xp', newXp.toString());
  };

  useEffect(() => {
    const loadModules = async () => {
      const allMarkdown = import.meta.glob('../data/modules/**/*.md', { as: 'raw' });
      const allPrompts = import.meta.glob('../data/modules/**/*.json');

      const loadedModules = await Promise.all(
        config.modules.map(async (module) => {
          try {
            const mdPath = `../${module.content_file}`;
            const jsonPath = `../${module.prompts_file}`;

            if (!allMarkdown[mdPath] || !allPrompts[jsonPath]) return module;

            const rawContent = await allMarkdown[mdPath]();
            const cleanContent = rawContent.replace(/^---[\s\S]*?---\s*/, '').trim();
            const promptsModule = await allPrompts[jsonPath]();

            return { ...module, content: cleanContent, prompts: promptsModule.default };
          } catch (error) {
            console.error("Erreur critique module:", module.id, error);
            return module;
          }
        })
      );
      setModules(loadedModules);
    };
    loadModules();
  }, []);

  const handleStart = () => { addXp(10); setView('dashboard'); };
  const handleNavigateToModule = (moduleId) => { setActiveModule(moduleId); setView('module'); addXp(5); };
  const handleMysteryTrigger = () => { if (!mysteryUnlocked) { setMysteryUnlocked(true); addXp(50); } };

  if (view === 'home') {
    return <Home modules={modules} onStart={handleStart} onNavigate={handleNavigateToModule} />;
  }

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar modules={modules} activeModule={activeModule} setActiveModule={(id) => { setActiveModule(id); setView('module'); addXp(2); }} setView={setView} mysteryUnlocked={mysteryUnlocked} onMysteryTrigger={handleMysteryTrigger} />
        
        <div className="flex-1 flex flex-col ml-72 h-screen relative z-0 bg-slate-950">
            <Header xp={xp} level={getLevel(xp)} />
            
            {/* Bouton pour ouvrir les Notes (Flottant en haut à droite) */}
            <button 
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className="absolute top-4 right-6 z-40 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition shadow-lg border border-white/10"
              title="Carnet de Bord"
            >
              <i className="fas fa-edit"></i>
            </button>

            <main className="flex-1 overflow-y-auto bg-slate-950 custom-scrollbar relative">
                {view === 'dashboard' ? (
                    <Dashboard modules={modules} setView={setView} setActiveModule={(id) => {setActiveModule(id); addXp(5);}} />
                ) : (
                    <ModuleView
                        module={modules.find(m => m.id === activeModule)}
                        allModules={modules} // Passé pour les Synapses
                        userData={userData}
                        setUserData={setUserData}
                        setActiveModule={setActiveModule} // Pour navigation synapse
                    />
                )}
            </main>
        </div>

        <Launchpad />
        <NotesPanel isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />

      </div>
    </div>
  );
};

export default App;
