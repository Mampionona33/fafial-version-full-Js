## **1. Pages pour le Super Admin / Admin**

Le Super Admin/Admin a accès aux pages de gestion des utilisateurs, des rôles et des paramètres de l'application.

### **Liste des pages** :

1. **Page de Connexion (Login)** :

   - URL : `/login`
   - Fonction : Permet à l'Admin de se connecter.

2. **Tableau de bord de gestion (Dashboard)** :
   - URL : `/admin/dashboard`
   - Fonction : Vue d'ensemble avec accès rapide aux différentes sections de gestion (utilisateurs, rôles, paramètres).
3. **Page de gestion des utilisateurs** :

   - URL : `/admin/users`
   - Fonction : Afficher la liste des utilisateurs, ajouter, modifier, et supprimer des utilisateurs.

4. **Page de création d'utilisateur** :
   - URL : `/admin/users/create`
   - Fonction : Formulaire pour créer un nouvel utilisateur et assigner un rôle.
5. **Page de modification d'utilisateur** :

   - URL : `/admin/users/edit/:id`
   - Fonction : Modifier les informations d'un utilisateur existant.

6. **Page de gestion des rôles et permissions** :

   - URL : `/admin/roles`
   - Fonction : Afficher, créer ou modifier les rôles (Responsable, Personnel d'accueil) et ajuster leurs permissions.

7. **Page de gestion des paramètres** :
   - URL : `/admin/settings`
   - Fonction : Paramétrer des aspects généraux du système (exportation, notifications, etc.).

---

## **2. Pages pour le Responsable**

Le Responsable a accès aux pages de gestion des recettes et dépenses, des réservations, ainsi qu'à l'exportation des journaux de caisse.

### **Liste des pages** :

1. **Page de Connexion (Login)** :

   - URL : `/login`
   - Fonction : Permet au Responsable de se connecter.

2. **Tableau de bord du Responsable** :

   - URL : `/responsable/dashboard`
   - Fonction : Vue d'ensemble avec accès rapide aux recettes/dépenses, réservations, et export.

3. **Page de gestion des recettes et dépenses** :

   - URL : `/responsable/transactions`
   - Fonction : Afficher la liste des transactions (recettes et dépenses), ajouter de nouvelles entrées.

4. **Page de création d'une recette ou dépense** :

   - URL : `/responsable/transactions/create`
   - Fonction : Formulaire pour ajouter une nouvelle recette ou dépense.

5. **Page de modification d'une recette ou dépense** :

   - URL : `/responsable/transactions/edit/:id`
   - Fonction : Modifier une recette ou dépense existante.

6. **Page de gestion des réservations** :

   - URL : `/responsable/reservations`
   - Fonction : Afficher la liste des réservations, ajouter, modifier ou supprimer des réservations.

7. **Page de création d'une réservation** :

   - URL : `/responsable/reservations/create`
   - Fonction : Formulaire pour ajouter une nouvelle réservation.

8. **Page de modification d'une réservation** :

   - URL : `/responsable/reservations/edit/:id`
   - Fonction : Modifier une réservation existante.

9. **Page d'exportation des journaux de caisse** :

   - URL : `/responsable/exports`
   - Fonction : Sélectionner la période et le format (CSV, Excel, PDF) pour exporter les recettes et dépenses.

10. **Page de visualisation des rapports (optionnel)** :
    - URL : `/responsable/reports`
    - Fonction : Générer et visualiser des rapports d'analyse des transactions et des réservations.

---

## **3. Pages pour le Personnel d'accueil**

Le Personnel d'accueil a des permissions limitées, uniquement centrées sur la gestion des réservations.

### **Liste des pages** :

1. **Page de Connexion (Login)** :

   - URL : `/login`
   - Fonction : Permet au Personnel d'accueil de se connecter.

2. **Tableau de bord simplifié** :

   - URL : `/accueil/dashboard`
   - Fonction : Vue d'ensemble avec accès uniquement à la gestion des réservations.

3. **Page de gestion des réservations** :

   - URL : `/accueil/reservations`
   - Fonction : Afficher la liste des réservations créées et en cours.

4. **Page de création d'une réservation** :
   - URL : `/accueil/reservations/create`
   - Fonction : Formulaire pour créer une nouvelle réservation.

---

## **Résumé des URLs par utilisateur**

| Utilisateur             | Pages principales et URLs                                                                                                                                                                                                                                                                                              |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Super Admin/Admin**   | - `/login` (Connexion) <br> - `/admin/dashboard` (Tableau de bord) <br> - `/admin/users` (Gestion des utilisateurs) <br> - `/admin/roles` (Rôles et permissions) <br> - `/admin/settings` (Paramètres)                                                                                                                 |
| **Responsable**         | - `/login` (Connexion) <br> - `/responsable/dashboard` (Tableau de bord) <br> - `/responsable/transactions` (Gestion des transactions) <br> - `/responsable/reservations` (Gestion des réservations) <br> - `/responsable/exports` (Export des journaux de caisse) <br> - `/responsable/reports` (Rapports financiers) |
| **Personnel d'accueil** | - `/login` (Connexion) <br> - `/accueil/dashboard` (Tableau de bord simplifié) <br> - `/accueil/reservations` (Gestion des réservations) <br> - `/accueil/reservations/create` (Créer une réservation)                                                                                                                 |

---

### **Considérations techniques :**

- **Gestion des autorisations** : L'accès aux pages doit être restreint en fonction du rôle de l'utilisateur, via un système de permissions basé sur l'authentification (ex : JWT).
- **Responsive Design** : Les interfaces devraient être optimisées pour différents formats (desktop, mobile, tablette).
- **Redirection** : Après la connexion, chaque utilisateur doit être redirigé vers son tableau de bord respectif (Admin, Responsable, Personnel d'accueil).
