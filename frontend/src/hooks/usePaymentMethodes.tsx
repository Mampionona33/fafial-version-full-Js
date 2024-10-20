import { useContext } from "react";
import { PaymentMethodesContext } from "../contexts/PaymentMethodesContext";

export const usePaymentMethodes = () => {
  const context = useContext(PaymentMethodesContext);
  if (!context) {
    throw new Error(
      "usePaymentMethodes must be used within an PaymentMethodesProvider"
    );
  }
  return context;
};
