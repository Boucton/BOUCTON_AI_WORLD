import React, { useState, useEffect } from 'react';
import config from '../data/config.json';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Header from './components/Header';
import Launchpad from './components/Launchpad';
import SecretLibrary from './components/SecretLibrary';
import NotesPanel from './components/NotesPanel';
import { THEMES } from './styles/themes';

const App = () => {
  const [view, setView] = useState(() => localStorage.getItem('boucton_view') || 'home'); 
  const [activeModule, setActiveModule] = useState(() => localStorage.getItem('boucton_module') || null);
  const [modules, setModules] = useState([]);
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [userData, setUserData] = useState({});
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('boucton_xp') || '0'));
  
  // NOUVEAU : Identité Persistante
  const [userName, setUserName] = useState(() => localStorage.getItem('boucton_username') || 'Dr. Boucton');
  
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  
  // NOUVEAU : Système de Toast (Feedback)
  const [toast, setToast] = useState(null);

  // Sauvegardes
  useEffect(() => { localStorage.setItem('boucton_view', view); if (activeModule) localStorage.setItem('boucton_module', activeModule); }, [view, activeModule]);
  useEffect(() => { localStorage.setItem('boucton_username', userName); }, [userName]);

  // Écouteur d'événement pour déclencher un toast depuis n'importe où
  useEffect(() => {
    const handleToast = (e) => {
        setToast(e.detail);
        setTimeout(() => setToast(null), 3000);
    };
    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  // EFFET CAMÉLÉON : Change la couleur d'accentuation CSS selon le module actif
  useEffect(() => {
    const root = document.documentElement;
    if (activeModule) {
        const moduleData = modules.find(m => m.id === activeModule);
        const color = moduleData?.color || 'blue';
        // Mapping simple des couleurs Tailwind vers RGB pour le CSS
        const colors = {
            rose: '244, 63, 94',
            sky: '14, 165, 233',
            indigo: '99, 102, 241',
            teal: '20, 184, 166',
            amber: '245, 158, 11',
            blue: '59, 130, 246'
        };
        root.style.setProperty('--accent-color', colors[color] || colors.blue);
    } else {
        root.style.setProperty('--accent-color', '59, 130, 246'); // Bleu par défaut
    }
  }, [activeModule, modules]);


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
          } catch (error) { return module; }
        })
      );
      setModules(loadedModules);
    };
    loadModules();
  }, []);

  const handleStart = () => { addXp(10); setView('dashboard'); };
  const handleNavigateToModule = (moduleId) => { setActiveModule(moduleId); setView('module'); addXp(5); };
  const handleMysteryTrigger = () => { if (!mysteryUnlocked) { setMysteryUnlocked(true); addXp(50); } };

  if (view === 'home') { return <Home modules={modules} onStart={handleStart} onNavigate={handleNavigateToModule} />; }

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar modules={modules} activeModule={activeModule} setActiveModule={(id) => { setActiveModule(id); setView('module'); addXp(2); }} setView={setView} mysteryUnlocked={mysteryUnlocked} onMysteryTrigger={handleMysteryTrigger} />
        
        <div className="flex-1 flex flex-col ml-72 h-screen relative z-0 bg-slate-950">
            <Header xp={xp} level={getLevel(xp)} userName={userName} setUserName={setUserName} />
            
            <button 
              onClick={() => setIsNotesOpen(!isNotesOpen)}
              className="absolute top-4 right-6 z-40 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition shadow-lg border border-white/10"
              title="Carnet de Bord"
            >
              <i className="fas fa-edit"></i>
            </button>

            {/* TOAST NOTIFICATION */}
            <div className={`fixed top-20 right-1/2 translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3 transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                <i className="fas fa-check-circle"></i>
                {toast}
            </div>

            <main className="flex-1 overflow-y-auto bg-slate-950 custom-scrollbar relative">
                {view === 'dashboard' ? (
                    <Dashboard modules={modules} setView={setView} setActiveModule={(id) => {setActiveModule(id); addXp(5);}} />
                ) : (
                    <ModuleView
                        module={modules.find(m => m.id === activeModule)}
                        allModules={modules} 
                        userData={userData}
                        setUserData={setUserData}
                        setActiveModule={setActiveModule}
                    />
                )}
            </main>
        </div>

        <Launchpad />
        <NotesPanel isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />
        <SecretLibrary xp={xp} />

      </div>
    </div>
  );
};

export default App;
