import { ReactNode, useEffect, useState } from "react";
import { PaymentMethodesContext } from "../contexts/PaymentMethodesContext";
import { PaymentMethodInterface } from "../interfaces/PaymentMehtodeContextInterfaces";
import PaymentMethodesServices from "../services/PaymentMethodesServices";

export const PaymentMethodesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [paymentMethodes, setPaymentMethodes] = useState<
    PaymentMethodInterface[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentMethodes = async () => {
      try {
        const response = await PaymentMethodesServices.getAll();
        if (response.status === 200) {
          setPaymentMethodes(response.data.paymentMethodes);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(
          "Une erreur est survenue lors de la recuperation des paymentMethodes"
        );
        throw error;
      }
    };
    fetchPaymentMethodes();
  }, []);

  return (
    <PaymentMethodesContext.Provider
      value={{
        paymentMethodes,
        loading,
        error,
        setPaymentMethodes,
      }}
    >
      {children}
    </PaymentMethodesContext.Provider>
  );
};
