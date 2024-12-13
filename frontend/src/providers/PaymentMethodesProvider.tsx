import { ReactNode, useEffect, useState } from "react";
import { PaymentMethodesContext } from "../contexts/PaymentMethodesContext";
import { PaymentMethodInterface } from "../interfaces/PaymentMehtodeContextInterfaces";
import PaymentMethodesServices from "../services/PaymentMethodesServices";
import AuthServices from "../services/AuthServices";

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
  const accessToken = AuthServices.getTokenAccess();

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

    if (accessToken) {
      fetchPaymentMethodes();
    }
  }, [accessToken]);

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
