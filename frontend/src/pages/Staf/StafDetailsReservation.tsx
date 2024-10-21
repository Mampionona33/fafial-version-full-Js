import { useNavigate, useParams } from "react-router-dom";
import ReservationForm from "../../components/ReservationForm";
import { useEffect, useState } from "react";
import {
  PayementStatut,
  ReservationFormulaireInterface,
} from "../../interfaces/ReservationInterface";
import ReservationService from "../../services/ReservationService";
import IndeterminateProgressBar from "../../components/IndeterminateProgressBar";

const StafDetailsReservation = () => {
  const { idReservation } = useParams();
  const [reservationData, setReservationData] = useState<
    ReservationFormulaireInterface | undefined
  >(undefined);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!idReservation) return;

        const resp = await ReservationService.get(idReservation);

        if (resp.status === 404) {
          navigate("/staf/notFound");
          return;
        }

        if (resp.data.reservation) {
          const reservation = resp.data.reservation;

          // Format dates and times
          const formatReservationData = {
            ...reservation,
            dateDebut: new Date(reservation.dateDebut)
              .toISOString()
              .split("T")[0],
            dateFin: new Date(reservation.dateFin).toISOString().split("T")[0],
            heureDebut: new Date(reservation.heureDebut).toLocaleTimeString(
              "fr-FR",
              { hour: "2-digit", minute: "2-digit" }
            ),
            heureFin: new Date(reservation.heureFin).toLocaleTimeString(
              "fr-FR",
              { hour: "2-digit", minute: "2-digit" }
            ),
            acomptes: {
              montant: 0,
              datePrevue: "",
              modePaiement: "",
              statut: PayementStatut.EN_ATTENTE,
            },
          };
          setReservationData(formatReservationData);
        }
      } catch (error) {
        console.log("Error fetching reservation data:", error);
        navigate("/staf/notFound");
      } finally {
        setLoading(false);
      }
    };

    if (idReservation) {
      fetchData();
    }
  }, [idReservation, navigate]);

  return (
    <div>
      {loading && (
        <div className="w-full col-span-1 md:col-span-2">
          <IndeterminateProgressBar />
        </div>
      )}
      <ReservationForm reservationData={reservationData} />
    </div>
  );
};

export default StafDetailsReservation;
