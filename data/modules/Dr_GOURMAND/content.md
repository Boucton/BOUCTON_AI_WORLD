# 🏥 Dr_GOURMAND — Simulation médicale IA

---
title: "Dr GOURMAND - Simulateur Clinique"
description: "Plateforme de simulation médicale réaliste avec scénarios dynamiques, feedback structuré et intégration de contraintes aléatoires pour un apprentissage immersif."
icon: "fa-user-doctor"
color: "rose", "blue"
tags: ["médecine", "simulation", "interactif", "pédagogie"]
---

## 🎯 Objectifs Pédagogiques
1. **Apprentissage actif** : Mettre l’utilisateur en situation réelle de prise de décision.
2. **Gestion du stress** : Simuler des contraintes (temps, ressources, patients difficiles).
3. **Feedback structuré** : Analyser les erreurs et proposer des axes d’amélioration.

## 📋 Fonctionnalités Clés
| Fonctionnalité          | Description                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| **Scénarios dynamiques** | Génération de cas cliniques aléatoires avec diagnostics cachés.           |
| **Contraintes aléatoires** | Injection de paramètres imprévus (ex: pénurie de médicaments).          |
| **Débriefing détaillé**  | Analyse post-simulation avec score, erreurs et références bibliographiques. |
| **Intégration IA**      | Utilisation de Gemini/Mistral pour générer des réponses réalistes.         |

## 🚀 Comment Commencer ?
1. **Choisis un scénario** dans la liste des prompts.
2. **Remplis les paramètres** (spécialité, difficulté, âge du patient).
3. **Lance la simulation** et interagis en temps réel.
4. **Consulte le débriefing** pour progresser.

## ⚠️ Règles du Jeu
- **Pas de triche** : Le diagnostic est caché jusqu’à la fin.
- **Temps réel** : Chaque action a un coût temporel.
- **Réalisme** : Les réponses de l’IA sont basées sur des données médicales réelles.

---
### Exemple de Cas Clinique
**Patient** : Homme, 65 ans, douleurs thoraciques irradiant dans le bras gauche.
**Contexte** : Antécédents d’HTA et tabagisme actif (30 paquets-année).
**Déroulement** :
1. L’utilisateur demande un ECG → L’IA répond : *"ECG: sous-décalage de ST en DII, DIII, aVF. Temps écoulé: +5 min."*
2. L’utilisateur prescrit de l’aspirine → L’IA : *"Aspirine 250mg IV administrée. Douleur diminue (EVA 4/10). Temps: +2 min."*
3. **Diagnostic final** : Infarctus du myocarde inférieur. **Score: 18/20** (oubli de demander la troponine en urgence).

---
**Pour les autres modules** (`meta_ia/content.md`, `codex_ia/content.md`, etc.), ajoute une **section similaire** en haut du fichier avec :
- Un **bloc YAML** (entre `---`) pour les métadonnées.
- Une **description claire** des objectifs.
- Des **exemples concrets**.

---

## 📋 Vue d'ensemble

Dr_GOURMAND est un **cas d'usage complexe** qui démontre comment combiner plusieurs IA (Gemini, Mistral, NotebookLM) pour créer un simulateur médical éducatif, adaptif et tracé. 

### Objectif global

Créer un assistant IA capable de : 

✅ Simuler des consultations médicales pédagogiques  
✅ Adapter le niveau de difficulté selon l'utilisateur  
✅ Fournir du feedback immédiat et constructif  
✅ Tracer et archiver toutes les interactions  
✅ Évoluer selon les retours utilisateurs  

---

## 🎯 Concept détaillé

### Cas d'usage principal

Un **étudiant en médecine** doit pratiquer le diagnostic et la prise en charge de patients. Au lieu de se former sur de vrais patients (risqué éthiquement) ou sur des cas statiques (peu réaliste), il interagit avec Dr_GOURMAND, qui : 

1. **Joue le rôle du patient** avec historique, symptômes, personnalité
2. **Reçoit les questions** de l'étudiant
3. **Simule les réponses médicales** basées sur le scénario
4. **Évalue la qualité** du diagnostic proposé
5. **Fournit du feedback** personnalisé
6. **Accumule** les données pour améliorer le système

---

## 🏗️ Architecture conceptuelle

### Acteurs

| Acteur | Rôle |
|--------|------|
| **Étudiant** | Pose des questions, propose des diagnostics |
| **Dr_GOURMAND (IA)** | Incarne le patient, gère la simulation |
| **Évaluateur (IA)** | Critique la performance de l'étudiant |
| **Base de connaissances** | Fourni les cas médicaux valides |
| **Historique (Git)** | Archive les sessions pour analyse |

### Composants techniques (futurs)
