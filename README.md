# Helpdesk System

## Description

Le **Helpdesk System** est une application web conçue pour gérer les demandes de support technique dans une entreprise. Elle permet aux utilisateurs (salariés) de créer des tickets pour signaler des problèmes techniques, d’interagir avec les techniciens via un chat intégré, et de recevoir une assistance à distance. L'application intègre un système d'authentification pour sécuriser l'accès.

## Fonctionnalités

- **Création et gestion des tickets** : Les utilisateurs peuvent créer des tickets pour signaler un problème. Chaque ticket contient une description du problème et son statut (ouvert, en cours, résolu).
- **Chat intégré** : Une fonctionnalité de chat en temps réel permet aux utilisateurs d'échanger des messages avec les techniciens pour suivre l'évolution des tickets et obtenir une assistance rapide.
- **Intervention à distance** : Les techniciens peuvent proposer des interventions à distance pour résoudre les problèmes en prenant la main sur l'ordinateur de l'utilisateur (via intégration de VNC ou d'autres technologies de bureau à distance).
- **Système d'authentification** : Les utilisateurs et techniciens doivent s'authentifier pour accéder à l'application. Les sessions utilisateur sont sécurisées par JWT (JSON Web Token).

- **Gestion des rôles** : Les utilisateurs sont classés en deux catégories : "Salarié" et "Technicien", avec des permissions spécifiques pour chacun (ex. création de tickets pour les utilisateurs, gestion et résolution des tickets pour les techniciens).

## Stack Technologique

- **Frontend** :
  - **React** (JavaScript/TypeScript)
  - **Material UI** (ou un autre framework UI pour la gestion de l'interface utilisateur)
- **Backend** :
  - **Node.js avec TypeScript**
  - **Express** pour le routing et la gestion des API REST
  - **WebSockets** (via `Socket.IO`) pour la gestion du chat en temps réel entre l'utilisateur et le technicien
- **Base de données** :

  - **SQLite** : une base de données légère et simple à utiliser pour stocker les utilisateurs, tickets, messages de chat, et autres données.

- **Authentification** :
  - **JWT (JSON Web Token)** pour l'authentification sécurisée et la gestion des sessions.

## Prérequis

Avant de démarrer, assurez-vous d’avoir les éléments suivants installés :

- **Node.js** (version 14 ou supérieure)
- **npm** ou **yarn** pour la gestion des dépendances
- **SQLite** (vous pouvez utiliser un fichier SQLite, donc pas besoin de serveur de base de données supplémentaire)

## Installation

### Backend (Node.js)

1. Clonez le projet :

   ```bash
   git clone https://github.com/votre-repo/helpdesk-system.git
   cd helpdesk-system/backend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez les variables d’environnement (fichier `.env`) :

   ```bash
   cp .env.example .env
   ```

   Remplissez le fichier `.env` avec vos configurations, notamment le secret JWT.

4. Initialisez la base de données SQLite et exécutez les migrations :

   ```bash
   npx prisma migrate dev
   ```

5. Démarrez le serveur :

   ```bash
   npm run dev
   ```

   Le serveur backend sera accessible à l’adresse `http://localhost:5000`.

### Frontend (React)

1. Accédez au répertoire frontend :

   ```bash
   cd ../frontend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Lancez le serveur de développement React :

   ```bash
   npm start
   ```

   L'application sera accessible à `http://localhost:3000`.

## Fonctionnement de l'Application

### Authentification

- Les utilisateurs (salariés et techniciens) doivent se connecter avec leur email et mot de passe.
- Après la connexion, un token JWT est généré pour authentifier les utilisateurs lors de leurs actions.

### Création de tickets

- Les utilisateurs peuvent créer des tickets en décrivant leur problème via un formulaire.
- Les techniciens peuvent voir tous les tickets en attente, en assigner un à eux-mêmes, et mettre à jour le statut du ticket (ouvert, en cours, résolu).

### Chat

- Une fois un ticket créé, l'utilisateur peut discuter en temps réel avec un technicien via un chat intégré.
- Le chat est géré via WebSockets pour permettre une communication fluide entre l'utilisateur et le technicien.

### Intervention à distance

- Les techniciens peuvent, si nécessaire, offrir une assistance à distance à l'utilisateur via un outil d'intervention à distance (ex. noVNC).

## Scripts

### Backend

- **`npm run dev`** : Lance le serveur de développement
- **`npm run build`** : Compile le code TypeScript en JavaScript
- **`npm run start`** : Démarre le serveur avec le code compilé

### Frontend

- **`npm start`** : Démarre le serveur de développement React
- **`npm run build`** : Construit l'application pour la production

## Structure du projet

```
helpdesk-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   ├── prisma/
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── ...
```
