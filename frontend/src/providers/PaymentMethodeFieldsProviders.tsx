import React, { useState } from "react";
import { PaymentMethodesFieldsContext } from "../contexts/PaymentMethodesFieldsContext";
import {
  PaymentMethodesFieldsContextType,
  PaymentMethodesFieldsInterface,
} from "../interfaces/PaymentMethodesFieldsContextType";
import PaymentMethodesFieldsService from "../services/PaymentMethodesFieldsService";
import { useLoading } from "../hooks/useLoading";

export const PaymentMethodeFieldsProviders: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [paymentMethodesFields, setPaymentMethodesFields] = useState<
    PaymentMethodesFieldsInterface[]
  >([]);

  const { loading, setLoading } = useLoading();
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentFields = async (id: string) => {
    setLoading(true);
    try {
      const response =
        await PaymentMethodesFieldsService.getFiledByPaymentsMethodesId(id);
      if (
        response.status === 200 &&
        Array.isArray(response.data.paymentFields)
      ) {
        setPaymentMethodesFields(response.data.paymentFields);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error(
        "Erreur lors du chargement des champs de méthode de paiement :",
        error
      );
      setError("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  const contextValue: PaymentMethodesFieldsContextType = {
    paymentMethodesFields: paymentMethodesFields,
    loading,
    error,
    setPaymentMethodes: setPaymentMethodesFields,
    fetchPaymentFields,
  };

  return (
    <PaymentMethodesFieldsContext.Provider value={contextValue}>
      {children}
    </PaymentMethodesFieldsContext.Provider>
  );
};
