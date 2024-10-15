# Gestion de Location de Salles de Réunion - Centre d'Accueil

Cette application est destinée à la gestion des salles de réunion dans un **centre d'accueil**. Elle permet aux gestionnaires, comptables et membres du personnel d'accueil de gérer les réservations, les finances, la communication interne et d'exporter des rapports financiers.

## Fonctionnalités

- **Gestion des réservations** : Les gestionnaires peuvent créer, modifier ou annuler des réservations pour les salles de réunion.
- **Suivi des revenus et des dépenses** : Suivi des revenus générés par la location des salles et des dépenses associées à chaque salle.
- **Export des journaux de caisse (Excel)** : Exportation des revenus et dépenses sous format **Excel** pour une période sélectionnée :
  - **Trimestriel** : Export du journal de caisse pour les trois derniers mois.
  - **Annuel** : Export du journal pour l'année entière.
  - **Période personnalisée** : Sélectionnez une plage de dates pour générer un rapport financier spécifique.
- **Système d'authentification avec rôles** : Authentification JWT avec gestion des rôles pour les gestionnaires de salles, comptables, et personnel d’accueil.
- **Tableau de bord** : Vue d'ensemble des salles disponibles, des réservations en cours, et des statistiques financières.
- **Système de chat interne** : Communication en temps réel entre les employés du centre d'accueil via un chat intégré.
- **Notifications en temps réel** : Alertes pour informer les utilisateurs des événements clés (réservations, modifications, messages).

## Stack technologique

- **Backend** : Node.js, Express, TypeScript
- **Frontend** : React, TypeScript
- **Base de données** : PostgreSQL ou MongoDB (selon les besoins)
- **ORM** : Prisma (pour une gestion efficace des bases de données relationnelles)
- **Authentification** : JWT (JSON Web Token)
- **Gestion des rôles** : Middleware pour la gestion des permissions basées sur les rôles.
- **WebSockets** : Pour le chat en temps réel et les notifications.
- **Génération de rapports Excel** : Utilisation de **ExcelJS** pour générer des rapports financiers au format Excel.
- **Environnement de développement** : Docker (optionnel)

## Prérequis

- Node.js (version 14.x ou plus récente)
- Yarn ou npm
- PostgreSQL (ou autre base de données compatible avec Prisma)
- Docker (optionnel)

## Installation

### Backend

1. Clonez le projet :

   ```bash
   git clone https://github.com/votre-utilisateur/centre-accueil-salles.git
   cd centre-accueil-salles/backend
   ```

2. Installez les dépendances du backend :

   ```bash
   npm install
   ```

3. Installez **Prisma** en tant que dépendance :

   ```bash
   npm install prisma @prisma/client
   ```

