# **Workflow Global du Système**

### **1. Super Admin / Admin (Gestion des utilisateurs et des autorisations)**

#### **Tâches principales** :

- Création et gestion des utilisateurs.
- Assignation des rôles et autorisations (Responsable, Personnel d'accueil).
- Gestion des paramètres généraux de l’application.

#### **Étapes du workflow** :

1. **Connexion** :
   - Le Super Admin se connecte à l'application via une page d'authentification sécurisée.
   - Saisie des identifiants (email, mot de passe).
2. **Tableau de bord de gestion** :
   - Une fois connecté, l'interface principale présente un tableau de bord avec des options de gestion : **Utilisateurs**, **Rôles et permissions**, **Paramètres de l'application**.
3. **Création d’un utilisateur** :
   - **Accès à la gestion des utilisateurs** : Le Super Admin clique sur « Gestion des utilisateurs ».
   - **Formulaire de création** : Il remplit un formulaire avec les informations de l'utilisateur (nom, email, rôle, etc.).
   - **Assignation du rôle** : Choix entre les rôles disponibles (Responsable, Personnel d'accueil).
4. **Assignation des permissions** :
   - En fonction du rôle, le Super Admin attribue des permissions spécifiques :
     - **Responsable** : Accès aux recettes/dépenses, gestion des réservations, exportation des journaux de caisse.
     - **Personnel d'accueil** : Accès limité aux réservations.
5. **Validation et sauvegarde** :

   - Le Super Admin sauvegarde les nouveaux utilisateurs.
   - Un email d'activation est envoyé à l'utilisateur pour confirmer la création du compte.

6. **Gestion des paramètres** :
   - Le Super Admin peut accéder à la section « Paramètres » pour gérer d'autres aspects de l'application (configuration de l'exportation, gestion des devises, etc.).

#### **Exemple d'écran** :

- **Tableau de bord** avec sections « Gestion des utilisateurs », « Gestion des rôles », « Paramètres ».
- **Formulaire de création d'utilisateur** avec un menu déroulant pour choisir le rôle et attribuer des permissions.

---

### **2. Responsable (Gestion des recettes/dépenses, réservations, exportation des journaux de caisse)**

#### **Tâches principales** :

- Saisie des recettes et dépenses.
- Gestion complète des réservations (CRUD).
- Exportation des journaux de caisse (CSV, Excel, PDF).

#### **Étapes du workflow** :

1. **Connexion** :

   - Le Responsable se connecte à l'application avec son email et son mot de passe.

2. **Tableau de bord du Responsable** :

   - Une fois connecté, il accède à un tableau de bord personnalisé avec des options pour gérer les **recettes et dépenses**, **réservations**, et **exporter les journaux de caisse**.

3. **Gestion des recettes/dépenses** :
   - **Accès à la section recettes/dépenses** : Le Responsable peut saisir les recettes (revenus, paiements) et les dépenses (achats, factures).
   - **Formulaire de saisie** : Il ajoute une nouvelle entrée avec des détails comme le montant, la catégorie (recette/dépense), la description, et la date.
4. **Suivi des recettes/dépenses** :

   - **Liste des transactions** : Le Responsable peut visualiser les recettes et dépenses enregistrées.
   - **Modification/annulation** : Il peut modifier ou annuler des transactions si nécessaire.

5. **Gestion des réservations** :

   - **Accès à la section réservations** : Le Responsable peut gérer les réservations (ajout, modification, suppression).
   - **Formulaire de réservation** : Il crée ou modifie une réservation en fonction des demandes des clients.
   - **Visualisation** : Il peut voir un tableau des réservations en cours, passées et futures.

6. **Exportation des journaux de caisse** :

   - **Accès à la section Export** : Le Responsable peut exporter les journaux de caisse pour une période donnée (par exemple, hebdomadaire, mensuelle).
   - **Sélection de la période** : Il choisit une plage de dates (ex : du 1er au 31 janvier).
   - **Choix du format** : Le Responsable choisit le format d’exportation (CSV, Excel, PDF).
   - **Génération et téléchargement** : Après avoir choisi la période et le format, il génère le fichier et le télécharge pour l'utiliser dans ses rapports financiers ou l'envoyer à l'équipe comptable.

7. **Rapports et suivi** :
   - Le Responsable peut générer des rapports d’analyse des recettes/dépenses et des réservations sous forme de graphiques, pour une gestion optimale.

#### **Exemple d'écran** :

- **Tableau de bord** avec trois sections principales : « Gestion des recettes/dépenses », « Gestion des réservations », « Exportation des journaux de caisse ».
- **Formulaire de création de recettes/dépenses** avec champs comme le montant, type, et catégorie.
- **Formulaire de réservation** avec champs pour le client, la date, le service, etc.
- **Section d'export** avec une interface pour choisir la période, le format, et télécharger le fichier.

---

### **3. Personnel d'accueil (Saisie des réservations)**

#### **Tâches principales** :

- Saisie des réservations des clients.

#### **Étapes du workflow** :

1. **Connexion** :

   - Le Personnel d'accueil se connecte via un identifiant et un mot de passe.

2. **Tableau de bord simplifié** :

   - Le Personnel d'accueil accède à une interface simple, qui lui permet uniquement de **saisir des réservations**.

3. **Saisie des réservations** :

   - **Formulaire de réservation** : Le Personnel entre les informations nécessaires comme le nom du client, la date, le type de service, la durée, et tout autre détail pertinent.
   - **Validation** : Une fois la réservation ajoutée, elle est confirmée et ajoutée à la liste des réservations.

4. **Visualisation des réservations** :
   - Le Personnel peut voir la liste des réservations actuelles, mais ne peut ni modifier ni supprimer les réservations existantes.

#### **Exemple d'écran** :

- **Page de saisie de réservation** avec un formulaire simple pour ajouter les détails de la réservation.
- **Tableau des réservations** pour visualiser les entrées, mais sans options de modification.

---

## **Résumé des droits et actions des utilisateurs** :

| Rôle                    | Droits d'accès et actions possibles                                                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Super Admin/Admin**   | Gestion des utilisateurs (CRUD), gestion des rôles et permissions, gestion des paramètres généraux                                                             |
| **Responsable**         | Gestion des recettes/dépenses (CRUD), gestion des réservations (CRUD), exportation des journaux de caisse (CSV, Excel, PDF), génération de rapports financiers |
| **Personnel d'accueil** | Saisie des réservations uniquement, visualisation des réservations                                                                                             |

---

### **Technologies suggérées** :

- **Frontend** :

  - **React.js / Vue.js** pour l'interface utilisateur réactive.
  - **Redux / Vuex** pour la gestion de l'état.
  - **Formulaires dynamiques** pour la saisie des données (recettes, dépenses, réservations).
  - **jsPDF** et **SheetJS** pour la génération des rapports PDF et Excel.

- **Backend** :
  - **Node.js / Django / Laravel** pour la gestion des API.
  - **JWT** pour l’authentification sécurisée et la gestion des rôles.
