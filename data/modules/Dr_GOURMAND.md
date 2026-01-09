# 🏥 Dr_GOURMAND — Simulation médicale IA

**Un projet de simulation médicale intelligente et apprenante.**

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
