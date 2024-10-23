import { BACKEND_URL } from "../constants/appContants";
import api from "./axiosConfig"; // Importez votre instance api
import AuthServices from "./AuthServices";
import { AxiosResponse } from "axios";

class SalleServices {
  public static async getAll(): Promise<AxiosResponse> {
    try {
      const response = await api.get(`${BACKEND_URL}/salles`, {
        // Utilisez api ici
        headers: {
          Authorization: `Bearer ${AuthServices.getTokenAccess()}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Erreur lors de la récupération des salles", error);
      throw error;
    }
  }
}

export default SalleServices;
