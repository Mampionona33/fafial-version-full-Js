import { BACKEND_URL } from "../constants/appContants";
import api from "./axiosConfig"; // Importez votre instance api
import AuthServices from "./AuthServices";

class SalleServices {
  public static async getAll() {
    try {
      const response = await api.get(`${BACKEND_URL}/salles`, {
        // Utilisez api ici
        headers: {
          Authorization: `Bearer ${AuthServices.getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des salles", error);
      throw error;
    }
  }
}

export default SalleServices;
