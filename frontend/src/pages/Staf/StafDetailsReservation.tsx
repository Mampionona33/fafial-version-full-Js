import { useNavigate, useParams } from "react-router-dom";
import ReservationForm from "../../components/ReservationForm";
import { useEffect, useState } from "react";
import {
  Acompte,
  PayementStatut,
  ReservationFormulaireInterface,
} from "../../interfaces/ReservationInterface";
import ReservationService from "../../services/ReservationService";
import IndeterminateProgressBar from "../../components/IndeterminateProgressBar";
import NotFound from "../NotFound";
import { AxiosError } from "axios";
import { usePaymentMethodes } from "../../hooks/usePaymentMethodes";

const StafDetailsReservation = () => {
  const { idReservation } = useParams();
  const [reservationData, setReservationData] = useState<
    ReservationFormulaireInterface | undefined
  >(undefined);
  const [acomptes_, setAcomptes_] = useState<Acompte[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { paymentMethodes } = usePaymentMethodes();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!idReservation) return;

        const resp = await ReservationService.get(idReservation);

        if (resp.status === 404) {
          setError("La reservation n'existe pas");
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

          // Format acomptes
          const acomptes = reservation?.acomptes || [];
          const acomptesFormatted = acomptes.map((acompte: Acompte) => ({
            ...acompte,
            modePaiement: paymentMethodes.find(
              (payment) => payment.id === acompte.modePaiement
            )?.name,
            datePrevue: new Date(acompte.datePrevue)
              .toISOString()
              .split("T")[0],
          }));

          console.log(acomptesFormatted);
          setAcomptes_(acomptesFormatted);
        }
      } catch (error) {
        if (error instanceof AxiosError && error.status === 404) {
          setError("La reservation n'existe pas");
        }
        setError(
          "Une erreur est survenue lors de la recuperation des reservations"
        );
      } finally {
        setLoading(false);
      }
    };

    if (idReservation) {
      fetchData();
    }
  }, [idReservation, navigate]);

  if (error) {
    return <NotFound />;
  }

  return (
    <div>
      {loading && (
        <div className="w-full col-span-1 md:col-span-2">
          <IndeterminateProgressBar />
        </div>
      )}
      <ReservationForm
        reservationData={reservationData}
        acomptes_={acomptes_}
        idReservationEdit={idReservation}
      />
    </div>
  );
};

export default StafDetailsReservation;
