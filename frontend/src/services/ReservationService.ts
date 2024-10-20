import axios, { AxiosResponse } from "axios";
import { ReservationInterface } from "../interfaces/ReservationInterface";
import { BACKEND_URL } from "../constants/appContants";
import AuthServices from "./AuthServices";

class ReservationService {
  static API_URL = `${BACKEND_URL}/reservations`;

  // Méthode pour obtenir le token
  private static getToken() {
    return AuthServices.getToken();
  }

  // Méthode pour obtenir toutes les réservations
  static async getAll(): Promise<ReservationInterface[]> {
    try {
      const response = await axios.get(this.API_URL, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data as ReservationInterface[];
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations", error);
      throw error;
    }
  }

  // Méthode pour créer une nouvelle réservation
  static async create(
    reservationData: ReservationInterface
  ): Promise<
    AxiosResponse<{ message: string; reservation: ReservationInterface }>
  > {
    try {
      const response = await axios.post(this.API_URL, reservationData, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de la création de la réservation", error);
      throw error;
    }
  }

  // Méthode pour mettre à jour une réservation
  static async update(
    id: string,
    reservationData: ReservationInterface
  ): Promise<ReservationInterface> {
    try {
      const response = await axios.put(
        `${this.API_URL}/${id}`,
        reservationData,
        {
          headers: {
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );
      return response.data as ReservationInterface;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation", error);
      throw error;
    }
  }

  // Méthode pour supprimer une réservation
  static async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${this.API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de la réservation", error);
      throw error;
    }
  }
}

export default ReservationService;
