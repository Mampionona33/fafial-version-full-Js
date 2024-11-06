export interface TableAcompteProps {
  listeAcompte: Acompte[] | null;
}

export interface Acompte {
  id: string;
  montant: number;
  datePrevue: string; // ISO date string format
  modePaiement: string;
  reservationId: string;
  statut: "EN_ATTENTE" | "PAYÉ" | "ANNULÉ"; // Utilisez les statuts possibles
  createdAt: string; // ISO date string format
  updatedAt: string; // ISO date string format
}
