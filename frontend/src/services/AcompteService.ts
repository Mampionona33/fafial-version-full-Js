import { AxiosResponse } from "axios";
import api from "./axiosConfig";
import { ACCESS_TOKEN_NAME } from "../constants/appContants";

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

      const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);

      // Construire l'URL avec les search params
      const url = `${this.ACOMPTE_API_PATH}?${searchParams.toString()}`;

      // Faire la requête API avec le header d'Authorization
      const resp = await api.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return resp;
    } catch (error) {
      console.error("Erreur lors de la récupération des acomptes", error);
      throw error;
    }
  }
}

export default AcompteService;
