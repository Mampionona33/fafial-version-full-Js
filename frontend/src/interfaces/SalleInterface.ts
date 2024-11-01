import { ReservationInterface } from "./ReservationInterface";

export interface SalleInterface {
  id: string;
  name: string;
  capacite: number;
  montantLoyer: number;
  reservations?: ReservationInterface[];
  createdAt: Date;
  updatedAt?: Date;
}
