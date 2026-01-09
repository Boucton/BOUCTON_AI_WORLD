import React, { useState, useEffect } from 'react';
import config from '../data/config.json';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Home from './components/Home'; // On importe le nouveau fichier
import '../styles/global.css';

const App = () => {
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null); // Null au début
  const [view, setView] = useState('home'); // On commence par 'home'
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
            console.error(`Erreur module ${module.id}:`, error);
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

  const handleMysteryTrigger = () => {
    if (!mysteryUnlocked) {
      setMysteryUnlocked(true);
      setTimeout(() => {
        setActiveModule('time');
        setView('module');
      }, 600);
    }
  };

  // Si on est sur la Home, on affiche juste ça
  if (view === 'home') {
    return <Home onStart={handleStart} />;
  }

  // Sinon on affiche l'application complète
  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar
          modules={modules}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          setView={setView}
          mysteryUnlocked={mysteryUnlocked}
          onMysteryTrigger={handleMysteryTrigger}
        />
        <main className="flex-1 overflow-hidden relative ml-72"> {/* Marge gauche pour la sidebar */}
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
