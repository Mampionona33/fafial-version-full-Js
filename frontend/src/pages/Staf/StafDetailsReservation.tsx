import { useParams } from "react-router-dom";
import ReservationForm from "../../components/ReservationForm";
import { useEffect, useState } from "react";
import { useGetReservation } from "../../hooks/useGetReservation";
import { ReservationInterface } from "../../interfaces/ReservationInterface";

const StafDetailsReservation = () => {
  const { idReservation } = useParams();
  const [reservationData, setReservationData] =
    useState<ReservationInterface | null>(null);
  const { getReservation } = useGetReservation(idReservation!);

  useEffect(() => {
    const fetchData = async () => {
      const reservation = await getReservation();
      if (reservation) {
        setReservationData(reservation);
      }
    };
    if (idReservation) {
      fetchData();
    }
  }, [getReservation, idReservation]);

  if (!idReservation) {
    return (
      <div>
        <p>Veuillez rentrer un identifiant de reservation valide</p>
      </div>
    );
  }

  return (
    <div>
      {reservationData && <ReservationForm reservationData={reservationData} />}
    </div>
  );
};

export default StafDetailsReservation;
