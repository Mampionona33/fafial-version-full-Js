import { BACKEND_URL } from "../constants/appContants";
import axios from "axios";
import AuthServices from "./AuthServices";

class SalleServices {
  public static async getAll() {
    try {
      const response = await axios.get(`${BACKEND_URL}/salles`, {
        headers: {
          Authorization: `Bearer ${AuthServices.getToken()}`,
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
