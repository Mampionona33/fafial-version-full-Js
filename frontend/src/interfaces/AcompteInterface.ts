export interface Acompte {
  id: string;
  createdAt: string;
  datePrevue: string;
  modePaiement: string;
  montant: number;
  reservationId: string;
  statut: string;
  updatedAt?: string;
  reservation: AcompteReservation;
}

export interface AcompteReservation {
  id: string;
  reference: string;
  nomOrganisation: string;
  nomPrenomContact: string;
  email: string;
  telephone: string;
  nombrePersonnes: number;
  dateDebut: string;
  heureDebut: string;
  dateFin: string;
  heureFin: string;
  salleId: string;
  activite: string;
  remarques: string;
  statut: string;
  validationStatus: string;
  utilisateurType: string;
  createdById: number;
  updatedById?: string;
  createdAt?: string;
  updatedAt?: string;
}
