import AppLabel from "./AppLabel";
import AppInput from "./AppInput";
import AppTextarea from "./AppTextarea";
import AppSelect from "./AppSelect";
import React from "react";

const ReservationForm = () => {
  const [acomptes, setAcomptes] = React.useState<
    {
      id: string;
      montant: number;
      datePrevue: string;
      modePaiement: string;
    }[]
  >([]);

  const [montant, setMontant] = React.useState<number>(0);
  const [datePrevue, setDatePrevue] = React.useState<string>("");
  const [modePaiement, setModePaiement] = React.useState<string>("carte");

  const options = [
    { value: "salle_a", label: "Salle A" },
    { value: "salle_b", label: "Salle B" },
    { value: "salle_c", label: "Salle C" },
  ];

  const modesPaiement = [
    { value: "carte", label: "Carte" },
    { value: "espece", label: "Espèce" },
    { value: "cheque", label: "Chèque" },
  ];

  const handleAddAcompt = () => {
    const newAcompte = {
      id: Date.now().toString(),
      montant,
      datePrevue,
      modePaiement,
    };
    setAcomptes([...acomptes, newAcompte]);
    setMontant(0);
    setDatePrevue("");
    setModePaiement("carte");
  };

  const handleDeleteAcompt = (id: string) => {
    setAcomptes(acomptes.filter((acompte) => acompte.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center h-full w-full py-8 px-4">
      <div className="bg-white p-8 shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          Réservation de Salle
        </h1>
        <hr className="mb-6" />
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <AppLabel htmlFor="ref">Référence</AppLabel>
            <AppInput id="ref" type="text" disabled placeholder="Référence" />
          </div>
          <div>
            <AppLabel htmlFor="organis_name">Nom de l'organisation</AppLabel>
            <AppInput
              id="organis_name"
              type="text"
              placeholder="Nom de l'organisation"
            />
          </div>
          <div>
            <AppLabel htmlFor="nom_prenom_contact">
              Nom et prénom du contact
            </AppLabel>
            <AppInput
              id="nom_prenom_contact"
              type="text"
              placeholder="Nom et prénom"
            />
          </div>
          <div>
            <AppLabel htmlFor="email">Email</AppLabel>
            <AppInput
              id="email"
              type="email"
              placeholder="exemple@domaine.com"
            />
          </div>
          <div>
            <AppLabel htmlFor="telephone">Téléphone</AppLabel>
            <AppInput
              id="telephone"
              type="text"
              placeholder="Numéro de téléphone"
            />
          </div>
          <div>
            <AppLabel htmlFor="nombre_personnes">Nombre de personnes</AppLabel>
            <AppInput
              id="nombre_personnes"
              type="number"
              required
              placeholder="Nombre de personnes"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <AppLabel htmlFor="date_debut">Date de début</AppLabel>
              <AppInput id="date_debut" type="date" required />
            </div>
            <div>
              <AppLabel htmlFor="heure_debut">Heure de début</AppLabel>
              <AppInput id="heure_debut" type="time" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <AppLabel htmlFor="date_fin">Date de fin</AppLabel>
              <AppInput id="date_fin" type="date" required />
            </div>
            <div>
              <AppLabel htmlFor="heure_fin">Heure de fin</AppLabel>
              <AppInput id="heure_fin" type="time" required />
            </div>
          </div>

          <div className="col-span-1">
            <AppLabel htmlFor="salle">Choisir une salle</AppLabel>
            <AppSelect id="salle" options={options} />
          </div>

          {/* Acompte */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <AppLabel htmlFor="val_account">Montant acompte</AppLabel>
              <AppInput
                id="val_account"
                type="number"
                value={montant}
                onChange={(e) => setMontant(Number(e.target.value))}
                placeholder="Montant en €"
              />
            </div>
            <div>
              <AppLabel htmlFor="date_paiement">
                Date prévue de paiement
              </AppLabel>
              <AppInput
                type="date"
                id="date_paiement"
                value={datePrevue}
                onChange={(e) => setDatePrevue(e.target.value)}
              />
            </div>
            <div>
              <AppLabel htmlFor="mode_paiement">Mode de paiement</AppLabel>
              <AppSelect
                id="mode_paiement"
                options={modesPaiement}
                onChange={(value) => setModePaiement(value)}
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-center items-center">
            <input
              type="button"
              onClick={handleAddAcompt}
              value="Ajouter acompte"
              className="bg-gray-600 hover:bg-gray-500 text-white py-1 px-8 rounded cursor-pointer"
            />
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3>Liste des acomptes</h3>
            <ul>
              {acomptes.map((acompte) => (
                <li
                  key={acompte.id}
                  className="flex justify-between items-center space-y-2"
                >
                  <span>{acompte.datePrevue}</span>
                  <span>{acompte.montant} €</span>
                  <span>{acompte.modePaiement}</span>
                  <button
                    onClick={() => handleDeleteAcompt(acompte.id)}
                    className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-600 hover:text-white"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <hr className="col-span-1 md:col-span-2" />

          <div className="col-span-1 md:col-span-2">
            <AppLabel htmlFor="activite">Activité</AppLabel>
            <AppTextarea
              id="activite"
              placeholder="Description de l'activité"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <AppLabel htmlFor="remarques">Remarques</AppLabel>
            <AppTextarea
              id="remarques"
              placeholder="Ajoutez vos remarques ici..."
            />
          </div>

          {/* Bouton imprimer devis */}
          <div className="text-center flex justify-center items-center w-full col-span-1 md:col-span-2">
            <input
              type="submit"
              value="Enregistrer"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-1 mt-6 cursor-pointer rounded-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
