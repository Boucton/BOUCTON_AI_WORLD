import React, { useState, useEffect } from 'react';
import config from '../data/config.json';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Header from './components/Header';
import Launchpad from './components/Launchpad';

const App = () => {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [view, setView] = useState('home'); 
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [userData, setUserData] = useState({});
  
  // Gamification
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

  // Chargement des données & Nettoyage
  useEffect(() => {
    const loadModules = async () => {
      // Importation dynamique via Vite
      const allMarkdown = import.meta.glob('../data/modules/**/*.md', { as: 'raw' });
      const allPrompts = import.meta.glob('../data/modules/**/*.json');

      const loadedModules = await Promise.all(
        config.modules.map(async (module) => {
          try {
            const mdPath = `../${module.content_file}`;
            const jsonPath = `../${module.prompts_file}`;

            // Vérification de l'existence des fichiers
            if (!allMarkdown[mdPath] || !allPrompts[jsonPath]) {
                console.warn(`Module incomplet : ${module.id}`);
                return module;
            }

            // Chargement contenu brut
            const rawContent = await allMarkdown[mdPath]();
            
            // --- NETTOYAGE FRONTMATTER (ROBUSTE) ---
            // Supprime tout ce qui se trouve entre deux '---' si cela apparaît au début du fichier
            // Supprime aussi les lignes vides au début
            const cleanContent = rawContent
                .replace(/^---[\s\S]*?---\s*/, '') // Supprime le bloc YAML
                .trim(); // Supprime les espaces vides avant/après

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
        
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          setActiveModule={(id) => { setActiveModule(id); setView('module'); addXp(2); }}
          setView={setView}
          mysteryUnlocked={mysteryUnlocked}
          onMysteryTrigger={handleMysteryTrigger}
        />
        
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

        <Launchpad />

      </div>
    </div>
  );
};

export default App;
