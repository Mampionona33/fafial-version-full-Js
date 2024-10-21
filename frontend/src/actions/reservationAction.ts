import { ReservationFormulaireInterface } from "../interfaces/ReservationInterface";

export const SET_RESERVATION = "SET_RESERVATION" as const;
export const RESET_RESERVATION = "RESET_RESERVATION" as const;

export const setReservation = (
  reservation: ReservationFormulaireInterface
) => ({
  type: SET_RESERVATION,
  payload: reservation,
});

export const resetReservation = () => ({
  type: RESET_RESERVATION,
});
