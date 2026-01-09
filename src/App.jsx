import React, { useState, useEffect } from 'react';
import config from '../data/config.json';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Header from './components/Header';
import Launchpad from './components/Launchpad';

const App = () => {
  // --- PERSISTANCE DE L'ÉTAT (Le Cerveau qui n'oublie pas) ---
  // On initialise l'état en lisant le localStorage s'il existe
  const [view, setView] = useState(() => localStorage.getItem('boucton_view') || 'home'); 
  const [activeModule, setActiveModule] = useState(() => localStorage.getItem('boucton_module') || null);
  const [modules, setModules] = useState([]);
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [userData, setUserData] = useState({});
  
  // Gamification (XP)
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('boucton_xp') || '0'));
  
  // Sauvegarde automatique de la navigation
  useEffect(() => {
    localStorage.setItem('boucton_view', view);
    if (activeModule) {
        localStorage.setItem('boucton_module', activeModule);
    }
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

            if (!allMarkdown[mdPath] || !allPrompts[jsonPath]) {
                console.warn(`Module incomplet : ${module.id}`);
                return module;
            }

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

  // Handlers de Navigation
  const handleStart = () => {
    addXp(10);
    setView('dashboard');
  };

  const handleNavigateToModule = (moduleId) => {
    setActiveModule(moduleId);
    setView('module');
    addXp(5);
  };

  const handleMysteryTrigger = () => {
     if (!mysteryUnlocked) {
         setMysteryUnlocked(true);
         addXp(50);
     }
  };

  // Si on est sur la home, pas besoin de charger toute l'interface lourde
  if (view === 'home') {
    return (
      <Home 
        modules={modules}
        onStart={handleStart} 
        onNavigate={handleNavigateToModule} 
      />
    );
  }

  // Application Principale
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Navigation Latérale */}
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          setActiveModule={(id) => { setActiveModule(id); setView('module'); addXp(2); }}
          setView={setView}
          mysteryUnlocked={mysteryUnlocked}
          onMysteryTrigger={handleMysteryTrigger}
        />
        
        {/* Contenu Central */}
        <div className="flex-1 flex flex-col ml-72 h-screen relative z-0 bg-slate-950">
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

        {/* Le Launchpad (Toujours visible) */}
        <Launchpad />

      </div>
    </div>
  );
};

export default App;
