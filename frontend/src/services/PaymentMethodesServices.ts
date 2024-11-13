import api from "./axiosConfig";
import { ACCESS_TOKEN_NAME, BACKEND_URL } from "../constants/appContants";
import AuthServices from "./AuthServices";
import { AxiosResponse } from "axios";

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

  public static async getById(id: string): Promise<AxiosResponse> {
    try {
      return await api.get(`${this.API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
        },
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default PaymentMethodesServices;
