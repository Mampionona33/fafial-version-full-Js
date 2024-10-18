import AppLabel from "./AppLabel";
import AppInput from "./AppInput";
import AppTextarea from "./AppTextarea";
import AppSelect from "./AppSelect";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import ReservationService from "../services/ReservationService";
import {
  StatutReservation,
  UtilisateurType,
} from "../interfaces/ReservationInterface";
import { useAuth } from "../hooks/useAuth";
import RoleChecker from "../utils/RoleChecker";

const ReservationForm = () => {
  const { user } = useAuth();
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

  const [nomOrganisation, setnomOrganisation] = React.useState<string>("");
  const [nomPrenomContact, setContactName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [telephone, setTelephone] = React.useState<string>("");
  const [nombrePersonnes, setNombrePersonnes] = React.useState<number>(0);
  const [dateDebut, setDateDebut] = React.useState<string>("");
  const [heureDebut, setHeureDebut] = React.useState<string>("");
  const [dateFin, setDateFin] = React.useState<string>("");
  const [heureFin, setHeureFin] = React.useState<string>("");
  const [activite, setActivite] = React.useState<string>("");
  const [remarques, setRemarques] = React.useState<string>("");

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
    const id = uuidv4();
    const newAcompte = {
      id: id,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      nomOrganisation,
      nomPrenomContact,
      email,
      telephone,
      nombrePersonnes,
      dateDebut,
      heureDebut,
      dateFin,
      heureFin,
      acomptes,
      activite,
      remarques,
    });

    try {
      const res = await ReservationService.create({
        id: uuidv4(),
        reference: "",
        nomOrganisation,
        nomPrenomContact,
        email,
        telephone,
        nombrePersonnes,
        dateDebut,
        heureDebut,
        dateFin,
        heureFin,
        salleId: options[0].value, // Exemple pour salleId, ajustez selon votre logique
        acomptes,
        activite,
        remarques,
        statut: RoleChecker.hasRole(user!, "staf")
          ? StatutReservation.VALIDE
          : StatutReservation.EN_ATTENTE, // Valeur par défaut
        utilisateurType: UtilisateurType.STAFF, // Valeur par défaut
      });
      console.log("Réservation créée :", res);
    } catch (error) {
      console.error("Erreur lors de la création de la réservation", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center h-full w-full py-8 px-4">
      <div className="bg-white p-8 shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          Réservation de Salle
        </h1>
        <hr className="mb-6" />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <AppLabel htmlFor="reference">Référence</AppLabel>
            <AppInput
              id="reference"
              type="text"
              disabled
              placeholder="Référence"
            />
          </div>
          <div>
            <AppLabel htmlFor="nomOrganisation">Nom de l'organisation</AppLabel>
            <AppInput
              id="nomOrganisation"
              type="text"
              placeholder="Nom de l'organisation"
              value={nomOrganisation}
              onChange={(e) => setnomOrganisation(e.target.value)}
            />
          </div>
          <div>
            <AppLabel htmlFor="nomPrenomContact">
              Nom et prénom du contact
            </AppLabel>
            <AppInput
              id="nomPrenomContact"
              type="text"
              placeholder="Nom et prénom"
              value={nomPrenomContact}
              onChange={(e) => setContactName(e.target.value)}
            />
          </div>
          <div>
            <AppLabel htmlFor="email">Email</AppLabel>
            <AppInput
              id="email"
              type="email"
              placeholder="exemple@domaine.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <AppLabel htmlFor="telephone">Téléphone</AppLabel>
            <AppInput
              id="telephone"
              type="text"
              placeholder="Numéro de téléphone"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </div>
          <div>
            <AppLabel htmlFor="nombrePersonnes">Nombre de personnes</AppLabel>
            <AppInput
              id="nombrePersonnes"
              type="number"
              required
              placeholder="Nombre de personnes"
              value={nombrePersonnes}
              onChange={(e) => setNombrePersonnes(e.target.valueAsNumber)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <AppLabel htmlFor="dateDebut">Date de début</AppLabel>
              <AppInput
                id="dateDebut"
                type="date"
                required
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
              />
            </div>
            <div>
              <AppLabel htmlFor="heureDebut">Heure de début</AppLabel>
              <AppInput
                id="heureDebut"
                type="time"
                required
                value={heureDebut}
                onChange={(e) => setHeureDebut(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <AppLabel htmlFor="dateFin">Date de fin</AppLabel>
              <AppInput
                id="dateFin"
                type="date"
                required
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
              />
            </div>
            <div>
              <AppLabel htmlFor="heureFin">Heure de fin</AppLabel>
              <AppInput
                id="heureFin"
                type="time"
                required
                value={heureFin}
                onChange={(e) => setHeureFin(e.target.value)}
              />
            </div>
          </div>

          <div className="col-span-1">
            <AppLabel htmlFor="salleId">Choisir une salle</AppLabel>
            <AppSelect id="salleId" options={options} />
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
              value={activite}
              onChange={(e) => setActivite(e.target.value)}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <AppLabel htmlFor="remarques">Remarques</AppLabel>
            <AppTextarea
              id="remarques"
              placeholder="Ajoutez vos remarques ici..."
              value={remarques}
              onChange={(e) => setRemarques(e.target.value)}
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
