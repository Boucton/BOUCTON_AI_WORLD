import React from 'react';
import { motion } from 'framer-motion';

const Achievements = ({ xp, level }) => {
  // Définition des badges (Simulé pour l'instant)
  const badges = [
    { id: 1, name: "Premier Pas", icon: "fa-shoe-prints", desc: "Avoir lancé l'application", unlocked: true, color: "text-emerald-400" },
    { id: 2, name: "Curieux", icon: "fa-search", desc: "Visiter 3 modules différents", unlocked: xp > 50, color: "text-blue-400" },
    { id: 3, name: "Prompt Engineer", icon: "fa-code", desc: "Atteindre 200 XP", unlocked: xp > 200, color: "text-purple-400" },
    { id: 4, name: "Architecte", icon: "fa-chess-king", desc: "Atteindre 1000 XP", unlocked: xp > 1000, color: "text-amber-400" },
    { id: 5, name: "Hacker Médical", icon: "fa-user-secret", desc: "Découvrir la bibliothèque secrète", unlocked: false, color: "text-red-400" }, // Logique à lier plus tard
  ];

  const nextLevelXp = level === "Interne IA" ? 100 : level === "Chef de Clinique IA" ? 500 : 1000;
  const progress = Math.min((xp / nextLevelXp) * 100, 100);

  return (
    <div className="p-8 max-w-6xl mx-auto animate-fade pb-24">
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">HALL OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">FAME</span></h1>
        <p className="text-slate-400">Suivez votre évolution vers la maîtrise de l'IA.</p>
      </div>

      {/* Carte de Niveau */}
      <div className="glass-card p-8 rounded-3xl border-t border-white/10 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-blue-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-32 h-32 rounded-full border-4 border-slate-800 bg-slate-900 flex items-center justify-center shadow-2xl relative">
                <i className="fas fa-user-astronaut text-5xl text-white"></i>
                <div className="absolute -bottom-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-bold">Niv. {Math.floor(xp / 100) + 1}</div>
            </div>
            <div className="flex-1 w-full">
                <div className="flex justify-between mb-2">
                    <span className="text-2xl font-bold text-white">{level}</span>
                    <span className="text-blue-400 font-mono">{xp} / {nextLevelXp} XP</span>
                </div>
                <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${progress}%` }} 
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-amber-500"
                    />
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">Encore {nextLevelXp - xp} XP pour la promotion.</p>
            </div>
        </div>
      </div>

      {/* Grille des Badges */}
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><i className="fas fa-medal text-amber-500"></i> Badges & Certifications</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {badges.map((badge) => (
            <motion.div 
                key={badge.id}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-2xl border ${badge.unlocked ? 'bg-slate-800/80 border-white/10 shadow-lg' : 'bg-slate-900/50 border-white/5 opacity-50 grayscale'}`}
            >
                <div className={`w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-2xl mb-4 ${badge.color} border border-white/5`}>
                    <i className={`fas ${badge.icon}`}></i>
                </div>
                <h3 className="font-bold text-white">{badge.name}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{badge.desc}</p>
                {badge.unlocked && <div className="mt-4 text-[10px] text-emerald-400 font-bold uppercase tracking-wider"><i className="fas fa-check"></i> Acquis</div>}
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
