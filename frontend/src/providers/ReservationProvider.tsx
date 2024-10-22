import React, { useEffect, useState } from "react";
import { ReservationInterface } from "../interfaces/ReservationInterface";
import ReservationService from "../services/ReservationService";
import { toast, ToastContainer } from "react-toastify";
import { ReservationContext } from "../contexts/ReservationContext";
import { useLoading } from "../hooks/useLoading";

export const ReservationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [reservations, setReservations] = useState<ReservationInterface[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setLoading, loading } = useLoading();

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const resp = await ReservationService.getAll();

        if (resp.status === 200) {
          console.log(resp.data);
          setReservations(resp.data.reservations);
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
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [setLoading]);

  console.log(loading);

  return (
    <ReservationContext.Provider
      value={{ reservations, error, setReservations }}
    >
      {children}
      <ToastContainer />
    </ReservationContext.Provider>
  );
};
