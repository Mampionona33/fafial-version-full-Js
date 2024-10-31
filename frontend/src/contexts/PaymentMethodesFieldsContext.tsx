import React from "react";
import { PaymentMethodesFieldsContextType } from "../interfaces/PaymentMethodesFieldsContextType";

const PaymentMethodesFieldsContext = React.createContext<
  PaymentMethodesFieldsContextType | undefined
>(undefined);

export { PaymentMethodesFieldsContext };
