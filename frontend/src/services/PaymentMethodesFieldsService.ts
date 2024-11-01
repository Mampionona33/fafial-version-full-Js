import {AxiosResponse} from "axios";
import api from "./axiosConfig";
import AuthServices from "./AuthServices";

class PaymentMethodesFieldsService {
  private static accessToken: string | null = AuthServices.getTokenAccess();

  public static async getFiledByPaymentsMethodsId<T>(
    id: T
  ): Promise<AxiosResponse> {
    try {
      return await api.get(`/payment-methodes-fields/${id}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

    } catch (error) {
      console.error("Error fetching payment method fields:", error);
      throw error;
    }
  }
}

export default PaymentMethodesFieldsService;
