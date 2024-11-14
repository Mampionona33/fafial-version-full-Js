import { AxiosResponse } from "axios";
import { ACCESS_TOKEN_NAME } from "../constants/appContants";
import api from "./axiosConfig";

class InvoiceService {
  public static async creatAcomptInvoice(
    acompteId: string
  ): Promise<AxiosResponse> {
    try {
      return await api.post(`/invoices/acompte/${acompteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
        },
      });
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error;
    }
  }
}

export default InvoiceService;
