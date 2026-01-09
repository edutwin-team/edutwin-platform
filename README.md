# EduTwin Platform

## 🚀 Description

EduTwin Platform est une application React + TypeScript pour le projet fil rouge « Jumeaux numériques d'élèves ».  
Elle utilise :  

- **React 18 + Vite** pour le front-end rapide et moderne  
- **TypeScript** pour la sécurité de typage  
- **DaisyUI + TailwindCSS** pour le design et les composants UI  
- **Vitest + React Testing Library** pour les tests unitaires  


## 📂 Structure du projet

EduTwin

│  ├─ api/          # fonctions pour appels API  
│  ├─ assets/       # images, icônes, logos  
│  ├─ components/   # composants réutilisables (Navbar, Button…)  
│  ├─ context/      # context API pour le state global  
│  ├─ hooks/        # hooks personnalisés  
│  ├─ layouts/      # layout généraux (ex. Navbar + Footer)  
│  ├─ pages/        # pages du site (Home.tsx, Quiz.tsx…)  
│  ├─ services/     # services externes / utils API  
│  ├─ styles/       # fichiers CSS globaux  
│  ├─ types/        # types TypeScript personnalisés  
│  ├─ utils/        # fonctions utilitaires  
│  ├─ App.tsx       # point d’entrée du routeur  
│  └─ main.tsx      # bootstrap React + TailwindCSS  
├─ tests/            # tests unitaires avec Vitest + React Testing Library  
├─ public/           # fichiers statiques  
├─ design/           # maquettes / assets design  
├─ docs/             # documentation du projet  
├─ tsconfig.*.json   # configurations TypeScript  
├─ vite.config.ts    # configuration Vite + Vitest + TailwindCSS  
├─ package.json      # dépendances et scripts  
└─ README.md  

## ⚡ Installation

1. Cloner le projet :  
```bash
git clone https://github.com/edutwin-team/edutwin-platform.git
cd edutwin-platform 
npm install
npm run dev
```
## ✅ Tests unitaires
```bash
npm run test
npm run test:watch
```
##  🧩 Scripts utiles
| Commande             | Description                                 |
| -------------------- | ------------------------------------------- |
| `npm run dev`        | Lance le serveur de développement Vite      |
| `npm run build`      | Compile le projet pour la production        |
| `npm run preview`    | Prévisualise la build production localement |
| `npm run test`       | Lance tous les tests Vitest                 |
| `npm run test:watch` | Lance les tests en mode watch               |


# 📘 Workflow Git pour le projet

## 1. Introduction

Ce document explique le **workflow Git recommandé** pour notre projet.  
Il est conçu pour :

- garder un historique clair et propre  
- éviter les conflits  
- faciliter la collaboration via GitHub et Jira  

---

## 2. Branches principales

### `main`
- Contient uniquement le code **stable**  
- **Jamais de commit direct**  
- Toute modification passe par une **Pull Request** (PR)

### `develop`
- Contient le code **en cours de développement**  
- Toutes les PR des features arrivent ici  
- Toujours mise à jour avant de commencer une nouvelle feature

### `feature/nom-fonction`
- Branches personnelles pour chaque fonctionnalité ou correction
-Ajputer le nom et numéro de ticket jira
- Exemple :  
```text
feature/login-EDT-10
feature/api-users-EDT-11
feature/dashboard-ui-EDT-12
```

## 3. Workflow quotidien
### 1️⃣ Mettre à jour develop avant de commencer
```
# Se placer sur develop
git checkout develop

# Récupérer les dernières modifications
git pull origin develop

# Créer sa branche feature
git checkout -b feature/ma-feature
```
### 2️⃣ Travailler sur la feature
```
# Ajouter les fichiers modifiés
git add .

# Commit avec message clair avec com et numéro de ticket jira
git commit -m "feat: ajouter formulaire de login EDT-15"

# Pousser la branche sur GitHub
git push -u origin feature/ma-feature
```

### 3️⃣ Ouvrir une Pull Request

Branche source → feature/ma-feature

Branche cible → develop

Titre PR clair et description détaillée qui sera le message de commit squashé

### 4️⃣ Mettre à jour sa branche si develop a avancé
Option Merge (simple) :
```
git checkout feature/ma-feature
git pull origin develop
git push
```

5️⃣ Merge de la PR

Squash and Merge par défaut

Chaque PR = 1 commit sur develop

Pas de merge commit ni de rebase direct sur develop

## 4. Fusion vers main (version stable)
Lorsque develop contient des features testées et stables, la fusion vers main doit se faire via une Pull Request selon les règles de protection :

Créer une Pull Request

Branche source : develop

Branche cible : main

Revue obligatoire

Au moins un reviewer doit approuver la Pull Request.

## 5. Conseils pour éviter les conflits

Toujours faire un pull de develop avant de créer une feature branch

Mettre à jour sa branche si develop avance pendant le développement

Faire des commits petits et clairs

Squash les commits avant le merge pour garder l’historique propre

## 8. Résumé visuel
```
main  ←── merge stable finalisé
  ↑
develop ←─ PR ← feature/a
         ← PR ← feature/b
         ← PR ← feature/c
         ← PR ← feature/d
         ← PR ← feature/e
         ← PR ← feature/f

✅ Workflow recommandé :

Feature branch → PR → develop → main

Squash and Merge pour garder un historique propre

Review obligatoire

Ne jamais push directement sur main ou develop
