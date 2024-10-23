import React, { useEffect, useState } from "react";
import { ReservationInterface } from "../interfaces/ReservationInterface";
import ReservationService from "../services/ReservationService";
import { ReservationContext } from "../contexts/ReservationContext";
import { useLoading } from "../hooks/useLoading";

export const ReservationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [reservations, setReservations] = useState<ReservationInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const resp = await ReservationService.getAll();

        if (resp.status === 200) {
          setReservations(resp.data.reservations);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(
          "Une erreur est survenue lors de la recuperation des reservations"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [setLoading]);

  return (
    <ReservationContext.Provider
      value={{ reservations, error, setReservations }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
