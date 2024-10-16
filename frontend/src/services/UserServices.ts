import axios from "axios";
import { BACKEND_URL } from "../constants/appContants";
import AuthServices from "./AuthServices";

class UserServices {
  private static URL_API: string = `${BACKEND_URL}/users`;

  // Méthode pour récupérer un utilisateur
  public static async getUser() {
    try {
      const token = AuthServices.getToken(); // Récupération dynamique du token à chaque appel

      if (!token) {
        throw new Error("Token is missing");
      }

      const response = await axios.get(UserServices.URL_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      // Gestion des erreurs spécifiques
      if (axios.isAxiosError(error) && error.response) {
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
