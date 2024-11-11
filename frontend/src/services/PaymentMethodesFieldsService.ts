import { AxiosResponse } from "axios";
import api from "./axiosConfig";
import { ACCESS_TOKEN_NAME } from "../constants/appContants";

class PaymentMethodesFieldsService {
  public static async getFiledByPaymentsMethodsId<T>(
    id: T
  ): Promise<AxiosResponse> {
    try {
      return await api.get(`/payment-methodes-fields/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
        },
      });
    } catch (error) {
      console.error("Error fetching payment method fields:", error);
      throw error;
    }
  }
}

export default PaymentMethodesFieldsService;
