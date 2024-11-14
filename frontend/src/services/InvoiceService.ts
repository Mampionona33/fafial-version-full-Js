import { AxiosResponse } from "axios";
import { ACCESS_TOKEN_NAME } from "../constants/appContants";
import api from "./axiosConfig";

class InvoiceService {
  public static async creatAcomptInvoice(
    acompteId: string
  ): Promise<AxiosResponse> {
    try {
      // Correction: Assurez-vous que les headers sont correctement envoyés
      const token = localStorage.getItem(ACCESS_TOKEN_NAME);

      if (!token) {
        throw new Error("Token non disponible, authentification requise.");
      }

      return await api.post(
        `/invoices/acompte/${acompteId}`,
        {}, // Pas de données dans le body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error;
    }
  }

  public static async getAcompteInvoice(id: string): Promise<AxiosResponse> {
    try {
      return await api.get(`/invoices/acompte/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`,
        },
      });
    } catch (error) {
      console.error("Error fetching invoice:", error);
      throw error;
    }
  }
}

export default InvoiceService;
