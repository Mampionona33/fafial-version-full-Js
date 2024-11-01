import api from "./axiosConfig"; 
import { BACKEND_URL } from "../constants/appContants";
import AuthServices from "./AuthServices";

class PaymentMethodesServices {
  static API_URL = `${BACKEND_URL}/payment-methodes`;

  public static async getAll() {
    try {
      const response = await api.get(this.API_URL, {
        // Utilisez api au lieu de axios
        headers: {
          Authorization: `Bearer ${AuthServices.getTokenAccess()}`,
        },
      });
      return response;
    } catch (error) {
      console.error(error); 
      throw error; 
    }
  }
}

export default PaymentMethodesServices;
