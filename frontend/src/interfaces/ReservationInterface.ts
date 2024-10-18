export enum StatutReservation {
  VALIDE = "VALIDE",
  EN_ATTENTE = "EN_ATTENTE",
}

export enum UtilisateurType {
  STAFF = "STAFF",
  FRONT_DESK = "FRONT_DESK",
}

export interface Acompte {
  id: string;
  montant: number;
  datePrevue: string; // Format ISO
  modePaiement: string;
}

export interface ReservationInterface {
  id: string;
  reference: string;
  nomOrganisation: string;
  nomPrenomContact: string;
  email: string;
  telephone: string;
  nombrePersonnes: number;
  dateDebut: string; // Format ISO
  heureDebut: string; // Format ISO
  dateFin: string; // Format ISO
  heureFin: string; // Format ISO
  salleId: string;
  activite?: string;
  remarques?: string;
  statut: StatutReservation; // Utilisation de l'enum
  utilisateurType: UtilisateurType; // Utilisation de l'enum
  acomptes: Acompte[]; // Liste des acomptes
}
