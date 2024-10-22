import api from "./axiosConfig"; // Remplacez axios par votre instance api
import { BACKEND_URL } from "../constants/appContants";
import AuthServices from "./AuthServices";
import { isAxiosError } from "axios";

class UserServices {
  private static URL_API: string = `${BACKEND_URL}`;

  // Méthode pour récupérer un utilisateur
  public static async getAuthenticatedUser() {
    try {
      const token = AuthServices.getToken(); // Récupération dynamique du token à chaque appel

      if (!token) {
        throw new Error("Token is missing");
      }

      const response = await api.get(
        // Utilisez api ici
        `${UserServices.URL_API}/authenticated`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      // Gestion des erreurs spécifiques
      if (isAxiosError(error) && error.response) {
        // Utilisez api.isAxiosError
        return {
          status: error.response.status,
          data: error.response.data,
        };
      }
      // Gestion des erreurs génériques
      return {
        status: 500,
        data: {
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        },
      };
    }
  }
}

export default UserServices;
