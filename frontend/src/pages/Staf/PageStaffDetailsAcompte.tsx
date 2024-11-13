import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AcompteService from "../../services/AcompteService";
import { Acompte } from "../../interfaces/AcompteInterface";
import { useLoading } from "../../hooks/useLoading";
import RecetteService from "../../services/RecetteService";
import { Recette } from "../../interfaces/ReservationInterface";

const PageStaffDetailsAcompte = () => {
  const { idAcompte } = useParams();
  const [acompte, setAcompte] = useState<Acompte | null>();
  const [recette, setRecette] = useState<Recette | null>();
  const { loading, setLoading } = useLoading();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [acompteResponse, recetteResponse] = await Promise.all([
          AcompteService.getById(idAcompte!),
          RecetteService.getRecetteByAcompteId(idAcompte!),
        ]);

        console.log(recetteResponse);
        if (acompteResponse.status === 200 && recetteResponse.status === 200) {
          setAcompte(acompteResponse.data.acompte);
          const filteredRecette = recetteResponse.data.recettes.filter(
            (recette: Recette) => {
              return recette.acompteId === idAcompte;
            }
          )[0];
          console.log(filteredRecette);
          setRecette(filteredRecette);
        }
      } catch (error) {
        console.error("Error fetching acompte:", error);
      } finally {
        setLoading(false);
      }
    };
    if (idAcompte && !acompte) {
      fetchData();
    }
    console.log(acompte);
  }, [idAcompte, acompte, setLoading]);

  return (
    <div className="flex items-center justify-center p-10">
      {acompte && !loading && recette ? (
        <div className="bg-white shadow-md p-10 rounded-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Détails de l'Acompte</h1>
          <p>
            <strong>Référence de la Réservation : </strong>
            {acompte.reservation.reference}
          </p>
          <p>
            <strong>Montant : </strong>
            {acompte.montant}
          </p>
          <p>
            <strong>Date de Paiement :</strong>
          </p>
          <p>
            <strong>Payeur : </strong> {recette.personnePayeur}
          </p>
          <p>
            <strong>Contact du Payeur : </strong>
            {recette.contactPayeur}
          </p>
          <p>
            <strong>Mode de Paiement : </strong>
            {recette.paymentMethode.name}
          </p>

          <div className="flex justify-center mt-6">
            {/* Bouton pour accéder à la facture globale */}
            <Link
              to={`/staf/reservations/facture/${acompte.reservation.id}`}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Facture du reservation
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-slate-50">Chargement des détails de l'acompte...</p>
      )}
    </div>
  );
};

export default PageStaffDetailsAcompte;
