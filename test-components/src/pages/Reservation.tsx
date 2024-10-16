const Reservation = () => {
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

          {/* Date prévue de paiement de l'acompte */}
          <div>
            <label
              htmlFor="date_acompte"
              className="block text-sm font-medium text-gray-600"
            >
              Date prévue du paiement de l'acompte
            </label>
            <input
              type="date"
              id="date_acompte"
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
              required
            />
          </div>

          {/* Valeur de l'acompte */}
          <div>
            <label
              htmlFor="valeur_acompte"
              className="block text-sm font-medium text-gray-600"
            >
              Valeur de l'acompte
            </label>
            <input
              type="number"
              id="valeur_acompte"
              className="mt-1 block w-full px-0 py-2 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-b-4 focus:border-gray-500 transition-all duration-100"
              required
            />
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
            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Imprimer le devis
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reservation;
