export interface ReservationRequestBody {
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
  creationDate: string;
  createdById: number;
  acomptes: Array<{
    id: string;
    montant: number;
    datePrevue: string;
    modePaiement: string;
    statut: string;
  }>;
  activite: string;
  remarques: string;
  statut: string;
  utilisateurType: string;
  validationStatus: string;
}
