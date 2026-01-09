import React, { useState, useEffect } from 'react';
import config from '../data/config.json';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

const App = () => {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [view, setView] = useState('home'); 
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [userData, setUserData] = useState({});

  // Chargement des données (VERSION ROBUSTE VITE)
  useEffect(() => {
    const loadModules = async () => {
      // 1. On liste tous les fichiers possibles via import.meta.glob
      const allMarkdown = import.meta.glob('../data/modules/**/*.md', { as: 'raw' });
      const allPrompts = import.meta.glob('../data/modules/**/*.json');

      const loadedModules = await Promise.all(
        config.modules.map(async (module) => {
          try {
            // On reconstruit le chemin relatif depuis ce fichier
            const mdPath = `../${module.content_file}`;
            const jsonPath = `../${module.prompts_file}`;

            // On vérifie si les fichiers existent dans notre liste
            if (!allMarkdown[mdPath] || !allPrompts[jsonPath]) {
              console.warn(`Fichiers manquants pour le module : ${module.id}`);
              return module;
            }

            // On charge le contenu
            const content = await allMarkdown[mdPath]();
            const promptsModule = await allPrompts[jsonPath]();

            return { ...module, content: content, prompts: promptsModule.default };
          } catch (error) {
            console.error("Erreur chargement module:", module.id, error);
            return module;
          }
        })
      );
      setModules(loadedModules);
    };
    loadModules();
  }, []);

  const handleStart = () => {
    setView('dashboard');
  };

  const handleNavigateToModule = (moduleId) => {
    setActiveModule(moduleId);
    setView('module');
  };

  const handleMysteryTrigger = () => {
     if (!mysteryUnlocked) {
         setMysteryUnlocked(true);
     }
  };
// Si on est sur la home
  if (view === 'home') {
    return (
      <Home 
        modules={modules} // <--- C'EST ICI QU'ON PASSE LES DONNÉES
        onStart={handleStart} 
        onNavigate={handleNavigateToModule} 
      />
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          setActiveModule={(id) => { setActiveModule(id); setView('module'); }}
          setView={setView}
          mysteryUnlocked={mysteryUnlocked}
          onMysteryTrigger={handleMysteryTrigger}
        />
        
        <main className="flex-1 h-screen overflow-y-auto bg-slate-950 ml-72 relative z-0 custom-scrollbar">
          {view === 'dashboard' ? (
            <Dashboard modules={modules} setView={setView} setActiveModule={setActiveModule} />
          ) : (
            <ModuleView
              module={modules.find(m => m.id === activeModule)}
              userData={userData}
              setUserData={setUserData}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
