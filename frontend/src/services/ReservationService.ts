import api from "./axiosConfig"; // Importez votre instance api
import { ReservationInterface } from "../interfaces/ReservationInterface";
import AuthServices from "./AuthServices";
import { AxiosResponse } from "axios";

class ReservationService {
  static API_URL: string = `/reservations`;

  // Méthode pour obtenir le token
  private static getToken() {
    return AuthServices.getTokenAccess();
  }

  // Méthode pour obtenir toutes les réservations
  static async getAll(): Promise<AxiosResponse> {
    try {
      const response = await api.get(this.API_URL, {
        // Utilisez api ici
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations", error);
      throw error;
    }
  }

  static async get(id: string): Promise<AxiosResponse> {
    try {
      const response = await api.get(`${this.API_URL}/${id}`, {
        // Utilisez api ici
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de la sélection de la réservation", error);
      throw error;
    }
  }

  // Méthode pour créer une nouvelle réservation
  static async create(
    reservationData: ReservationInterface
  ): Promise<AxiosResponse> {
    try {
      const response = await api.post(this.API_URL, reservationData, {
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
  ): Promise<AxiosResponse> {
    try {
      const response = await api.put(`${this.API_URL}/${id}`, reservationData, {
        // Utilisez api ici
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réservation", error);
      throw error;
    }
  }

  // Méthode pour supprimer une réservation
  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`${this.API_URL}/${id}`, {
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
