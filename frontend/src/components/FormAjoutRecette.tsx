import React, {useEffect} from "react";
import AppLabel from "./AppLabel";
import AppSelect from "./AppSelect";
import AppInput from "./AppInput";
import AppTextarea from "./AppTextarea";
import RecetteService from "../services/RecetteService.ts";
import {usePaymentMethodes} from "../hooks/usePaymentMethodes.tsx";
import SelectOptionAdapter from "../utils/SelectOptionAdapter.ts";
import {useLoading} from "../hooks/useLoading.tsx";
import PaymentMethodesFieldsService from "../services/PaymentMethodesFieldsService.ts";
import {toast, ToastContainer} from "react-toastify";
import {PaymentMethodesFieldsInterface} from "../interfaces/PaymentMethodesFieldsContextType.ts";
import {AxiosError} from "axios";

const FormAjoutRecette = () => {
  const [reference, setReference] = React.useState<string>("");
  const [localPaymentMethodes, setLocalPaymentMethodes] = React.useState<{ label: string, value: string }[]>([]);
  const [paymentMethodesFields, setPaymentMethodesFields] = React.useState<PaymentMethodesFieldsInterface[]>([]);
  const {paymentMethodes} = usePaymentMethodes();
  const {setLoading} = useLoading()


  // Gestion de la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Créer un objet pour stocker les données du formulaire
    const formData = {
      reference,
      personnePayeur: (e.target as HTMLFormElement).personnePayeur.value,
      contactPayeur: (e.target as HTMLFormElement).contactPayeur.value,
      date: (e.target as HTMLFormElement).date.value,
      description: (e.target as HTMLFormElement).description.value,
      montant: (e.target as HTMLFormElement).montant.value,
      paymentMethode: (e.target as HTMLFormElement).paymentMethode.value,
      // Ajoute les champs supplémentaires si nécessaire
      paymentFields: paymentMethodesFields.map(field => ({
        fieldName: field.fieldName,
        value: field.value,
      })),
    };

    // Logique pour soumettre les données
    console.log("Données de l'entrée ajoutée : ", formData);
    try {
      const resp = await RecetteService.createRecette(formData);
      if (resp.status === 201) {
        toast.success(resp.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          toastId: "success-recette",
        });
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la création de la recette.", {
        position: "bottom-right",
        autoClose: 5000,
        toastId: "error-recette",
      });
      console.error("Erreur lors de la soumission de la recette : ", error);
    }
  };


  const handlePaymentMehtodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    console.log(event.target.value)
    const paymentMethodeId = event.target.value
    PaymentMethodesFieldsService.getFiledByPaymentsMethodsId(paymentMethodeId).then((resp) => {
      console.log(resp)
      const {status, data} = resp
      if (status === 200 && data.paymentFields) {
        setPaymentMethodesFields(data.paymentFields)
      }
    }).catch((error) => {
      if (error instanceof AxiosError) {
        toast.error("error while fetching payment method fields")
      }
    })
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

    if (reference === "") {
      fetchRecetteRef().then((resp) => {
        setReference(resp.reference)
      });
    }

    if (paymentMethodes) {
      setLocalPaymentMethodes(SelectOptionAdapter.adapt(paymentMethodes))
      if (paymentMethodes.length > 0) {
        const defaultPaymentMethod = paymentMethodes[0]
        setLoading(true)
        PaymentMethodesFieldsService.getFiledByPaymentsMethodsId(defaultPaymentMethod.id).then((resp) => {
          const {paymentFields} = resp.data;
          if (paymentFields) {
            setPaymentMethodesFields(paymentFields)
          }
        }).catch((error) => {
          console.error(error)
          toast.error("error while fetching payment method fields")
        }).finally(
          () => setLoading(false)
        )
      }
    }

  }, [reference, paymentMethodes, setLoading]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Ajouter une recette
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <AppLabel htmlFor="reference">Reference</AppLabel>
        <AppInput
          type="text"
          id="reference"
          disabled
          required
          value={reference}
        />

        <div>
          <AppLabel htmlFor="personnePayeur">Nom et prenom du payeur</AppLabel>
          <AppInput
            type="text"
            id="personnePayeur"
            required
            name="personnePayeur"
          />
        </div>

        <div>
          <AppLabel htmlFor="contactPayeur">
            Numéro telephone du payeur
          </AppLabel>
          <AppInput type="tel" id="contactPayeur" required/>
        </div>

        <div>
          <AppLabel htmlFor="date">Date de paiement</AppLabel>
          <AppInput
            type="date"
            id="date"
            name="date"
            required
          />
        </div>

        <div>
          <AppLabel htmlFor="description">Description</AppLabel>
          <AppTextarea id="description" name="description" rows={4}/>
        </div>

        <div>
          <AppLabel htmlFor="montant">Montant</AppLabel>
          <AppInput
            type="number"
            id="montant"
            name="montant"
            min={1}
            required
          />
        </div>

        <div>
          <AppLabel htmlFor="paymentMethode">Méthode de paiement</AppLabel>
          <AppSelect
            id="paymentMethode"
            name="paymentMethode"
            options={localPaymentMethodes}
            onChange={handlePaymentMehtodeChange}
          />
        </div>

        {paymentMethodesFields && paymentMethodesFields.length > 0 ? (
          <div className="flex flex-col gap-4">
            {paymentMethodesFields.map((field) => (
              <div key={field.id}>
                <AppLabel htmlFor={field.id as string}>{field.label}</AppLabel>
                <AppInput
                  type={field.type}
                  id={field.id as string}
                  name={field.fieldName}
                  value={(field.value as string) || ""}
                  onChange={(e) => {
                    const updatedFields = paymentMethodesFields.map((f) => {
                      if (f.id === field.id) {
                        return {...f, value: e.target.value};
                      }
                      return f;
                    });
                    setPaymentMethodesFields(updatedFields);
                  }}
                  required={field.isRequired}
                />
              </div>
            ))}
          </div>
        ) : (
          <p>Aucun champ de paiement disponible</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Ajouter l'Entrée
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default FormAjoutRecette;
