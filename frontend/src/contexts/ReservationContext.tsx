import { createContext } from "react";
import { ReservationContextType } from "../interfaces/ReservationContextType";

const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

export { ReservationContext };
