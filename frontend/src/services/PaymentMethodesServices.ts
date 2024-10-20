import axios from "axios";
import { BACKEND_URL } from "../constants/appContants";
import AuthServices from "./AuthServices";

class PaymentMethodesServices {
  static API_URL = `${BACKEND_URL}/payment-methodes`;

  public static async getAll() {
    try {
      const response = await axios.get(this.API_URL, {
        headers: {
          Authorization: `Bearer ${AuthServices.getToken()}`,
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
