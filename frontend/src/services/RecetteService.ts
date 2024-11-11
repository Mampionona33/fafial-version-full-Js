import AuthServices from "./AuthServices";
import { AxiosResponse } from "axios";
import api from "./axiosConfig.ts";
import { ACCESS_TOKEN_NAME } from "../constants/appContants.ts";

class RecetteService {

  public static async getRecettesReferences(): Promise<AxiosResponse> {
    try {
      return await api.get("/recettes/references", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
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
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
        },
      });
    } catch (error) {
      console.error("Error creating recette:", error);
      throw error;
    }
  }
}

export default RecetteService;
