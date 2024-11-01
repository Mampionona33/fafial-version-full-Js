import React, { useEffect, useState } from "react";
import { ReservationInterface } from "../interfaces/ReservationInterface";
import ReservationService from "../services/ReservationService";
import { ReservationContext } from "../contexts/ReservationContext";
import { useLoading } from "../hooks/useLoading";
import AuthServices from "../services/AuthServices";

export const ReservationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [reservations, setReservations] = useState<ReservationInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();
  const accessToken = AuthServices.getTokenAccess();

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

    if (accessToken) {
      fetchReservations();
    }
  }, [setLoading, accessToken]);

  return (
    <ReservationContext.Provider
      value={{ reservations, error, setReservations }}
    >
      {children}
    </ReservationContext.Provider>
  );
};
