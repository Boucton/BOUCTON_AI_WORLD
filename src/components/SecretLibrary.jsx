import React, { useState, useEffect } from 'react';

const SecretLibrary = ({ xp, isOpen, onClose }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const requiredXP = 500;

  useEffect(() => {
    setIsUnlocked(xp >= requiredXP);
  }, [xp]);

  const secrets = [
    {
      id: 'valery_poems',
      title: 'Poèmes de Paul Valéry',
      description: 'Une sélection analysée par IA de "La Jeune Parque" et "Le Cimetière Marin".',
      icon: 'fa-book-open',
      color: 'from-purple-600 to-pink-600',
      content: `# Le Cimetière Marin (Extraits)

> "Ce toit tranquille, où marchent des colombes,
> Entre les pins palpite, entre les tombes..."

**Analyse IA** :
Ce poème de Paul Valéry (1920) explore la méditation face à la mer et à la mort. La structure en décasyllabes crée un rythme hypnotique.

**Thèmes clés** :
- Le temps qui passe (mer = métaphore)
- La conscience face au néant
- Le désir de permanence vs l'éphémère

**Prompt pour approfondir** :
"Analyse le symbolisme de la mer dans 'Le Cimetière Marin' de Paul Valéry. Compare avec 'L'Albatros' de Baudelaire."`
    },
    {
      id: 'quantum_physics',
      title: 'Mécanique Quantique Simplifiée',
      description: 'Principes de superposition et intrication expliqués simplement.',
      icon: 'fa-atom',
      color: 'from-cyan-600 to-blue-600',
      content: `# Physique Quantique : L'Essentiel

## Principe de Superposition

Une particule quantique peut être dans **plusieurs états simultanément** jusqu'à ce qu'on l'observe.

**Analogie** : Un chat dans une boîte peut être vivant ET mort à la fois (expérience de pensée de Schrödinger).

## Intrication Quantique

Deux particules "intriquées" restent connectées même à des années-lumière de distance. Mesurer l'une affecte instantanément l'autre.

**Citation d'Einstein** : "Action fantôme à distance" (il n'y croyait pas, il avait tort).

**Applications Modernes** :
- Ordinateurs quantiques (IBM, Google)
- Cryptographie quantique (inviolable)
- Téléportation quantique (de particules, pas d'humains... encore)`
    },
    {
      id: 'cognitive_biases',
      title: 'Biais Cognitifs en Médecine',
      description: 'Les erreurs de raisonnement qui peuvent être fatales.',
      icon: 'fa-brain',
      color: 'from-red-600 to-orange-600',
      content: `# Biais Cognitifs à Connaître

## 1. Biais d'Ancrage
Donner trop de poids à la première information reçue.

**Exemple médical** : Patient avec douleur abdominale → Premier diagnostic "gastro" → On rate l'appendicite.

## 2. Biais de Confirmation
Chercher des preuves qui confirment notre hypothèse et ignorer le reste.

**Exemple** : "Je pense que c'est une grippe" → On ne demande pas d'examens qui pourraient montrer une pneumonie.

## 3. Biais de Disponibilité
Surestimer la probabilité d'événements récents/marquants.

**Exemple** : Après avoir vu 3 AVC en une semaine, on soupçonne un AVC chez chaque patient avec vertige.

**Solution** : Utiliser des checklist, des algorithmes, et... consulter une IA pour un 2e avis.`
    }
  ];

  if (!isUnlocked) {
    return (
      <div className="fixed bottom-24 right-24 z-[55] bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 rounded-xl p-4 max-w-xs shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
            <i className="fas fa-lock text-white"></i>
          </div>
          <div>
            <div className="font-bold text-white text-sm mb-1">Bibliothèque Secrète</div>
            <div className="text-xs text-slate-400 mb-2">
              Débloquée à {requiredXP} XP
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-500"
                  style={{ width: `${Math.min((xp / requiredXP) * 100, 100)}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">{xp}/{requiredXP}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade">
          <div className="bg-slate-900 border border-purple-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl m-4">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{ 
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
              <div className="relative flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
                    <i className="fas fa-book-sparkles"></i>
                    Bibliothèque Cachée
                  </h2>
                  <p className="text-purple-100 text-sm">
                    Débloquée avec {requiredXP} XP • Contenu exclusif
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
              
              {/* Grille de cartes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {secrets.map(secret => (
                  <div key={secret.id} className="group">
                    <div className={`bg-gradient-to-br ${secret.color} p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-lg`}>
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                        <i className={`fas ${secret.icon} text-2xl text-white`}></i>
                      </div>
                      <h3 className="font-bold text-white mb-1 text-sm">{secret.title}</h3>
                      <p className="text-xs text-white/80 line-clamp-2">{secret.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contenu détaillé */}
              {secrets.map(secret => (
                <details key={`detail-${secret.id}`} className="mb-4 bg-slate-950/50 rounded-xl border border-white/10 overflow-hidden group">
                  <summary className="p-4 cursor-pointer hover:bg-slate-800 transition font-bold text-white flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${secret.color} flex items-center justify-center`}>
                      <i className={`fas ${secret.icon} text-sm text-white`}></i>
                    </div>
                    {secret.title}
                    <i className="fas fa-chevron-down text-xs text-slate-500 ml-auto group-open:rotate-180 transition-transform"></i>
                  </summary>
                  <div className="p-6 border-t border-white/10">
                    <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {secret.content}
                    </div>
                  </div>
                </details>
              ))}

              {/* Footer */}
              <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                <i className="fas fa-trophy text-purple-400 text-2xl mb-2"></i>
                <p className="text-sm text-purple-300 font-bold mb-1">
                  Félicitations pour avoir débloqué cette section !
                </p>
                <p className="text-xs text-slate-400">
                  Continuez à accumuler de l'XP pour débloquer encore plus de contenu exclusif.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SecretLibrary;
