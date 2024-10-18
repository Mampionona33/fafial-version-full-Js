import axios from "axios";
import { ReservationInterface } from "../interfaces/ReservationInterface";
import { BACKEND_URL } from "../constants/appContants";

class ReservationService {
  static API_URL = `${BACKEND_URL}/api/v1/reservations`;

  // Méthode pour obtenir toutes les réservations
  static async getReservations(): Promise<ReservationInterface[]> {
    try {
      const response = await axios.get(`${this.API_URL}`);
      return response.data as ReservationInterface[];
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations", error);
      throw error;
    }
  }

  // Méthode pour créer une nouvelle réservation
  static async createReservation(
    reservationData: ReservationInterface
  ): Promise<ReservationInterface> {
    try {
      const response = await axios.post(`${this.API_URL}`, reservationData);
      return response.data as ReservationInterface;
    } catch (error) {
      console.error("Erreur lors de la création de la réservation", error);
      throw error;
    }
  }

  // Méthode pour mettre à jour une réservation
  static async updateReservation(
    id: string,
    reservationData: ReservationInterface
  ): Promise<ReservationInterface> {
    try {
      const response = await axios.put(
        `${this.API_URL}/${id}`,
        reservationData
      );
      return response.data as ReservationInterface;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation", error);
      throw error;
    }
  }

  // Méthode pour supprimer une réservation
  static async deleteReservation(id: string): Promise<void> {
    try {
      await axios.delete(`${this.API_URL}/${id}`);
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation", error);
      throw error;
    }
  }
}

export default ReservationService;
