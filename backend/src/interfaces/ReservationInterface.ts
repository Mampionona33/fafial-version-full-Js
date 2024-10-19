// Enums pour les statuts et types d'utilisateurs
export enum StatutReservation {
  OUVERT = "OUVERT",
  ANNULE = "ANNULE",
}

export enum ValidationStatut {
  EN_ATTENTE = "EN_ATTENTE",
  VALIDE = "VALIDE",
  REFUSE = "REFUSE",
}

export enum UtilisateurType {
  STAFF = "STAFF",
  FRONT_DESK = "FRONT_DESK",
}

export enum PayementStatut {
  EN_ATTENTE = "EN_ATTENTE",
  PAYE = "PAYE",
}

// Interface pour Acompte
export interface Acompte {
  id: string;
  montant: number;
  datePrevue: string; // Format ISO
  modePaiement: string;
  statut: PayementStatut; // Utilisation de l'enum PayementStatut
  createdAt?: string; // Format ISO
  updatedAt?: string; // Format ISO
}

// Interface pour les Permissions
export interface Permission {
  id: number;
  action: string; // "read", "create", "update", "delete"
  resource: string; // Resource name, e.g., "Salle", "Recette"
  roleId: number;
  createdAt?: string; // Format ISO
  updatedAt?: string; // Format ISO
  status: boolean; // Actif ou non
}

// Interface pour les Rôles
export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
  users: User[];
  createdAt?: string; // Format ISO
  updatedAt?: string; // Format ISO
  status: boolean; // Actif ou non
}

// Interface pour les Utilisateurs
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  lastName: string;
  roles: Role[];
  createdAt?: string; // Format ISO
  updatedAt?: string; // Format ISO
  status: boolean; // Actif ou non
}

// Interface pour Salle
export interface Salle {
  id: string;
  nom: string;
  capacite: number;
  montantLoyer: number;
  reservations: ReservationInterface[]; // Liste des réservations associées
  createdAt?: string; // Format ISO
  updatedAt?: string; // Format ISO
}

// Interface pour Reservation
export interface ReservationInterface {
  id: string;
  reference: string;
  nomOrganisation: string;
  nomPrenomContact: string;
  email: string;
  telephone: string;
  nombrePersonnes: number;
  dateDebut: Date; // Format ISO
  heureDebut: string; // Format ISO
  dateFin: Date; // Format ISO
  heureFin: string; // Format ISO
  salleId: string; // Relation avec Salle
  activite?: string;
  remarques?: string;
  statut: StatutReservation; // Utilisation de l'enum StatutReservation
  validationStatus: ValidationStatut; // Utilisation de l'enum ValidationStatut
  utilisateurType: UtilisateurType; // Utilisation de l'enum UtilisateurType
  acomptes: Acompte[]; // Liste des acomptes
  createdAt?: string; // Format ISO
  updatedAt?: string; // Format ISO
}

// Interface pour Recette
export interface Recette {
  id: string;
  montant: number;
  description?: string;
  personnePayeur: string;
  moyenPaiement: string;
  date: string; // Format ISO
  createdAt?: string; // Format ISO
  updatedAt?: string; // Format ISO
}

// Interface pour Depense
export interface Depense {
  id: string;
  montant: number;
  description?: string;
  personneRecepteur: string;
  moyenPaiement: string;
  justification?: string;
  date: string; // Format ISO
  createdAt?: string; // Format ISO
  updatedAt?: string; // Format ISO
}
