import { createContext } from "react";
import { SalleContextType } from "../interfaces/SalleContextInterfaces";

const SalleContext = createContext<SalleContextType | undefined>(undefined);

export { SalleContext };
