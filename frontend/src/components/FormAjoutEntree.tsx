import { useState } from "react";

const FormAjoutEntree = () => {
  const [formData, setFormData] = useState({
    date: "",
    montant: "",
    methodePaiement: "",
    quiAPaye: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'enregistrement de l'entrée
    console.log("Données de l'entrée ajoutée :", formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Ajout d'une Entrée
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="montant"
          >
            Montant (€)
          </label>
          <input
            type="number"
            id="montant"
            name="montant"
            value={formData.montant}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="methodePaiement"
          >
            Méthode de Paiement
          </label>
          <select
            id="methodePaiement"
            name="methodePaiement"
            value={formData.methodePaiement}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Sélectionner la méthode de paiement</option>
            <option value="carte_credit">Carte de Crédit</option>
            <option value="especes">Espèces</option>
            <option value="virement">Virement</option>
            <option value="cheque">Chèque</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="quiAPaye"
          >
            Qui a payé ?
          </label>
          <input
            type="text"
            id="quiAPaye"
            name="quiAPaye"
            value={formData.quiAPaye}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Nom de la personne ou de l'entité"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Détails supplémentaires sur l'entrée"
          />
        </div>

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

export default FormAjoutEntree;
