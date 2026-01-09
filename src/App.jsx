import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import config from '../data/config.json';
import Sidebar from './components/Sidebar';
import ModuleView from './components/ModuleView';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Header from './components/Header';
import Launchpad from './components/Launchpad';
import NotesPanel from './components/NotesPanel';
import Playground from './components/Playground';
import DataManager from './components/DataManager';
// NOUVEAUX IMPORTS V2
import NeuralBackground from './components/NeuralBackground';
import Achievements from './components/Achievements';
import FocusTimer from './components/FocusTimer';
import Settings from './components/Settings';

const App = () => {
  const [modules, setModules] = useState([]);
  const [userData, setUserData] = useState({});
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('boucton_xp') || '0'));
  const [userName, setUserName] = useState(() => localStorage.getItem('boucton_username') || 'Dr. Boucton');
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [mysteryUnlocked, setMysteryUnlocked] = useState(false);
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loadModules = async () => {
      const allMarkdown = import.meta.glob('../data/modules/**/*.md', { as: 'raw' });
      const allPrompts = import.meta.glob('../data/modules/**/*.json');
      const loadedModules = await Promise.all(config.modules.map(async (module) => {
          try {
            const mdPath = `../${module.content_file}`;
            const jsonPath = `../${module.prompts_file}`;
            if (!allMarkdown[mdPath] || !allPrompts[jsonPath]) return module;
            const rawContent = await allMarkdown[mdPath]();
            const cleanContent = rawContent.replace(/^---[\s\S]*?---\s*/, '').trim();
            const promptsModule = await allPrompts[jsonPath]();
            return { ...module, content: cleanContent, prompts: promptsModule.default };
          } catch (error) { return module; }
        }));
      setModules(loadedModules);
    };
    loadModules();
  }, []);

  useEffect(() => { localStorage.setItem('boucton_username', userName); }, [userName]);
  
  // Gestion du Toast
  useEffect(() => {
    const handleToast = (e) => { setToast(e.detail); setTimeout(() => setToast(null), 3000); };
    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  const getLevel = (xp) => {
    if (xp < 100) return "Interne IA";
    if (xp < 500) return "Chef de Clinique IA";
    if (xp < 1000) return "Professeur IA";
    return "Architecte Système";
  };
  const addXp = (amount) => { const newXp = xp + amount; setXp(newXp); localStorage.setItem('boucton_xp', newXp.toString()); };
  const handleMysteryTrigger = () => { if (!mysteryUnlocked) { setMysteryUnlocked(true); addXp(50); } };

  const MainLayout = ({ children }) => (
    <div className="flex flex-col h-screen bg-slate-950 text-white overflow-hidden font-sans selection:bg-blue-500/30 relative">
      <NeuralBackground /> {/* V2: Fond Animé */}
      
      <div className="flex flex-1 overflow-hidden relative z-10">
        <Sidebar modules={modules} mysteryUnlocked={mysteryUnlocked} onMysteryTrigger={handleMysteryTrigger} />
        <div className="flex-1 flex flex-col ml-72 h-screen relative z-0 bg-transparent"> {/* bg-transparent pour voir le Neural */}
          <Header xp={xp} level={getLevel(xp)} userName={userName} setUserName={setUserName} />
          
          {/* Menu Outils Rapides (Header Extension) */}
          <div className="absolute top-4 right-20 z-40 flex gap-2">
             <button onClick={() => navigate('/timer')} className="w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center text-slate-300 hover:bg-amber-600 hover:text-white transition shadow-lg border border-white/10" title="Focus Timer"><i className="fas fa-stopwatch"></i></button>
             <button onClick={() => navigate('/achievements')} className="w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center text-slate-300 hover:bg-purple-600 hover:text-white transition shadow-lg border border-white/10" title="Succès"><i className="fas fa-trophy"></i></button>
             <button onClick={() => navigate('/settings')} className="w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-600 hover:text-white transition shadow-lg border border-white/10" title="Paramètres"><i className="fas fa-cog"></i></button>
          </div>

          <button onClick={() => setIsNotesOpen(!isNotesOpen)} className="absolute top-4 right-6 z-40 w-10 h-10 bg-slate-800/80 rounded-full flex items-center justify-center text-slate-300 hover:bg-blue-600 hover:text-white transition shadow-lg border border-white/10" title="Carnet de Bord"><i className="fas fa-edit"></i></button>
          
          <div className={`fixed top-20 right-1/2 translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold flex items-center gap-3 transition-all duration-300 ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}><i className="fas fa-check-circle"></i> {toast}</div>
          
          <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-slate-950/30 backdrop-blur-sm"> {/* Légère transparence */}
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
      <Route path="/playground" element={<MainLayout><Playground /></MainLayout>} />
      <Route path="/data" element={<MainLayout><DataManager /></MainLayout>} />
      {/* NOUVELLES ROUTES V2 */}
      <Route path="/achievements" element={<MainLayout><Achievements xp={xp} level={getLevel(xp)} /></MainLayout>} />
      <Route path="/timer" element={<MainLayout><FocusTimer /></MainLayout>} />
      <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
      
      <Route path="/module/:moduleId" element={<MainLayout><ModuleView allModules={modules} userData={userData} setUserData={setUserData} addXp={addXp} /></MainLayout>} />
    </Routes>
  );
};
export default App;
