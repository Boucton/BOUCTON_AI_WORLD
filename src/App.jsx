import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import config from '../data/config.json';

// Imports
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
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('boucton_xp') || '0'));
  const [userName, setUserName] = useState(() => localStorage.getItem('boucton_username') || 'Dr. Boucton');
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('boucton_theme') || 'dark');
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Chargement Modules
  useEffect(() => {
    const loadModules = async () => {
      const allMarkdown = import.meta.glob('../data/modules/**/*.md', { query: '?raw', import: 'default' });
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
          } catch (e) { return module; }
        })
      );
      setModules(loadedModules);
    };
    loadModules();
  }, []);

  // Effets Persistants
  useEffect(() => { localStorage.setItem('boucton_username', userName); }, [userName]);
  useEffect(() => {
    const root = window.document.documentElement;
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('boucton_theme', theme);
  }, [theme]);

  // Toast
  useEffect(() => {
    const handleToast = (e) => { setToast(e.detail); setTimeout(() => setToast(null), 3000); };
    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const addXp = (amount) => { /* XP Suspendu pour le moment */ }; 
  const getLevel = () => "Utilisateur"; 

  // Fonction de Reset pour les Settings
  const handleSystemReset = () => {
      localStorage.clear();
      window.location.reload();
  };

  const MainLayout = ({ children }) => (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden font-sans relative transition-colors duration-300">
      <NeuralBackground />
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar modules={modules || []} />
        <div className="flex-1 flex flex-col ml-72 h-screen relative z-0 bg-transparent">
          <Header userName={userName} setUserName={setUserName} theme={theme} toggleTheme={toggleTheme} />
          
          <div className="absolute top-5 right-20 z-40 flex gap-2">
             <button onClick={() => navigate('/timer')} className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white hover:text-black transition border border-white/10"><i className="fas fa-stopwatch"></i></button>
             <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white hover:text-black transition border border-white/10"><i className="fas fa-cog"></i></button>
          </div>
          <button onClick={() => setIsNotesOpen(!isNotesOpen)} className="absolute top-5 right-6 z-40 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition shadow-lg"><i className="fas fa-edit"></i></button>
          
          <div className={`fixed top-24 right-1/2 translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3 transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}><i className="fas fa-check-circle"></i> {toast}</div>
          
          <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-slate-50/80 dark:bg-slate-950/50 backdrop-blur-sm pt-6">
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
      <Route path="/" element={<Home modules={modules || []} onStart={() => navigate('/dashboard')} />} />
      <Route path="/dashboard" element={<MainLayout><Dashboard modules={modules || []} /></MainLayout>} />
      <Route path="/playground" element={<MainLayout><Playground /></MainLayout>} />
      <Route path="/data" element={<MainLayout><DataManager /></MainLayout>} />
      <Route path="/achievements" element={<MainLayout><Achievements xp={xp} level={getLevel()} /></MainLayout>} />
      <Route path="/timer" element={<MainLayout><FocusTimer /></MainLayout>} />
      
      {/* Passage des props pour que Settings fonctionne */}
      <Route path="/settings" element={<MainLayout><Settings theme={theme} toggleTheme={toggleTheme} onReset={handleSystemReset} /></MainLayout>} />
      
      <Route path="/workflow" element={<MainLayout><WorkflowEngine /></MainLayout>} />
      <Route path="/module/:moduleId" element={<MainLayout><ModuleView allModules={modules || []} /></MainLayout>} />
    </Routes>
  );
};
export default App;
