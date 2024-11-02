import AuthServices from "./AuthServices";
import {AxiosResponse} from "axios";
import api from "./axiosConfig.ts";

class RecetteService {
  private static accessToken: string | null = AuthServices.getTokenAccess()

  public static async getRecettesReferences(): Promise<AxiosResponse> {
    try {
      return await api.get("/recettes/references", {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    } catch (error) {
      console.error("Error fetching recettes:", error);
      throw error;
    }
  }

  public static async createRecette(recetteData: any): Promise<AxiosResponse> {
    try {
      return await api.post("/recettes", recetteData, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    } catch (error) {
      console.error("Error creating recette:", error);
      throw error;
    }
  }
}

export default RecetteService