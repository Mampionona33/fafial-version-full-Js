import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AcompteService from "../../services/AcompteService";
import { Acompte } from "../../interfaces/AcompteInterface";
import { useLoading } from "../../hooks/useLoading";

const PageStaffDetailsAcompte = () => {
  const { idAcompte } = useParams();
  const [acompte, setAcompte] = useState<Acompte | null>();
  const { loading, setLoading } = useLoading();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [acompteResponse] = await Promise.all([
          AcompteService.getById(idAcompte!),
        ]);

        if (acompteResponse.status === 200) {
          setAcompte(acompteResponse.data.acompte);
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
      {acompte && !loading ? (
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
            <strong>Date de Paiement :</strong>{" "}
          </p>
          <p>
            <strong>Payeur :</strong>
          </p>
          <p>
            <strong>Contact du Payeur :</strong>
          </p>
          <p>
            <strong>Mode de Paiement :</strong>
          </p>

          <div className="flex justify-center mt-6">
            {/* Bouton pour accéder à la facture globale */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => navigate(`/staf/reservations//facture`)}
            >
              Voir la Facture Globale
            </button>
          </div>
        </div>
      ) : (
        <p className="text-slate-50">Chargement des détails de l'acompte...</p>
      )}
    </div>
  );
};

export default PageStaffDetailsAcompte;
