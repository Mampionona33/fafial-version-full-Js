import React, { useEffect, useState } from "react";
import { ReservationInterface } from "../interfaces/ReservationInterface";
import ReservationService from "../services/ReservationService";
import { toast, ToastContainer } from "react-toastify";
import { ReservationContext } from "../contexts/ReservationContext";

export const ReservationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [reservations, setReservations] = useState<ReservationInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const resp = await ReservationService.getAll();

        if (resp.status === 200) {
          console.log(resp.data);
          setReservations(resp.data.reservations);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error(
          "Une erreur est survenue lors de la recuperation des reservations",
          {
            toastId: "error-reservation",
          }
        );
        setError(
          "Une erreur est survenue lors de la recuperation des reservations"
        );
      }
    };

    fetchReservations();
  }, []);

  return (
    <ReservationContext.Provider
      value={{ reservations, loading, error, setReservations }}
    >
      {children}
      <ToastContainer />
    </ReservationContext.Provider>
  );
};
