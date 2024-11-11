import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AcompteService from "../../services/AcompteService";
import { Acompte } from "../../interfaces/AcompteInterface";
import { usePaymentMethodes } from "../../hooks/usePaymentMethodes";
import AppLabel from "../../components/AppLabel";
import AppSelect from "../../components/AppSelect";
import { usePaymentMethodesFields } from "../../hooks/usePaymentMethodesFields";
import AppInput from "../../components/AppInput";
import { PaymentMethodesFieldsInterface } from "../../interfaces/PaymentMethodesFieldsContextType";
import { format } from "date-fns";
import RecetteService from "../../services/RecetteService";
import { toast, ToastContainer } from "react-toastify";

const PageStafAjoutAcompte = () => {
  const { idAcompte } = useParams();
  const [reference, setReference] = React.useState<string>("");
  const [acompte, setAcompte] = useState<Acompte | null>(null);
  const { paymentMethodes } = usePaymentMethodes();
  const { fetchPaymentFields, paymentMethodesFields } =
    usePaymentMethodesFields();
  const [paymentMethodFields, setPaymentMethodFields] = useState<
    PaymentMethodesFieldsInterface[] | null
  >(null);
  const refForm = React.useRef(null);
  const navigate = useNavigate();

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldId: string
  ) => {
    const updatedFields = paymentMethodFields?.map((field) => {
      if (field.id === fieldId) {
        return { ...field, value: event.target.value };
      }
      return field;
    });

    console.log("Updated fields:", updatedFields);
    setPaymentMethodFields(updatedFields || []);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(paymentMethodFields);

    const formData = {
      ...acompte,
      acompte: {
        statut: "PAYE",
      },
      reference,
      personnePayeur: (event.target as HTMLFormElement).personnePayeur.value,
      contactPayeur: (event.target as HTMLFormElement).contactPayeur.value,
      paymentMethode: (event.target as HTMLFormElement).paymentMethode.value,
      date: format(new Date(), "yyyy-MM-dd"),
      montant: acompte?.montant,
      description: `Acompte pour la réservation ${
        acompte!.reservation.reference
      }`,
      // Ajoute les champs supplémentaires si nécessaire
      paymentFields: paymentMethodFields!.map((field) => {
        // Assertion de type ici
        const inputElement = (event.target as HTMLFormElement).elements[
          field.id as keyof HTMLFormElement["elements"]
        ] as HTMLInputElement | undefined;

        return {
          ...field,
          value: inputElement ? inputElement.value : "",
        };
      }),
    };

    console.log("Données de l'entrée ajoutée : ", formData);

    try {
      // créer recette
      const resp = await RecetteService.createRecette(formData);
      if (resp.status === 201) {
        toast.success(resp.data.message, {
          position: "bottom-right",
        });
      }
      if (acompte === null) {
        return;
      }
      const respAcompte = await AcompteService.updateAcompte({
        ...acompte,
        statut: "PAYE",
      });

      if (respAcompte.status === 200) {
        toast.success(respAcompte.data.message, {
          position: "bottom-right",
        });
      }
      if (resp.status === 201 && respAcompte.status === 200) {
        navigate("/staff/acompte");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "bottom-right",
        });
      }
    }
  };

  useEffect(() => {
    const fetchRecetteRef = async () => {
      try {
        const response = await RecetteService.getRecettesReferences();
        if (response.status === 200) {
          return response.data;
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (!idAcompte) return;
    fetchData(idAcompte).then((resp) => {
      const { acompte } = resp!.data;
      // console.log(acompte);
      setAcompte(acompte);
      if (paymentMethodFields === null && acompte.modePaiement) {
        fetchPaymentFields(acompte.modePaiement);
      }
    });
    if (paymentMethodesFields && paymentMethodesFields.length > 0) {
      setPaymentMethodFields(paymentMethodesFields);
    }
    if (reference === "") {
      fetchRecetteRef().then((resp) => {
        setReference(resp.reference);
      });
    }
  }, [
    idAcompte,
    reference,
    fetchPaymentFields,
    paymentMethodFields,
    paymentMethodesFields,
  ]);

  return (
    <div className="flex items-center justify-center p-10">
      <form
        ref={refForm}
        onSubmit={handleSubmit}
        className="bg-slate-50 p-10 text-sm text-slate-700 rounded-sm"
      >
        {acompte ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-center">Payer l'acompte</h1>
            <div className="flex gap-4 flex-col">
              <AppLabel htmlFor="reference">Reference</AppLabel>
              <AppInput
                type="text"
                name="reference"
                id="reference"
                value={reference}
                disabled
                required
              />
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

            <div className="flex gap-4 flex-col">
              <AppLabel htmlFor="personnePayeur">
                Nom et prenom du payeur
              </AppLabel>
              <AppInput
                type="text"
                name="personnePayeur"
                id="personnePayeur"
                required
              />
            </div>

            <div className="flex gap-4 flex-col">
              <AppLabel htmlFor="contactPayeur">
                Numéro telephone du payeur
              </AppLabel>
              <AppInput
                type="text"
                name="contactPayeur"
                id="contactPayeur"
                required
              />
            </div>

            <div>
              <AppLabel htmlFor="paymentMethode">Mode de paiement</AppLabel>
              <AppSelect
                options={paymentMethodes.map((method) => ({
                  value: method.id,
                  label: method.name,
                }))}
                defaultValue={acompte.modePaiement}
                name="paymentMethode"
                id="paymentMethode"
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
                      value={item.value as string}
                      onChange={(e) => handleInputChange(e, item.id as string)}
                    />
                  </div>
                );
              })}
            <div className="flex justify-center items-center">
              <input
                type="submit"
                value={"Valider le paiement"}
                className="bg-slate-800 text-slate-50 py-2 px-8 rounded-sm cursor-pointer hover:bg-slate-600"
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default PageStafAjoutAcompte;
