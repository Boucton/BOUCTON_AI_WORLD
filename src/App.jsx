import React, { useState, useEffect } from 'react';
import config from '../data/config.json';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Home from './components/Home';

const App = () => {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [view, setView] = useState('home'); 
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [userData, setUserData] = useState({});

  // Chargement des données
  useEffect(() => {
    const loadModules = async () => {
      const loadedModules = await Promise.all(
        config.modules.map(async (module) => {
          try {
            const content = await import(`../${module.content_file}?raw`);
            const prompts = await import(`../${module.prompts_file}`);
            return { ...module, content: content.default, prompts: prompts.default };
          } catch (error) {
            console.error("Erreur module:", module.id, error);
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

  // Fonction pour naviguer directement vers un module depuis la Home
  const handleNavigateToModule = (moduleId) => {
    setActiveModule(moduleId);
    setView('module');
  };

  // Gestion de l'Easter Egg
  const handleMysteryTrigger = () => {
     if (!mysteryUnlocked) {
         setMysteryUnlocked(true);
         // Petit délai pour l'effet de surprise si besoin
     }
  };

  // Si on est sur la home
  if (view === 'home') {
    return (
      <Home 
        onStart={handleStart} 
        onNavigate={handleNavigateToModule} 
      />
    );
  }

  // Sinon l'application principale
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden">
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar fixe à gauche */}
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          setActiveModule={(id) => { setActiveModule(id); setView('module'); }}
          setView={setView}
          mysteryUnlocked={mysteryUnlocked}
          onMysteryTrigger={handleMysteryTrigger}
        />
        
        {/* Contenu principal : C'est ici que c'était cassé. J'ai remis <main> correctement fermé */}
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
