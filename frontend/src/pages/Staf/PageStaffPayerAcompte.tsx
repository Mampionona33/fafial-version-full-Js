import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AcompteService from "../../services/AcompteService";
import { Acompte } from "../../interfaces/AcompteInterface";
import { usePaymentMethodes } from "../../hooks/usePaymentMethodes";
import AppLabel from "../../components/AppLabel";
import AppSelect from "../../components/AppSelect";
import { usePaymentMethodesFields } from "../../hooks/usePaymentMethodesFields";
import AppInput from "../../components/AppInput";
import { PaymentMethodesFieldsInterface } from "../../interfaces/PaymentMethodesFieldsContextType";
import { format } from "date-fns";

const PageStafAjoutAcompte = () => {
  const { idAcompte } = useParams();
  const [acompte, setAcompte] = useState<Acompte | null>(null);
  const { paymentMethodes } = usePaymentMethodes();
  const { fetchPaymentFields, paymentMethodesFields } =
    usePaymentMethodesFields();
  const [paymentMethodFields, setPaymentMethodFields] = useState<
    PaymentMethodesFieldsInterface[] | null
  >(null);

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

  const onChangePaymentMethod = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPaymentMethod = event.target.value;
    if (selectedPaymentMethod) {
      fetchPaymentFields(selectedPaymentMethod);
    }
  };

  useEffect(() => {
    if (!idAcompte) return;
    fetchData(idAcompte).then((resp) => {
      const { acompte } = resp!.data;
      console.log(acompte);
      setAcompte(acompte);
      if (paymentMethodFields === null && acompte.modePaiement) {
        fetchPaymentFields(acompte.modePaiement);
      }
    });
    if (paymentMethodesFields && paymentMethodesFields.length > 0) {
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
      <div className="bg-slate-50 p-10 text-sm text-slate-700 rounded-sm">
        {acompte ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-center">Payer l'acompte</h1>
            <div className="flex gap-4">
              <p className="font-semibold text-gray-600">Reference:</p>
              <span className="text-gray-800">
                {acompte.reservation.reference}
              </span>
            </div>

            <div className="flex gap-4">
              <p className="font-semibold text-gray-600">
                Montant de l'acompte:
              </p>
              <span className="text-gray-800">{acompte.montant}</span>
            </div>

            <div className="flex gap-4">
              <p className="font-semibold text-gray-600">
                Date prévue de paiement:
              </p>
              <span>{format(acompte.datePrevue, "dd/MM/yyyy")}</span>
            </div>

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
                onChange={onChangePaymentMethod}
              />
            </div>
            {paymentMethodFields &&
              paymentMethodFields.length > 0 &&
              paymentMethodFields.map((item, index) => {
                return (
                  <div key={index}>
                    <AppLabel htmlFor={item.id as string}>
                      {item.label}
                    </AppLabel>
                    <AppInput
                      type="text"
                      name={item.fieldName}
                      id={item.id as string}
                      required={item.isRequired}
                    />
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
