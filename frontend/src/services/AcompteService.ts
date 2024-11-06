import { AxiosResponse } from "axios";
import AuthServices from "./AuthServices";
import api from "./axiosConfig";

class AcompteService {
  static ACOMPTE_API_PATH = "/acomptes";

  private static accessToken: string | null = AuthServices.getTokenAccess();

  public static async getAll({
    annee,
    mois,
    page,
  }: {
    annee: number;
    mois: number;
    page: number;
  }): Promise<AxiosResponse> {
    try {
      // Construire l'URL avec les paramètres dynamiques
      const url = `${this.ACOMPTE_API_PATH}/annee/${annee}/mois/${mois}/page/${page}/itemPage/10`;

      const resp = await api.get(url, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      console.log(resp);

      return resp;
    } catch (error) {
      console.error("Erreur lors de la récupération des acomptes", error);
      throw error;
    }
  }
}

export default AcompteService;
