import { createContext } from "react";
import { PaymentMethodContextType } from "../interfaces/PaymentMehtodeContextInterfaces";

const PaymentMethodesContext = createContext<
  PaymentMethodContextType | undefined
>(undefined);

export { PaymentMethodesContext };
