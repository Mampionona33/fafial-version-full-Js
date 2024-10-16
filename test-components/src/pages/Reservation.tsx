import { useState } from "react";
import { PrimeIcons } from "primereact/api";

const Reservation = () => {
  const [reference, setReference] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [numeroSalle, setNumeroSalle] = useState("");
  const [nombrePersonnes, setNombrePersonnes] = useState("");
  const [activite, setActivite] = useState("");
  const [remarques, setRemarques] = useState("");

  // Initialiser avec un acompte par défaut
  const [accomptes, setAccomptes] = useState([]);

  // Variables pour l'ajout d'un nouvel acompte
  const [montant, setMontant] = useState("");
  const [datePrevue, setDatePrevue] = useState("");
  const [modePaiement, setModePaiement] = useState("");

  // Fonction pour ajouter un acompte
  const handleAddAccompte = (event) => {
    event.preventDefault(); // Empêcher la soumission du formulaire

    if (montant && datePrevue && modePaiement) {
      const newAccompte = {
        id: Date.now(), // id unique pour l'acompte
        montant: montant,
        datePrevue: datePrevue,
        modePaiement: modePaiement,
      };

      setAccomptes([...accomptes, newAccompte]); // Ajouter à la liste des acomptes
      // Réinitialiser les champs de l'acompte
      setMontant("");
      setDatePrevue("");
      setModePaiement("");
    } else {
      alert("Veuillez remplir tous les champs pour l'acompte.");
    }
  };

  // Fonction pour supprimer un acompte
  const handleDeleteAccompte = (id) => {
    const updatedAccomptes = accomptes.filter((accompte) => accompte.id !== id);
    setAccomptes(updatedAccomptes);
  };

  return (
    <div className="min-h-screen flex items-center justify-center h-full">
      <div className="bg-white p-8 shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-semibold text-gray-700 text-center mb-6">
          Réservation de Salle
        </h1>

        <form className="space-y-6">
          {/* Référence générée automatiquement */}
          <div>
            <label
              htmlFor="reference"
              className="block text-sm font-medium text-gray-600"
            >
              Référence
            </label>
            <input
              type="text"
              id="reference"
              disabled
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
            />
          </div>

          {/* Nom de l'organisation */}
          <div>
            <label
              htmlFor="organisation"
              className="block text-sm font-medium text-gray-600"
            >
              Organisation
            </label>
            <input
              type="text"
              id="organisation"
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
            />
          </div>

          {/* Nom complet */}
          <div>
            <label
              htmlFor="nom"
              className="block text-sm font-medium text-gray-600"
            >
              Nom complet
            </label>
            <input
              type="text"
              id="nom"
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
              required
            />
          </div>

          {/* Numéro de téléphone */}
          <div>
            <label
              htmlFor="telephone"
              className="block text-sm font-medium text-gray-600"
            >
              Numéro de téléphone
            </label>
            <input
              type="tel"
              id="telephone"
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
              required
            />
          </div>

          {/* Date de début et heure de début */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date_debut"
                className="block text-sm font-medium text-gray-600"
              >
                Date de début
              </label>
              <input
                type="date"
                id="date_debut"
                className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="heure_debut"
                className="block text-sm font-medium text-gray-600"
              >
                Heure de début
              </label>
              <input
                type="time"
                id="heure_debut"
                className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
                required
              />
            </div>
          </div>

          {/* Date de fin et heure de fin */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date_fin"
                className="block text-sm font-medium text-gray-600"
              >
                Date de fin
              </label>
              <input
                type="date"
                id="date_fin"
                className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="heure_fin"
                className="block text-sm font-medium text-gray-600"
              >
                Heure de fin
              </label>
              <input
                type="time"
                id="heure_fin"
                className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
                required
              />
            </div>
          </div>

          {/* Numéro de salle */}
          <div>
            <label
              htmlFor="numero_salle"
              className="block text-sm font-medium text-gray-600"
            >
              Numéro de salle
            </label>
            <input
              type="text"
              id="numero_salle"
              min={1}
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
              required
            />
          </div>

          {/* Nombre de personnes */}
          <div>
            <label
              htmlFor="nombre_personnes"
              className="block text-sm font-medium text-gray-600"
            >
              Nombre de personnes
            </label>
            <input
              type="number"
              id="nombre_personnes"
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
              required
            />
          </div>

          {/* Ajouter un acompte */}
          <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4">
            Acomptes
          </h2>

          {/* Formulaire d'ajout d'acompte */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Montant
              </label>
              <input
                type="number"
                value={montant}
                onChange={(e) => setMontant(e.target.value)}
                className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300"
                placeholder="Montant"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Date prévue
              </label>
              <input
                type="date"
                value={datePrevue}
                onChange={(e) => setDatePrevue(e.target.value)}
                className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Mode de Paiement
              </label>
              <select
                value={modePaiement}
                onChange={(e) => setModePaiement(e.target.value)}
                className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300"
              >
                <option value="">Sélectionner un mode de paiement</option>
                <option value="Carte bancaire">Carte bancaire</option>
                <option value="Chèque">Chèque</option>
                <option value="Virement">Virement</option>
              </select>
            </div>
          </div>
          <div className="text-center mt-4">
            <input
              type="button"
              value="Ajouter"
              onClick={handleAddAccompte}
              className="bg-green-900 hover:cursor-pointer hover:bg-green-800 text-white py-2 px-4 hover:bg-blue-600"
            />
          </div>

          {/* Liste des acomptes */}
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-600">
              Liste des Acomptes
            </h3>
            <ul className="space-y-2">
              {accomptes.map((accompte) => (
                <li
                  key={accompte.id}
                  className="flex justify-between items-center"
                >
                  <span>
                    {accompte.montant} € - {accompte.datePrevue} -{" "}
                    {accompte.modePaiement}
                  </span>
                  <button
                    onClick={() => handleDeleteAccompte(accompte.id)}
                    className="text-red-600"
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Activité */}
          <div>
            <label
              htmlFor="activite"
              className="block text-sm font-medium text-gray-600"
            >
              Activité
            </label>
            <textarea
              id="activite"
              rows={4}
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
              required
            ></textarea>
          </div>

          {/* Remarques */}
          <div>
            <label
              htmlFor="remarques"
              className="block text-sm font-medium text-gray-600"
            >
              Remarques
            </label>
            <textarea
              id="remarques"
              rows={4}
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
            ></textarea>
          </div>

          {/* Bouton imprimer devis */}
          <div className="text-center">
            <input
              type="submit"
              value="Enregistrer"
              className="bg-primary hover:bg-gray-700 text-white px-4 py-2 mt-6 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
