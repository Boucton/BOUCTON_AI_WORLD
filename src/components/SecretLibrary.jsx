import React, { useState, useEffect } from 'react';

const SecretLibrary = ({ xp }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const requiredXP = 500; // XP nécessaire pour débloquer

  useEffect(() => {
    setIsUnlocked(xp >= requiredXP);
  }, [xp]);

  if (!isUnlocked) return null;

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
      title: 'Mécanique Quantique pour Débutants',
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
      description: 'Les erreurs de raisonnement qui tuent (littéralement).',
      icon: 'fa-brain',
      color: 'from-red-600 to-orange-600',
      content: `# Biais Cognitifs à Connaître

## 1. Biais d'Ancrage
Donner trop de poids à la première information reçue.

**Exemple médical** : Patient avec douleur abdominale → Premier diagnostic "gastro" → On rate l'appendicite.

## 2. Biais de Confirmation
Chercher des preuves qui confirment notre hypothèse et ignorer le reste.

**Exemple** : "Je pense que c'est une grippe" → On ne demande pas d'exams qui pourraient montrer une pneumonie.

## 3. Biais de Disponibilité
Surestimer la probabilité d'événements récents/marquants.

**Exemple** : Après avoir vu 3 AVC en une semaine, on soupçonne un AVC chez chaque patient avec vertige.

**Solution** : Utiliser des checklist, des algorithmes, et... consulter une IA pour un 2e avis.`
    }
  ];

  return (
    <>
      {/* Bouton Déclencheur */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform animate-pulse"
        title="Bibliothèque Secrète Débloquée !"
      >
        <i className="fas fa-vault text-xl"></i>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade">
          <div className="bg-slate-900 border border-purple-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            
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
                  <h2 className="text-3xl font-black text-white mb-2">📚 Bibliothèque Cachée</h2>
                  <p className="text-purple-100 text-sm">
                    Débloquée avec {requiredXP} XP • Contenu exclusif
                  </p>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {secrets.map(secret => (
                  <div key={secret.id} className="group">
                    <div className={`bg-gradient-to-br ${secret.color} p-4 rounded-xl cursor-pointer hover:scale-105 transition-transform`}>
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                        <i className={`fas ${secret.icon} text-2xl text-white`}></i>
                      </div>
                      <h3 className="font-bold text-white mb-1">{secret.title}</h3>
                      <p className="text-xs text-white/80">{secret.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contenu détaillé */}
              {secrets.map(secret => (
                <details key={`detail-${secret.id}`} className="mb-4 bg-slate-950/50 rounded-xl border border-white/10 overflow-hidden">
                  <summary className="p-4 cursor-pointer hover:bg-slate-800 transition font-bold text-white flex items-center gap-2">
                    <i className={`fas ${secret.icon} text-purple-400`}></i>
                    {secret.title}
                  </summary>
                  <div className="p-6 prose prose-invert max-w-none">
                    <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                      {secret.content}
                    </div>
                  </div>
                </details>
              ))}

              {/* Footer */}
              <div className="mt-6 bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
                <i className="fas fa-trophy text-purple-400 text-2xl mb-2"></i>
                <p className="text-sm text-purple-300">
                  Continuez à accumuler de l'XP pour débloquer encore plus de contenu !
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
