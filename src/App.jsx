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
  const [view, setView] = useState('home'); // On force le démarrage sur 'home'
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [userData, setUserData] = useState({});

  // Chargement des données
  useEffect(() => {
    const loadModules = async () => {
      // On charge la config
      const loadedModules = await Promise.all(
        config.modules.map(async (module) => {
          try {
            // Astuce pour Vite : on importe les fichiers dynamiquement
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

// Fonction pour naviguer directement vers un module
   const handleNavigateToModule = (moduleId) => {
     setActiveModule(moduleId);
     setView('module');
   };

   // Si on est sur la home
   if (view === 'home') {
     return (
       <Home 
         onStart={handleStart} 
         onNavigate={handleNavigateToModule} // <--- On passe la nouvelle fonction
       />
     );
   }

  // Sinon l'application
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white">
      {/* On cache le Header pour l'instant pour simplifier */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          setActiveModule={(id) => { setActiveModule(id); setView('module'); }}
          setView={setView}
          mysteryUnlocked={mysteryUnlocked}
          onMysteryTrigger={() => setMysteryUnlocked(true)}
        />
        <main className="flex-1 overflow-auto bg-slate-900 ml-72">
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
