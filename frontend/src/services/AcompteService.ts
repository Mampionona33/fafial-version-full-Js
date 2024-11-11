import { AxiosResponse } from "axios";
import api from "./axiosConfig";
import { ACCESS_TOKEN_NAME } from "../constants/appContants";
import { Acompte } from "../interfaces/AcompteInterface";

class AcompteService {
  static ACOMPTE_API_PATH = "/acomptes";

  public static async getAll({
    annee,
    mois,
    page,
    pageSize,
  }: {
    annee: number;
    mois: number;
    page: number;
    pageSize: number;
  }): Promise<AxiosResponse> {
    try {
      // Construire les search params (paramètres de la requête) dynamiquement
      const searchParams = new URLSearchParams({
        annee: String(annee),
        mois: String(mois),
        page: String(page),
        pageSize: String(pageSize),
      });

      // Construire l'URL avec les search params
      const url = `${this.ACOMPTE_API_PATH}?${searchParams.toString()}`;

      // Faire la requête API avec le header d'Authorization
      const resp = await api.get(url, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      return resp;
    } catch (error) {
      console.error("Erreur lors de la récupération des acomptes", error);
      throw error;
    }
  }

  public static async getById(id: string): Promise<AxiosResponse> {
    try {
      const response = await api.get(`${this.ACOMPTE_API_PATH}/${id}`, {
        // Utilisez api ici
        headers: {
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'acompte", error);
      throw error;
    }
  }

  private static getToken() {
    return localStorage.getItem(ACCESS_TOKEN_NAME);
  }

  public static updateAcompte(acompte: Acompte): Promise<AxiosResponse> {
    try {
      return api.put(`${this.ACOMPTE_API_PATH}/${acompte.id}`, acompte, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
        },
      });
    } catch (error) {
      console.error("Error updating acompte:", error);
      throw error;
    }
  }
}

export default AcompteService;
