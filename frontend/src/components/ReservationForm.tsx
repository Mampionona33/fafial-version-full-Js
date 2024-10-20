import AppLabel from "./AppLabel";
import AppInput from "./AppInput";
import AppTextarea from "./AppTextarea";
import AppSelect from "./AppSelect";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import ReservationService from "../services/ReservationService";
import {
  PayementStatut,
  StatutReservation,
  UtilisateurType,
  ReservationInterface,
  ValidationStatut,
} from "../interfaces/ReservationInterface";
import { nanoid } from "nanoid";
import { useAuth } from "../hooks/useAuth";
import { useSalles } from "../hooks/useSalles";
import SelectOptionAdapter from "../utils/SelectOptionAdapter";
import { toast, ToastContainer } from "react-toastify";

const ReservationForm = () => {
  const { user } = useAuth();
  const { salles } = useSalles();
  // State pour les acomptes
  const [acomptes, setAcomptes] = React.useState<
    {
      id: string;
      montant: number;
      datePrevue: string;
      modePaiement: string;
    }[]
  >([]);
  const [salleOptions, setSalleOptions] = React.useState<
    { label: string; value: string }[]
  >([]);

  // State pour les informations de la réservation
  const [montant, setMontant] = React.useState<number>(0);
  const [datePrevue, setDatePrevue] = React.useState<string>("");
  const [modePaiement, setModePaiement] = React.useState<string>("carte");

  const [nomOrganisation, setNomOrganisation] = React.useState<string>("");
  const [nomPrenomContact, setNomPrenomContact] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [telephone, setTelephone] = React.useState<string>("");
  const [nombrePersonnes, setNombrePersonnes] = React.useState<number>(0);
  const [dateDebut, setDateDebut] = React.useState<string>("");
  const [heureDebut, setHeureDebut] = React.useState<string>("");
  const [dateFin, setDateFin] = React.useState<string>("");
  const [heureFin, setHeureFin] = React.useState<string>("");
  const [activite, setActivite] = React.useState<string>("");
  const [remarques, setRemarques] = React.useState<string>("");
  const [reference, setReference] = React.useState<string>("");
  const [salleId, setSalleId] = React.useState<string>("");

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

  const generateRef = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}${month}${day}`;

    const randomString = nanoid(7);

    // Retourner la référence dans le format : RESYYYYMMDDrandomString
    return `RES-${formattedDate}-${randomString}`;
  };

  React.useEffect(() => {
    setReference(generateRef());
    if (salles) {
      setSalleOptions(SelectOptionAdapter.adapt(salles));
    }
  }, [salles]);

  const resetForm = () => {
    setAcomptes([]);
    setMontant(0);
    setDatePrevue("");
    setModePaiement("carte");
    setNomOrganisation("");
    setNomPrenomContact("");
    setEmail("");
    setTelephone("");
    setNombrePersonnes(0);
    setDateDebut("");
    setHeureDebut("");
    setDateFin("");
    setHeureFin("");
    setActivite("");
    setRemarques("");
    setReference(generateRef());
    setSalleId("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDateDebut = new Date(dateDebut);
    const formattedDateFin = new Date(dateFin);

    // Met à jour les statuts des acomptes en "EN_ATTENTE"
    const updatedAcomptes = acomptes.map((acompte) => ({
      ...acompte,
      // comment supprimer l'id des acomptes ici
      id: undefined,
      statut: PayementStatut.EN_ATTENTE,
    }));

    if (!user || !user.id) {
      throw new Error("Utilisateur non connecté");
    }

    // Crée l'objet ReservationInterface
    const reservationData: ReservationInterface = {
      createdById: user?.id,
      reference,
      nomOrganisation,
      nomPrenomContact,
      email,
      telephone,
      nombrePersonnes,
      dateDebut: formattedDateDebut,
      heureDebut,
      dateFin: formattedDateFin,
      heureFin,
      salleId: salleId,
      acomptes: updatedAcomptes,
      activite,
      remarques,
      statut: StatutReservation.OUVERT,
      utilisateurType: UtilisateurType.STAFF,
      validationStatus: ValidationStatut.VALIDE,
    };

    try {
      // Création de la réservation
      const res = await ReservationService.create(reservationData);
      if (res.status === 201) {
        resetForm();
        if (res.data.message) {
          toast.success(res.data.message, {
            position: "bottom-right",
          });
        }
      } else if (res.status === 400) {
        toast.error(res.data.message, {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la création de la réservation", error);
      toast.error("Erreur lors de la création de la réservation", {
        position: "bottom-right",
        toastId: "error-reservation",
      });
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
          {/* Référence */}
          <div>
            <AppLabel htmlFor="reference">Référence</AppLabel>
            <AppInput
              id="reference"
              type="text"
              value={reference}
              disabled
              placeholder="Référence"
            />
          </div>

          {/* Nom Organisation */}
          <div>
            <AppLabel htmlFor="nomOrganisation">Nom de l'organisation</AppLabel>
            <AppInput
              id="nomOrganisation"
              type="text"
              placeholder="Nom de l'organisation"
              value={nomOrganisation}
              onChange={(e) => setNomOrganisation(e.target.value)}
            />
          </div>

          {/* Nom Prenom Contact */}
          <div>
            <AppLabel htmlFor="nomPrenomContact">
              Nom et prénom du contact
            </AppLabel>
            <AppInput
              id="nomPrenomContact"
              type="text"
              placeholder="Nom et prénom"
              value={nomPrenomContact}
              onChange={(e) => setNomPrenomContact(e.target.value)}
            />
          </div>

          {/* Email */}
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

          {/* Téléphone */}
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

          {/* Nombre de personnes */}
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

          {/* Date et Heure de début */}
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

          {/* Date et Heure de fin */}
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

          {/* Salle */}
          <div className="col-span-1">
            <AppLabel htmlFor="salleId">Choisir une salle</AppLabel>
            <AppSelect
              id="salleId"
              options={salleOptions}
              onChange={(value) => setSalleId(value)}
            />
          </div>

          {/* Acomptes */}
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

          {/* Ajouter acompte */}
          <div className="col-span-1 md:col-span-2 flex justify-center items-center">
            <input
              type="button"
              onClick={handleAddAcompt}
              value="Ajouter acompte"
              className="bg-gray-600 hover:bg-gray-500 text-white py-1 px-8 rounded cursor-pointer"
            />
          </div>

          {/* Liste des acomptes */}
          <div className="col-span-1 md:col-span-2">
            <h3>Liste des acomptes</h3>
            <ul>
              {acomptes.map((acompte) => (
                <li
                  key={acompte.id}
                  className="flex justify-between items-center space-y-2"
                >
                  <span>{acompte.datePrevue}</span>
                  <span>{acompte.montant} Ar</span>
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

          {/* Activité */}
          <div className="col-span-1 md:col-span-2">
            <AppLabel htmlFor="activite">Activité</AppLabel>
            <AppTextarea
              id="activite"
              placeholder="Description de l'activité"
              value={activite}
              onChange={(e) => setActivite(e.target.value)}
            />
          </div>

          {/* Remarques */}
          <div className="col-span-1 md:col-span-2">
            <AppLabel htmlFor="remarques">Remarques</AppLabel>
            <AppTextarea
              id="remarques"
              placeholder="Ajoutez vos remarques ici..."
              value={remarques}
              onChange={(e) => setRemarques(e.target.value)}
            />
          </div>

          {/* Bouton soumettre */}
          <div className="text-center flex justify-center items-center w-full col-span-1 md:col-span-2">
            <input
              type="submit"
              value="Enregistrer"
              className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-1 mt-6 cursor-pointer rounded-md"
            />
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReservationForm;
