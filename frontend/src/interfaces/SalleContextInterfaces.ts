import { SalleInterface } from "./SalleInterface";

export interface SalleContextType {
  salles: SalleInterface[];
  loading: boolean;
  error: string | null;
  setSalles: React.Dispatch<React.SetStateAction<SalleInterface[]>>;
}
