import { AxiosResponse } from "axios";
import api from "./axiosConfig";
import AuthServices from "./AuthServices";

class PaymentMethodesFieldsService {
  private static accessToken: string | null = AuthServices.getTokenAccess();

  public static async getFiledByPaymentsMethodesId<T>(
    id: T
  ): Promise<AxiosResponse> {
    try {
      if (this.accessToken === null) {
        throw new Error("Token is missing");
      }

      const response = await api.get(`/payment-methodes-fields/${id}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error("Error fetching payment method fields:", error);
      throw error;
    }
  }
}

export default PaymentMethodesFieldsService;
