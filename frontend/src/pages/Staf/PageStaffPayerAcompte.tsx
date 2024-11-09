import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AcompteService from "../../services/AcompteService";
import { Acompte } from "../../interfaces/AcompteInterface";
import { usePaymentMethodes } from "../../hooks/usePaymentMethodes";
import AppLabel from "../../components/AppLabel";
import AppSelect from "../../components/AppSelect";
import { usePaymentMethodesFields } from "../../hooks/usePaymentMethodesFields";
import AppInput from "../../components/AppInput";

const PageStafAjoutAcompte = () => {
  const { idAcompte } = useParams();
  const [acompte, setAcompte] = useState<Acompte | null>(null);
  const { paymentMethodes } = usePaymentMethodes();
  const { fetchPaymentFields, paymentMethodesFields } =
    usePaymentMethodesFields();
  const [paymentMethodFields, setPaymentMethodFields] = useState<any[] | null>(
    null
  );

  const fetchData = async (idAcompte: string) => {
    try {
      const resp = await AcompteService.getById(idAcompte);
      if (resp.status === 404) {
        throw new Error("Acompte not found");
      }
      return resp;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  };

  useEffect(() => {
    if (!idAcompte) return;
    fetchData(idAcompte).then((resp) => {
      const { acompte } = resp!.data;
      // console.log(acompte);
      setAcompte(acompte);
      if (paymentMethodFields === null && acompte.modePaiement) {
        // console.log(acompte.modePaiement);
        fetchPaymentFields(acompte.modePaiement);
      }
    });
    if (paymentMethodesFields && paymentMethodesFields.length > 0) {
      console.log(paymentMethodesFields);
      setPaymentMethodFields(paymentMethodesFields);
    }
  }, [
    idAcompte,
    fetchPaymentFields,
    paymentMethodFields,
    paymentMethodesFields,
  ]);

  return (
    <div className="flex items-center justify-center p-10">
      <div className="bg-slate-50 p-10 text-sm text-slate-700">
        {acompte ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold ">Payer l'acompte</h1>
            <p className="">Reference: {acompte.reservation.reference}</p>
            <p className="">Montant de l'acompte: {acompte.montant}</p>
            <div>
              <AppLabel htmlFor="payment">Mode de paiement</AppLabel>
              <AppSelect
                options={paymentMethodes.map((method) => ({
                  value: method.id,
                  label: method.name,
                }))}
                defaultValue={acompte.modePaiement}
                name="payment"
                id="payment"
              />
            </div>
            {paymentMethodFields &&
              paymentMethodFields.length > 0 &&
              paymentMethodFields.map((item, index) => {
                return (
                  <div key={index}>
                    <AppLabel htmlFor={item.id}>{item.label}</AppLabel>
                    <AppInput type="text" name={item.name} id={item.id} />
                  </div>
                );
              })}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default PageStafAjoutAcompte;
