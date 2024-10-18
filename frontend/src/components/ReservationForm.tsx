import AppLabel from "./AppLabel";
import AppInput from "./AppInput";
import AppTextarea from "./AppTextarea";

const ReservationForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center h-full w-full">
      <div className="bg-white p-8 shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          Réservation de Salle
        </h1>
        <hr className="mb-6" />
        <form action="" className="grid grid-cols-2 gap-4">
          <div>
            <AppLabel htmlFor="ref">Réference</AppLabel>
            <AppInput id="ref" type="text" disabled />
          </div>
          <div>
            <AppLabel htmlFor="organis_name">Nom de l'organisation</AppLabel>
            <AppInput id="organis_name" type="text" />
          </div>
          <div>
            <AppLabel htmlFor="nom_prenom_contact">
              Nom et prenoms du contact
            </AppLabel>
            <AppInput id="nom_prenom_contact" type="text" />
          </div>
          <div>
            <AppLabel htmlFor="email">Email</AppLabel>
            <AppInput id="email" type="email" />
          </div>
          <div>
            <AppLabel htmlFor="telephone">Telephone</AppLabel>
            <AppInput id="telephone" type="text" />
          </div>
          <div>
            <AppLabel htmlFor="nombre_personnes">Nombre de personnes</AppLabel>
            <AppInput id="nombre_personnes" type="number" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <AppLabel htmlFor="date_debut">Date de début</AppLabel>
              <AppInput id="date_debut" type="date" required />
            </div>
            <div>
              <AppLabel htmlFor="heure_debut">Heure de début</AppLabel>
              <AppInput id="heure_debut" type="time" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <AppLabel htmlFor="date_fin">Date de fin</AppLabel>
              <AppInput id="date_fin" type="date" required />
            </div>
            <div>
              <AppLabel htmlFor="heure_fin">Heure de fin</AppLabel>
              <AppInput id="heure_fin" type="time" required />
            </div>
          </div>
          {/* Ajouter un acompte */}
          <div className="col-span-2">
            <AppLabel htmlFor="activite">Activité</AppLabel>
            <AppTextarea id="activite" />
          </div>
          <div className="col-span-2">
            <AppLabel htmlFor="remarques">Remarques</AppLabel>
            <AppTextarea id="remarques" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;
