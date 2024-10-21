import ReservationService from "../services/ReservationService";

export const useGetReservation = (id: string) => {
  const getReservation = async () => {
    try {
      const response = await ReservationService.get(id);
      if (response.status === 200) {
        return response.data.reservation;
      }
      if (response.status === 404) {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return { getReservation };
};
