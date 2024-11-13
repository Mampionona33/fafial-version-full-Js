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
import PaymentMethodesFieldsService from "../../services/PaymentMethodesFieldsService";
import { useLoading } from "../../hooks/useLoading";

const PageStafAjoutAcompte = () => {
  const { idAcompte } = useParams();
  const [reference, setReference] = React.useState<string>("");
  const [acompte, setAcompte] = useState<Acompte | null>(null);
  const { paymentMethodes  } = usePaymentMethodes();
  const { paymentMethodesFields } = usePaymentMethodesFields();
  const [paymentMethodFields, setPaymentMethodFields] = useState<
    PaymentMethodesFieldsInterface[] | null
  >(null);
  const refForm = React.useRef(null);
  const navigate = useNavigate();
  const { loading, setLoading } = useLoading();

  const onChangePaymentMethod = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPaymentMethod = event.target.value;
    console.log(selectedPaymentMethod);

    if (selectedPaymentMethod) {
      try {
        setLoading(true);

        const [respPaymentMethodeFields] = await Promise.all([
          PaymentMethodesFieldsService.getFiledByPaymentsMethodsId(
            selectedPaymentMethod
          ),
        ]);

        if (respPaymentMethodeFields.status === 200) {
          // Extraction sécurisée des données pour éviter les erreurs d'accès
          const dataPaymentMethode = respPaymentMethodeFields.data;

          if (dataPaymentMethode && dataPaymentMethode.paymentFields) {
            setPaymentMethodFields(dataPaymentMethode.paymentFields);

            // Mettre à jour l'acompte avec la méthode de paiement sélectionnée
            setAcompte((prevAcompte) => {
              if (prevAcompte) {
                return {
                  ...prevAcompte,
                  modePaiement: selectedPaymentMethod, // Mettez à jour modePaiement
                };
              }
              return prevAcompte;
            });
          } else {
            toast.error(
              "Les champs de la méthode de paiement ne sont pas disponibles."
            );
          }
        } else {
          toast.error(
            "Erreur lors de la récupération des données de la méthode de paiement."
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Erreur : ${error.message}`);
        } else {
          toast.error("Une erreur inattendue est survenue.");
        }
      } finally {
        setLoading(false);
      }
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
      statut: "PAYE",
      reference,
      acompteId: acompte?.id,
      personnePayeur: (event.target as HTMLFormElement).personnePayeur.value,
      contactPayeur: (event.target as HTMLFormElement).contactPayeur.value,
      paymentMethode: (event.target as HTMLFormElement).paymentMethode.value,
      date: format(new Date(), "yyyy-MM-dd"),
      montant: acompte?.montant,
      description: `Acompte pour la réservation ${
        acompte!.reservation.reference
      }`,
      paymentFields: paymentMethodFields!.map((field) => {
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
      if (acompte === null) {
        return;
      }

      await Promise.all([
        RecetteService.createRecette(formData),
        AcompteService.updateAcompte({
          ...acompte,
          statut: "PAYE",
        }),
      ]);

      // Afficher un message de succès ou effectuer d'autres actions nécessaires
      toast.success("Acompte payé", {
        position: "bottom-right",
        toastId: "success-acompte",
      });
      navigate("/staf/acomptes/details/" + idAcompte);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, {
          position: "bottom-right",
        });
      }
    }
  };

  useEffect(() => {
    const fetchPaymentFieldsIfNeeded = async (modePaiement: string) => {
      // Only fetch if paymentMethodFields are not set and paymentMethodesFields is empty
      if (paymentMethodFields === null && paymentMethodesFields.length === 0) {
        try {
          setLoading(true);
          const response =
            await PaymentMethodesFieldsService.getFiledByPaymentsMethodsId(
              modePaiement
            );
          if (response.status === 200) {
            setPaymentMethodFields(response.data.paymentFields);
          }
        } catch (error) {
          console.error("Error fetching payment method fields:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        const [refResponse, acompteResponse] = await Promise.all([
          reference.length === 0
            ? RecetteService.getRecettesReferences()
            : null,
          idAcompte ? AcompteService.getById(idAcompte) : null,
        ]);

        // Set reference and acompte if both responses are successful
        if (refResponse?.status === 200) {
          setReference(refResponse.data.reference);
        }
        if (acompteResponse?.status === 200) {
          const acompteData = acompteResponse.data.acompte;
          setAcompte(acompteData);

          // Fetch payment fields if modePaiement exists in acompte data
          if (acompteData.modePaiement) {
            fetchPaymentFieldsIfNeeded(acompteData.modePaiement);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Only call fetchData if reference or acompte needs fetching
    if ((reference === "" || !acompte) && idAcompte) {
      fetchData();
    }
  }, [
    idAcompte,
    reference,
    acompte,
    paymentMethodFields,
    paymentMethodesFields,
    setLoading,
  ]);

  return (
    <div className="flex items-center justify-center p-10">
      <form
        ref={refForm}
        onSubmit={handleSubmit}
        className="bg-slate-50 p-10 text-sm text-slate-700 rounded-sm"
      >
        {acompte && !loading ? (
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
                options={
                  paymentMethodes && paymentMethodes.length > 0
                    ? paymentMethodes.map((method) => ({
                        value: method.id,
                        label: method.name,
                      }))
                    : []
                }
                value={acompte?.modePaiement} // Utilisez `value` pour un composant contrôlé
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
