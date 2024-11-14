import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AcompteService from "../../services/AcompteService";
import { Acompte } from "../../interfaces/AcompteInterface";
import { usePaymentMethodes } from "../../hooks/usePaymentMethodes";
import AppLabel from "../../components/AppLabel";
import AppSelect from "../../components/AppSelect";
import AppInput from "../../components/AppInput";
import { PaymentMethodesFieldsInterface } from "../../interfaces/PaymentMethodesFieldsContextType";
import { format } from "date-fns";
import RecetteService from "../../services/RecetteService";
import { toast, ToastContainer } from "react-toastify";
import PaymentMethodesFieldsService from "../../services/PaymentMethodesFieldsService";
import { useLoading } from "../../hooks/useLoading";
import { useMutation, useQuery } from "@tanstack/react-query";
import InvoiceService from "../../services/InvoiceService";

const PageStafAjoutAcompte = () => {
  const { idAcompte } = useParams();
  const [reference, setReference] = React.useState<string>("");
  const [acompte, setAcompte] = useState<Acompte | null>(null);
  const { paymentMethodes } = usePaymentMethodes();
  const [paymentMethodFields, setPaymentMethodFields] = useState<
    PaymentMethodesFieldsInterface[] | null
  >(null);
  const refForm = React.useRef(null);
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const previousAcompteRef = React.useRef<Acompte | null>(null);

  const {
    data: referenceData,
    isLoading: isLoadingReference,
    isSuccess: isSuccessReference,
  } = useQuery({
    queryKey: ["reference"],
    queryFn: RecetteService.getRecettesReferences,
  });

  const {
    data: acompteData,
    isLoading: isLoadingAcompte,
    isSuccess: isSuccessAcompte,
  } = useQuery({
    queryKey: ["acompte", idAcompte],
    queryFn: () => AcompteService.getById(idAcompte!),
    enabled: !!idAcompte,
  });

  const {
    data: paymentMethodesFieldsData,
    isLoading: isLoadingPaymentMethodesFields,
    isSuccess: isSuccessPaymentMethodesFields,
  } = useQuery({
    queryKey: ["paymentMethodesFields", acompte?.modePaiement],
    queryFn: () =>
      PaymentMethodesFieldsService.getFiledByPaymentsMethodsId(
        acompte?.modePaiement
      ),
    enabled: !!acompte?.modePaiement, // La requête est activée seulement si modePaiement est défini
  });

  const createInvoice = useMutation({
    mutationKey: ["createInvoice", acompte?.id],
    mutationFn: (acompte: Acompte) =>
      InvoiceService.creatAcomptInvoice(acompte.id!),
    onSuccess: () => {
      toast.success("Acompte mis à jour");
      navigate("/staf/acomptes/facture/" + idAcompte);
    },
  });

  // Définition des mutations
  const updateAcompte = useMutation({
    mutationKey: ["updateAcompte", acompte?.id],
    mutationFn: (acompte: Acompte) => AcompteService.updateAcompte(acompte), // Modification ici
    onSuccess: () => {
      if (acompte) {
        createInvoice.mutate(acompte);
      }
    },
  });

  const createRecette = useMutation({
    mutationKey: ["createRecette"],
    mutationFn: RecetteService.createRecette,
    onSuccess: () => {
      if (acompte) {
        // Exécuter la mutation de mise à jour de l'acompte avec les données modifiées
        updateAcompte.mutate({
          ...acompte,
          statut: "PAYE",
        });
      }
    },
  });

  const onChangePaymentMethod = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPaymentMethod = event.target.value;

    if (selectedPaymentMethod) {
      // Mettre à jour previousAcompteRef avec la valeur actuelle de acompte
      previousAcompteRef.current = acompte;

      // Mettre à jour l'acompte avec le nouveau mode de paiement
      setAcompte((prevAcompte) => {
        if (prevAcompte) {
          return {
            ...prevAcompte,
            modePaiement: selectedPaymentMethod,
          };
        }
        return prevAcompte;
      });
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

  // Soumission du formulaire avec useMutation
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

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
        return { ...field, value: inputElement ? inputElement.value : "" };
      }),
    };

    if (!acompte) return; // Si acompte est null, on ne fait rien

    // Appeler la mutation createRecette pour créer la recette
    createRecette.mutate(formData);
  };

  useEffect(() => {
    // Mettre à jour la référence
    if (referenceData) {
      setReference(referenceData.data.reference);
    }

    // Si les données de l'acompte sont disponibles et pas en train de charger les champs de paiement
    if (acompteData && acompteData.data.acompte) {
      const newAcompte = acompteData.data.acompte;

      // Si l'acompte actuel n'est pas défini ou si l'ID de l'acompte a changé, on met à jour l'acompte
      if (!acompte || acompte.id !== newAcompte.id) {
        setAcompte(newAcompte);
      }
    }

    // Mettre à jour les champs de paiement si les données sont disponibles
    if (paymentMethodesFieldsData) {
      setPaymentMethodFields(paymentMethodesFieldsData.data.paymentFields);
    }

    // Gérer l'état de chargement
    if (
      isLoadingAcompte ||
      isLoadingReference ||
      isLoadingPaymentMethodesFields
    ) {
      setLoading(true);
    } else if (
      isSuccessAcompte &&
      isSuccessReference &&
      isSuccessPaymentMethodesFields
    ) {
      setLoading(false);
    }
  }, [
    referenceData,
    acompteData,
    acompte,
    isLoadingAcompte,
    isLoadingReference,
    isLoadingPaymentMethodesFields,
    isSuccessAcompte,
    isSuccessReference,
    isSuccessPaymentMethodesFields,
    paymentMethodesFieldsData,
    setLoading,
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
                options={
                  paymentMethodes && paymentMethodes.length > 0
                    ? paymentMethodes.map((method) => ({
                        value: method.id,
                        label: method.name,
                      }))
                    : []
                }
                value={acompte?.modePaiement} // Cela doit être lié à modePaiement
                name="paymentMethode"
                id="paymentMethode"
                onChange={onChangePaymentMethod} // L'événement change qui met à jour modePaiement
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
