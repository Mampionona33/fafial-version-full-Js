import { useParams } from "react-router-dom";
import ReservationForm from "../../components/ReservationForm";
import { useEffect, useState } from "react";
import { useGetReservation } from "../../hooks/useGetReservation";
import {
  PayementStatut,
  ReservationFormulaireInterface,
} from "../../interfaces/ReservationInterface";

const StafDetailsReservation = () => {
  const { idReservation } = useParams();
  const [reservationData, setReservationData] = useState<
    ReservationFormulaireInterface | undefined
  >(undefined);
  const { getReservation } = useGetReservation(idReservation!);

  useEffect(() => {
    const fetchData = async () => {
      const reservation = await getReservation();
      if (reservation) {
        // Mettre à jour 'reservationData' avec les acomptes formatés
        const formatReservationData = {
          ...reservation,
          dateDebut: new Date(reservation.dateDebut)
            .toISOString()
            .split("T")[0],
          dateFin: new Date(reservation.dateFin).toISOString().split("T")[0],
          heureDebut: new Date(reservation.heureDebut).toLocaleTimeString(),
          heureFin: new Date(reservation.heureFin).toLocaleTimeString(),
          acomptes: {
            montant: 0,
            datePrevue: "",
            modePaiement: "",
            statut: "" as PayementStatut,
          },
        };
        setReservationData(formatReservationData);
      }
    };

    if (idReservation) {
      fetchData();
    }
  }, [idReservation, getReservation]);

  if (!idReservation) {
    return (
      <div>
        <p>Veuillez rentrer un identifiant de réservation valide</p>
      </div>
    );
  }

  return (
    <div>
      <ReservationForm reservationData={reservationData} />
    </div>
  );
};

export default StafDetailsReservation;