4. Configurez **Prisma** :

   - Créez un fichier `prisma/schema.prisma` et configurez votre base de données.
   - Exemple de fichier `schema.prisma` avec PostgreSQL :

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model User {
     id        Int      @id @default(autoincrement())
     email     String   @unique
     password  String
     role      String   // Gère les rôles : "gestionnaire", "comptable", "accueil"
   }

   model Room {
     id        Int      @id @default(autoincrement())
     name      String
     capacity  Int
     price     Float
   }

   model Booking {
     id        Int      @id @default(autoincrement())
     roomId    Int
     startDate DateTime
     endDate   DateTime
     user      User     @relation(fields: [userId], references: [id])
     userId    Int
   }

   model Transaction {
     id        Int      @id @default(autoincrement())
     type      String   // "revenu" ou "dépense"
     amount    Float
     roomId    Int
     createdAt DateTime @default(now())
   }
   ```

5. Configurez les variables d'environnement dans un fichier `.env` :

   ```bash
   touch .env
   ```

   Exemple de fichier `.env` :

   ```env
   PORT=5000
   DATABASE_URL=postgresql://user:password@localhost:5432/centre_accueil_salles
   JWT_SECRET=secret_pour_jwt
   ```

6. Exécutez les migrations Prisma pour créer les tables dans la base de données :

   ```bash
   npx prisma migrate dev --name init
   ```

7. Démarrez le serveur backend :
   ```bash
   npm run dev
   ```

### Frontend

1. Accédez au dossier `frontend` :

   ```bash
   cd ../frontend
   ```

2. Installez les dépendances du frontend :

   ```bash
   npm install
   ```

3. Démarrez l'application frontend :
   ```bash
   npm start
   ```

### Utilisation avec Docker (optionnel)

1. Assurez-vous d'avoir Docker installé.
2. Dans le répertoire racine du projet, exécutez la commande suivante pour démarrer à la fois le backend et le frontend dans des conteneurs :
   ```bash
   docker-compose up
   ```

## Fonctionnalités du Backend

- **Prisma ORM** : Gestion des bases de données relationnelles avec Prisma pour une meilleure abstraction et manipulation des données.
- **Authentification JWT** : Authentification des utilisateurs avec JWT et gestion des rôles.
- **Gestion des utilisateurs et rôles** : CRUD pour les utilisateurs et gestion des permissions en fonction de leur rôle (gestionnaire, comptable, personnel d’accueil).
- **Gestion des réservations** : CRUD complet pour les réservations des salles de réunion.
- **Suivi financier** : Suivi des revenus et dépenses associés à chaque salle.
- **Exportation des journaux de caisse (Excel)** : Export des revenus et dépenses sous forme de fichier Excel pour une période sélectionnée :
  - **Trimestriel**
  - **Annuel**
  - **Période personnalisée**
- **Système de chat interne** : Communication en temps réel via WebSockets entre les employés du centre d’accueil.
- **Notifications** : Envoi de notifications pour les événements importants liés aux réservations et à la gestion des salles.

### Points d'API disponibles

| Méthode | Endpoint                | Description                                       |
| ------- | ----------------------- | ------------------------------------------------- |
| POST    | `/api/auth/register`    | Enregistrement d'un nouvel utilisateur            |
| POST    | `/api/auth/login`       | Connexion et obtention d'un token JWT             |
| GET     | `/api/rooms`            | Récupérer toutes les salles de réunion            |
| POST    | `/api/rooms`            | Ajouter une nouvelle salle (Admin)                |
| GET     | `/api/rooms/:id`        | Récupérer une salle spécifique                    |
| PUT     | `/api/rooms/:id`        | Modifier une salle (Admin)                        |
| DELETE  | `/api/rooms/:id`        | Supprimer une salle (Admin)                       |
| GET     | `/api/bookings`         | Récupérer toutes les réservations                 |
| POST    | `/api/bookings`         | Créer une réservation                             |
| PUT     | `/api/bookings/:id`     | Modifier une réservation                          |
| DELETE  | `/api/bookings/:id`     | Supprimer une réservation                         |
| GET     | `/api/finance/revenue`  | Voir les revenus par salle (Comptable)            |
| GET     | `/api/finance/expenses` | Voir les dépenses par salle (Comptable)           |
| GET     | `/api/finance/export`   | Exporter les journaux de caisse sous format Excel |
| GET     | `/api/chat`             | Récupérer les messages du chat interne            |
| POST    | `/api/chat`             | Envoyer un message dans le chat interne           |
| GET     | `/api/notifications`    | Récupérer les notifications                       |
| POST    | `/api/notifications`    | Créer une notification manuelle                   |

## Fonctionnalités du Frontend

- **Tableau de bord des réservations** : Vue centralisée des salles disponibles et des réservations en cours.
- **Formulaire de réservation** : Permet aux gestionnaires de réserver une salle avec toutes les informations nécessaires (durée, participants, équipements).
- **Tableau de bord des finances** : Pour les comptables, vue des revenus générés par les salles et des dépenses associées.
- **Export des journaux de caisse** : Option d'export en Excel pour une période trimestrielle, annuelle ou personnalisée.
- **Chat en temps réel** : Système de messagerie pour faciliter la communication entre les employés.
- **Notifications en temps réel** : Alertes sur les événements comme les nouvelles réservations, les modifications ou les messages dans le chat.
