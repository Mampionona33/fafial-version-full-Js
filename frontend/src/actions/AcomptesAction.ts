import { Acompte } from "../interfaces/ReservationInterface";

export type AcomptesAction =
  | { type: "ADD_ACOMPTE"; payload: Acompte }
  | { type: "DELETE_ACOMPTE"; payload: string }
  | { type: "RESET_ACOMPTE" };

export const addAcompte = (acompte: Acompte) => ({
  type: "ADD_ACOMPTE" as const,
  payload: acompte,
});

export const deleteAcompte = (id: string) => ({
  type: "DELETE_ACOMPTE" as const,
  payload: id,
});

export const resetAcompte = () => ({
  type: "RESET_ACOMPTE" as const,
});
