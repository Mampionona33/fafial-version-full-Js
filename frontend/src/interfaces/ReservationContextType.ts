import { ReservationInterface } from "./ReservationInterface";

export interface ReservationContextType {
  loading: boolean;
  error: string | null;
  reservations: ReservationInterface[];
  setReservations: React.Dispatch<React.SetStateAction<ReservationInterface[]>>;
}
