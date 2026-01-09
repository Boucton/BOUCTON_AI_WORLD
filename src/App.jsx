import React, { useState, useEffect } from 'react';
import config from '../data/config.json';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Header from './components/Header';   // <--- Nouveau
import Launchpad from './components/Launchpad'; // <--- Nouveau

const App = () => {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [view, setView] = useState('home'); 
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [userData, setUserData] = useState({});
  
  // Système d'XP (Gamification)
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('boucton_xp') || '0'));
  
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

  // Chargement des données
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
            // Nettoyage Frontmatter
            const cleanContent = rawContent.replace(/^---[\s\S]*?---\s*/, '');
            const promptsModule = await allPrompts[jsonPath]();

            return { ...module, content: cleanContent, prompts: promptsModule.default };
          } catch (error) {
            console.error("Erreur chargement:", module.id);
            return module;
          }
        })
      );
      setModules(loadedModules);
    };
    loadModules();
  }, []);

  const handleStart = () => {
    addXp(10); // +10 XP au démarrage
    setView('dashboard');
  };

  const handleNavigateToModule = (moduleId) => {
    setActiveModule(moduleId);
    setView('module');
    addXp(5); // +5 XP par navigation
  };

  const handleMysteryTrigger = () => {
     if (!mysteryUnlocked) {
         setMysteryUnlocked(true);
         addXp(50); // Bonus secret
     }
  };

  // Rendu
  if (view === 'home') {
    return (
      <Home 
        modules={modules}
        onStart={handleStart} 
        onNavigate={handleNavigateToModule} 
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* 1. Sidebar */}
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          setActiveModule={(id) => { setActiveModule(id); setView('module'); addXp(2); }}
          setView={setView}
          mysteryUnlocked={mysteryUnlocked}
          onMysteryTrigger={handleMysteryTrigger}
        />
        
        {/* 2. Contenu Principal avec Header */}
        <div className="flex-1 flex flex-col ml-72 h-screen relative z-0">
            {/* HUD (Header) */}
            <Header xp={xp} level={getLevel(xp)} />

            <main className="flex-1 overflow-y-auto bg-slate-950 custom-scrollbar relative">
                {view === 'dashboard' ? (
                    <Dashboard modules={modules} setView={setView} setActiveModule={(id) => {setActiveModule(id); addXp(5);}} />
                ) : (
                    <ModuleView
                    module={modules.find(m => m.id === activeModule)}
                    userData={userData}
                    setUserData={setUserData}
                    />
                )}
            </main>
        </div>

        {/* 3. Launchpad (Flottant) */}
        <Launchpad />

      </div>
    </div>
  );
};

export default App;
