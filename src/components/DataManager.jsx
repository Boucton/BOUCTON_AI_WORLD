import React from 'react';

const DataManager = () => {
  const handleExport = () => {
    const data = {
      xp: localStorage.getItem('boucton_xp'),
      notes: localStorage.getItem('boucton_notes'),
      favs: localStorage.getItem('boucton_favs'),
      username: localStorage.getItem('boucton_username'),
      date: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; 
    a.download = `boucton_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    window.dispatchEvent(new CustomEvent('show-toast', { detail: 'Sauvegarde exportée !' }));
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.xp) localStorage.setItem('boucton_xp', data.xp);
        if (data.notes) localStorage.setItem('boucton_notes', data.notes);
        if (data.favs) localStorage.setItem('boucton_favs', data.favs);
        if (data.username) localStorage.setItem('boucton_username', data.username);
        window.location.reload();
      } catch (err) { alert("Fichier de sauvegarde invalide."); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Centre de Données</h1>
        <p className="text-slate-400 text-sm">Gérez la persistance de votre intelligence et de votre progression.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Export */}
        <div className="glass-card p-8 rounded-2xl border-l-4 border-blue-500 bg-slate-900/40">
           <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 mb-4">
              <i className="fas fa-download text-xl"></i>
           </div>
           <h3 className="text-xl font-bold text-white mb-2">Exporter ma progression</h3>
           <p className="text-slate-400 text-sm mb-6">Téléchargez un fichier JSON contenant votre XP, vos notes, vos favoris et votre profil.</p>
           <button onClick={handleExport} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition shadow-lg">
              Créer une Sauvegarde
           </button>
        </div>

        {/* Import */}
        <div className="glass-card p-8 rounded-2xl border-l-4 border-emerald-500 bg-slate-900/40">
           <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
              <i className="fas fa-upload text-xl"></i>
           </div>
           <h3 className="text-xl font-bold text-white mb-2">Restaurer une sauvegarde</h3>
           <p className="text-slate-400 text-sm mb-6">Chargez un fichier JSON pour récupérer vos données (écrase les données actuelles).</p>
           <label className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-bold transition shadow-lg cursor-pointer flex items-center justify-center gap-2">
              <i className="fas fa-folder-open"></i> Choisir le fichier
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
           </label>
        </div>
      </div>
    </div>
  );
};

export default DataManager;
