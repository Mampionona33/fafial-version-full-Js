import { ReservationInterface } from "./ReservationInterface";

export interface ReservationContextType {
  error: string | null;
  reservations: ReservationInterface[];
  setReservations: React.Dispatch<React.SetStateAction<ReservationInterface[]>>;
}
