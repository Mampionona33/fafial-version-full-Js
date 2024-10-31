import { useContext } from "react";
import { PaymentMethodesFieldsContext } from "../contexts/PaymentMethodesFieldsContext";

export const usePaymentMethodesFields = () => {
  const paymentFields = useContext(PaymentMethodesFieldsContext);
  if (!paymentFields) {
    throw new Error(
      "usePaymentMethodesFields must be used within an PaymentMethodesProvider"
    );
  }
  return { paymentFields };
};
