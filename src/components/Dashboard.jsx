import React from 'react';

const Dashboard = ({ modules, setView, setActiveModule }) => {
  return (
    <div className="flex-1 p-10 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6">Tableau de Bord</h1>
        <p className="text-slate-400 mb-10">
          Bienvenue dans BOUCTON_AI_WORLD. Sélectionnez un module pour commencer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              onClick={() => { setActiveModule(module.id); setView('module'); }}
              className="glass-card p-6 rounded-2xl cursor-pointer hover:shadow-2xl transition-all"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${THEMES[module.color].gradient}`}>
                  <i className={`fas ${THEMES[module.color].icon} text-white`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{module.title}</h3>
                  <p className="text-sm text-slate-400">{module.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
