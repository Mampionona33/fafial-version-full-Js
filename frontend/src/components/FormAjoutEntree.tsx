import React, { useState, useEffect } from "react";
import { usePaymentMethodes } from "../hooks/usePaymentMethodes";
import SelectOptionAdapter from "../utils/SelectOptionAdapter";
import AppLabel from "./AppLabel";
import AppSelect from "./AppSelect";
import AppInput from "./AppInput";
import { usePaymentMethodesFields } from "../hooks/usePaymentMethodesFields";
import PaymentMethodesFieldsService from "../services/PaymentMethodesFieldsService";

const FormAjoutEntree = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { paymentFields } = usePaymentMethodesFields();

  const [methodePaiementOptions, setMethodePaiementOptions] = useState<
    { label: string; value: string }[] | []
  >([]);
  const { paymentMethodes } = usePaymentMethodes();

  // console.log(paymentFields);

  useEffect(() => {
    if (paymentMethodes && paymentMethodes.length > 0) {
      console.log(paymentMethodes);

      const paymentMethodesOptions = SelectOptionAdapter.adapt(
        paymentMethodes
      ) as { label: string; value: string }[];
      setMethodePaiementOptions(paymentMethodesOptions);
    }
  }, [paymentMethodes]);

  const handlePaymentMethodeChange = async (id: string) => {
    try {
      const resp =
        await PaymentMethodesFieldsService.getFiledByPaymentsMethodesId(id);

      if (resp.status === 200) {
        console.log(resp.data);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Données de l'entrée ajoutée :");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Ajout d'une Entrée
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <AppLabel htmlFor="date">Date</AppLabel>
          <AppInput
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <AppLabel htmlFor="methodePaiement">Méthode de paiement</AppLabel>
          <AppSelect
            id="methodePaiement"
            name="methodePaiement"
            options={methodePaiementOptions}
            onChange={(e) => handlePaymentMethodeChange(e)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Ajouter l'Entrée
        </button>
      </form>
    </div>
  );
};

export default FormAjoutEntree;
