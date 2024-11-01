import AuthServices from "./AuthServices";
import {AxiosResponse} from "axios";
import api from "./axiosConfig.ts";

class RecetteService {
  private static accessToken: string | null = AuthServices.getTokenAccess()

  public static async getRecettesReferences(): Promise<AxiosResponse> {
    try {
      if (this.accessToken === null) {
        throw new Error("Token is missing");
      }
      const response = await api.get("/recettes/references", {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
      return response
    } catch (error) {
      console.error("Error fetching recettes:", error);
      throw error;
    }
  }
}

export default RecetteService