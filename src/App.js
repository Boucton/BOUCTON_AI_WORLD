import React, { useState, useEffect } from 'react';
import config from '../data/config.json';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import '../styles/global.css'; // On va créer ce fichier après

const App = () => {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState('dr_gourmand');
  const [view, setView] = useState('dashboard');
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [userData, setUserData] = useState({});

  // Charge les données des modules au démarrage
  useEffect(() => {
    const loadModules = async () => {
      const loadedModules = await Promise.all(
        config.modules.map(async (module) => {
          try {
            const content = await import(`../${module.content_file}?raw`);
            const prompts = await import(`../${module.prompts_file}`);
            return { ...module, content: content.default, prompts: prompts.default };
          } catch (error) {
            console.error(`Erreur chargement module ${module.id}:`, error);
            return module; // Retourne le module même sans données
          }
        })
      );
      setModules(loadedModules);
    };
    loadModules();
  }, []);

  const handleMysteryTrigger = () => {
    if (!mysteryUnlocked) {
      setMysteryUnlocked(true);
      setTimeout(() => {
        setActiveModule('time');
        setView('module');
      }, 600);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          setView={setView}
          mysteryUnlocked={mysteryUnlocked}
          onMysteryTrigger={handleMysteryTrigger}
        />
        {view === 'dashboard' ? (
          <Dashboard modules={modules} setView={setView} setActiveModule={setActiveModule} />
        ) : (
          <ModuleView
            module={modules.find(m => m.id === activeModule)}
            userData={userData}
            setUserData={setUserData}
          />
        )}
      </div>
    </div>
  );
};

export default App;
