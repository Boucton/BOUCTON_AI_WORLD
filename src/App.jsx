import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import config from '../data/config.json';

// --- IMPORTS COMPOSANTS ---
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Header from './components/Header';
import Launchpad from './components/Launchpad';
import NotesPanel from './components/NotesPanel';
import Playground from './components/Playground';
import DataManager from './components/DataManager';
import Achievements from './components/Achievements';
import FocusTimer from './components/FocusTimer';
import Settings from './components/Settings';
import WorkflowEngine from './components/WorkflowEngine';
import NeuralBackground from './components/NeuralBackground';

const App = () => {
  const [modules, setModules] = useState([]);
  const [userData, setUserData] = useState({});
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('boucton_xp') || '0'));
  const [userName, setUserName] = useState(() => localStorage.getItem('boucton_username') || 'Dr. Boucton');
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Gestion du Thème (Dark par défaut)
  const [theme, setTheme] = useState(() => localStorage.getItem('boucton_theme') || 'dark');

  const navigate = useNavigate();
  const location = useLocation();

  // 1. Chargement des Modules (Syntaxe Vite v5+)
  useEffect(() => {
    const loadModules = async () => {
      const allMarkdown = import.meta.glob('../data/modules/**/*.md', { query: '?raw', import: 'default' });
      const allPrompts = import.meta.glob('../data/modules/**/*.json');

      const loadedModules = await Promise.all(
        config.modules.map(async (module) => {
          try {
            const mdPath = `../${module.content_file}`;
            const jsonPath = `../${module.prompts_file}`;

            // Sécurité si fichier manquant
            if (!allMarkdown[mdPath] || !allPrompts[jsonPath]) {
                console.warn(`Fichiers manquants pour ${module.id}`);
                return module;
            }

            const rawContent = await allMarkdown[mdPath]();
            // Nettoyage du Frontmatter YAML si présent
            const cleanContent = rawContent.replace(/^---[\s\S]*?---\s*/, '').trim();
            const promptsModule = await allPrompts[jsonPath]();

            return { ...module, content: cleanContent, prompts: promptsModule.default };
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

  // 2. Persistance & Effets de bord
  useEffect(() => { localStorage.setItem('boucton_username', userName); }, [userName]);
  
  // Effet Dark Mode
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('boucton_theme', theme);
  }, [theme]);

  // Effet Caméléon (Couleur d'accentuation)
  useEffect(() => {
    const root = document.documentElement;
    const currentPath = location.pathname;
    // Extraction sécurisée de l'ID du module
    const match = currentPath.match(/\/module\/([^/]+)/);
    const moduleId = match ? match[1] : null;
    
    if (moduleId) {
        const moduleData = modules.find(m => m.id === moduleId);
        const color = moduleData?.color || 'blue';
        const colors = {
            rose: '244, 63, 94', sky: '14, 165, 233', indigo: '99, 102, 241',
            teal: '20, 184, 166', amber: '245, 158, 11', blue: '59, 130, 246'
        };
        root.style.setProperty('--accent-color', colors[color] || colors.blue);
    } else {
        root.style.setProperty('--accent-color', '59, 130, 246');
    }
  }, [location, modules]);

  // Toast System
  useEffect(() => {
    const handleToast = (e) => { setToast(e.detail); setTimeout(() => setToast(null), 3000); };
    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  // Helpers
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

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleMysteryTrigger = () => { if (!mysteryUnlocked) { setMysteryUnlocked(true); addXp(50); } };

  // Layout Principal
  const MainLayout = ({ children }) => (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden font-sans selection:bg-blue-500/30 relative transition-colors duration-300">
      <NeuralBackground /> {/* Fond Animé */}
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar modules={modules} mysteryUnlocked={mysteryUnlocked} onMysteryTrigger={handleMysteryTrigger} />
        
        <div className="flex-1 flex flex-col ml-72 h-screen relative z-0 bg-transparent">
          <Header 
            xp={xp} 
            level={getLevel(xp)} 
            userName={userName} 
            setUserName={setUserName} 
            theme={theme}
            toggleTheme={toggleTheme}
          />
          
          {/* Menu Outils Rapides (Top Right) */}
          <div className="absolute top-4 right-20 z-40 flex gap-2">
             <button onClick={() => navigate('/timer')} className="w-10 h-10 bg-white/80 dark:bg-slate-800/80 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-amber-500 hover:text-white transition shadow-lg border border-slate-200 dark:border-white/10" title="Focus Timer"><i className="fas fa-stopwatch"></i></button>
             <button onClick={() => navigate('/achievements')} className="w-10 h-10 bg-white/80 dark:bg-slate-800/80 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-purple-600 hover:text-white transition shadow-lg border border-slate-200 dark:border-white/10" title="Succès"><i className="fas fa-trophy"></i></button>
             <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-white/80 dark:bg-slate-800/80 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-slate-600 hover:text-white transition shadow-lg border border-slate-200 dark:border-white/10" title="Paramètres"><i className="fas fa-cog"></i></button>
          </div>

          <button onClick={() => setIsNotesOpen(!isNotesOpen)} className="absolute top-4 right-6 z-40 w-10 h-10 bg-white/80 dark:bg-slate-800/80 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition shadow-lg border border-slate-200 dark:border-white/10" title="Carnet de Bord"><i className="fas fa-edit"></i></button>
          
          {/* Toast Notification */}
          <div className={`fixed top-24 right-1/2 translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3 transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
              <i className="fas fa-check-circle"></i> {toast}
          </div>
          
          <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-slate-50/50 dark:bg-slate-950/30 backdrop-blur-sm">
            {children}
          </main>
        </div>
        
        <Launchpad />
        <NotesPanel isOpen={isNotesOpen} onClose={() => setIsNotesOpen(false)} />
      </div>
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<Home modules={modules} onStart={() => { addXp(10); navigate('/dashboard'); }} />} />
      <Route path="/dashboard" element={<MainLayout><Dashboard modules={modules} /></MainLayout>} />
      
      {/* Outils */}
      <Route path="/playground" element={<MainLayout><Playground /></MainLayout>} />
      <Route path="/data" element={<MainLayout><DataManager /></MainLayout>} />
      <Route path="/achievements" element={<MainLayout><Achievements xp={xp} level={getLevel(xp)} /></MainLayout>} />
      <Route path="/timer" element={<MainLayout><FocusTimer /></MainLayout>} />
      <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
      <Route path="/workflow" element={<MainLayout><WorkflowEngine /></MainLayout>} />
      <Route path="/" element={<Home modules={modules || []} onStart={() => { addXp(10); navigate('/dashboard'); }} />} />
      <Route path="/dashboard" element={<MainLayout><Dashboard modules={modules || []} /></MainLayout>} />

      {/* Vue Module Dynamique */}
      <Route path="/module/:moduleId" element={<MainLayout><ModuleView allModules={modules} userData={userData} setUserData={setUserData} addXp={addXp} /></MainLayout>} />
    </Routes>
  );
};

export default App;
