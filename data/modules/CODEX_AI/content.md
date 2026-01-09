# CODEX_AI : Bibliothèque de Prompts

## 📘 Le Grimoire Numérique

Bienvenue dans le **CODEX_AI**, votre arsenal de "sortilèges cognitifs". Ce module centralise les structures de prompts qui ont fait leurs preuves. Ne réinventez pas la roue à chaque requête.

> **Règle d'Or :** Un bon prompt est un prompt **modulaire**. Les textes entre crochets `[COMME CECI]` sont des variables que vous devez adapter à votre situation.

---

## 🏥 Domaine : Pratique Clinique

Ces prompts sont calibrés pour réduire le risque d'erreur et maximiser la clarté factuelle.

| Type de Prompt | Objectif | Moteur Conseillé |
| :--- | :--- | :--- |
| **Synthèse Patient** | Résumer un dossier complexe en 10 lignes. | Gemini Pro |
| **Interaction Med** | Vérifier les interactions cytochromes P450. | Mistral Large |
| **Traduction** | Traduire un compte-rendu en anglais technique. | DeepL / Claude |
| **Vulgarisation** | Expliquer une pathologie à un enfant de 10 ans. | ChatGPT-4o |

### 🧬 Exemple : Le "Prompt de Supervision"

Utilisez ce script pour vérifier vos propres diagnostics :

```text
Agis comme un Professeur de Médecine Interne senior et bienveillant.
Je vais te présenter un cas clinique et mon hypothèse diagnostique.
Ta mission :
1. Identifier les "Red Flags" que j'aurais pu manquer.
2. Proposer 3 diagnostics différentiels rares mais graves.
3. Critiquer ma prise en charge (sois sévère mais juste).
4. Lister les examens complémentaires indispensables selon les recos HAS.

Voici le cas : [INSÉRER LE CAS]
