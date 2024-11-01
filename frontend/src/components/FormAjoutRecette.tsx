import React, {useState, useEffect, useCallback} from "react";
import {usePaymentMethodes} from "../hooks/usePaymentMethodes";
import SelectOptionAdapter from "../utils/SelectOptionAdapter";
import AppLabel from "./AppLabel";
import AppSelect from "./AppSelect";
import AppInput from "./AppInput";
import {usePaymentMethodesFields} from "../hooks/usePaymentMethodesFields";
import {useLoading} from "../hooks/useLoading";
import {toast} from "react-toastify";
import AppTextarea from "./AppTextarea";
import RecetteService from "../services/RecetteService.ts";

const FormAjoutRecette = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const {paymentMethodesFields, fetchPaymentFields, setPaymentMethodes} =
    usePaymentMethodesFields();
  const {setLoading} = useLoading();
  const [personnePayeur, setPersonnePayeur] = useState("");
  const [reference, setReference] = useState<string | null>(null);

  const [methodePaiementOptions, setMethodePaiementOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const {paymentMethodes} = usePaymentMethodes();

  // Fonction pour changer la méthode de paiement
  const handlePaymentMethodeChange = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        await fetchPaymentFields(id);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(
            error.message || "Erreur lors du chargement des champs de paiement"
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [fetchPaymentFields, setLoading]
  );

  // Effet pour initialiser les options de méthode de paiement et charger les champs par défaut
  useEffect(() => {
    if (paymentMethodes && paymentMethodes.length > 0) {
      const paymentMethodesOptions = SelectOptionAdapter.adapt(
        paymentMethodes
      ) as { label: string; value: string }[];
      setMethodePaiementOptions(paymentMethodesOptions);

      // Appel initial de fetchPaymentFields si une option par défaut existe
      const defaultOption = paymentMethodesOptions[0];
      if (defaultOption && paymentMethodesFields.length === 0) {
        handlePaymentMethodeChange(defaultOption.value);
      }
    }
    const fetchReference = async (): Promise<void> => {
      try {
        const response = await RecetteService.getRecettesReferences();
        console.log("response", response);
        if (response.status === 200) {
          setReference(response.data.reference);
        }

      } catch (error) {
        if (error instanceof Error) {
          toast.error(
            error.message || "Erreur lors du chargement des champs de paiement"
          );
        }
      }
    }
    console.log("test", reference);
    if (reference === null) {
      console.log("fetch reference");
      fetchReference()
    }

  }, [paymentMethodes, paymentMethodesFields, handlePaymentMethodeChange, reference]);

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      date,
      paymentFields: paymentMethodesFields,
    };

    // Logique pour soumettre les données
    console.log("Données de l'entrée ajoutée : ", formData);
    // Vous pourriez vouloir envoyer formData à une API ou à un autre traitement ici
  };

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
          value={reference || ""}
          disabled
          onChange={(e) => setReference(e.target.value)}
          required
        />

        <div>
          <AppLabel htmlFor="personnePayeur">Nom et prenom du payeur</AppLabel>
          <AppInput
            type="text"
            id="personnePayeur"
            value={personnePayeur}
            onChange={(e) => setPersonnePayeur(e.target.value)}
            required
          />
        </div>

        <div>
          <AppLabel htmlFor="numeroTelephone">
            Numero telephone du payeur
          </AppLabel>
          <AppInput type="tel" id="numeroTelephone" required/>
        </div>

        <div>
          <AppLabel htmlFor="date">Date de paiement</AppLabel>
          <AppInput
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          <AppLabel htmlFor="methodePaiement">Méthode de paiement</AppLabel>
          <AppSelect
            id="methodePaiement"
            name="methodePaiement"
            options={methodePaiementOptions}
            onChange={(e) => handlePaymentMethodeChange(e)}
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
                    setPaymentMethodes(updatedFields);
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
    </div>
  );
};

export default FormAjoutRecette;
