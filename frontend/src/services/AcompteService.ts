import { AxiosResponse } from "axios";
import AuthServices from "./AuthServices";
import api from "./axiosConfig";

class AcompteService {
  static ACOMPTE_API_PATH = "/acomptes";

  private static accessToken: string | null = AuthServices.getTokenAccess();

  public static async getAll(): Promise<AxiosResponse> {
    try {
      return await api.get(this.ACOMPTE_API_PATH, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des acomptes", error);
      throw error;
    }
  }
}

export default AcompteService;
