import api from "./axiosConfig"; // Remplacez axios par votre instance api
import { BACKEND_URL } from "../constants/appContants";
import { AxiosResponse, isAxiosError } from "axios";

class UserServices {
  private static URL_API: string = `${BACKEND_URL}`;

  // Méthode pour récupérer un utilisateur
  public static async getAuthenticatedUser(
    tocken: string
  ): Promise<AxiosResponse> {
    try {
      // const token = AuthServices.getToken();

      if (!tocken) {
        throw new Error("Token is missing");
      }

      const response = await api.get(
        // Utilisez api ici
        `${UserServices.URL_API}/authenticated`,
        {
          headers: {
            Authorization: `Bearer ${tocken}`,
          },
        }
      );

      return response;
    } catch (error) {
      // Gestion des erreurs spécifiques
      if (isAxiosError(error) && error.response) {
        // Utilisez api.isAxiosError
        return error.response;
      }
      // Gestion des erreurs génériques
      throw new Error("Une erreur inattendue s'est produite");
    }
  }
}

export default UserServices;
