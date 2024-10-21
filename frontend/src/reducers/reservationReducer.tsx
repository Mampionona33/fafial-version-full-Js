import {
  SET_RESERVATION,
  RESET_RESERVATION,
} from "../actions/reservationAction";
import {
  StatutReservation,
  UtilisateurType,
  ValidationStatut,
  PayementStatut,
  ReservationFormulaireInterface,
} from "../interfaces/ReservationInterface";

// Define state interface
  export interface ReservationState {
  reservation: ReservationFormulaireInterface;
}

// Initialize state with default values
export const initialState: ReservationState = {
  reservation: {
    id: "",
    reference: "",
    createdById: 0,
    nomOrganisation: "",
    nomPrenomContact: "",
    email: "",
    telephone: "",
    nombrePersonnes: 0,
    dateDebut: "",
    heureDebut: "",
    dateFin: "",
    heureFin: "",
    salleId: "",
    activite: "",
    remarques: "",
    statut: StatutReservation.OUVERT,
    validationStatus: ValidationStatut.VALIDE,
    utilisateurType: UtilisateurType.STAFF,
    acomptes: {
      id: "",
      statut: PayementStatut.EN_ATTENTE,
      montant: 0,
      datePrevue: "",
      modePaiement: "",
    },
    createdAt: "",
    updatedAt: "",
  },
};

type ReservationAction =
  | { type: typeof SET_RESERVATION; payload: ReservationFormulaireInterface }
  | { type: typeof RESET_RESERVATION };

const reservationReducer = (
  state = initialState,
  action: ReservationAction
): ReservationState => {
  switch (action.type) {
    case SET_RESERVATION:
      return { ...state, reservation: action.payload };
    case RESET_RESERVATION:
      return initialState;
    default:
      return state;
  }
};

export default reservationReducer;
