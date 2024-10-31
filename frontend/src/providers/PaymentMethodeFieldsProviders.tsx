// PaymentMethodeFieldsProviders.tsx
import React from "react";
import { PaymentMethodesFieldsContext } from "../contexts/PaymentMethodesFieldsContext";
import {
  PaymentMethodesFieldsContextType,
  PaymentMethodesFieldsInterface,
} from "../interfaces/PaymentMethodesFieldsContextType";

export const PaymentMethodeFieldsProviders: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [paymentMethodesFields, setPaymentMethodesFields] =
    React.useState<PaymentMethodesFieldsInterface | null>(null); // Initialisez avec null ou une valeur par défaut

  // Vérifiez que paymentMethodesFields n'est pas null avant de passer au contexte
  const contextValue: PaymentMethodesFieldsContextType = {
    paymentMethodes: paymentMethodesFields
      ? [paymentMethodesFields.paymentMethod]
      : [],
    loading: false,
    error: null,
    setPaymentMethodes: setPaymentMethodesFields,
  };

  return (
    <PaymentMethodesFieldsContext.Provider value={contextValue}>
      {children}
    </PaymentMethodesFieldsContext.Provider>
  );
};
