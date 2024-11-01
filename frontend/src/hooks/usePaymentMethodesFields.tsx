import { useContext } from "react";
import { PaymentMethodesFieldsContext } from "../contexts/PaymentMethodesFieldsContext";

export const usePaymentMethodesFields = () => {
  const context = useContext(PaymentMethodesFieldsContext);
  if (!context) {
    throw new Error(
      "usePaymentMethodesFields must be used within a PaymentMethodesProvider"
    );
  }
  return context;
};
