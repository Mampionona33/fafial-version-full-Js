// src/services/AuthServices.js
import Cookies from "js-cookie";
import api from "./axiosConfig"; // Importez votre instance api
import { COOKIE_NAME, REFRESH_TOKEN_NAME } from "../constants/appContants";
import { AxiosResponse, isAxiosError } from "axios"; // Importez isAxiosError

class AuthServices {
  private static COOKIE_NAME: string;

  static {
    AuthServices.COOKIE_NAME = COOKIE_NAME;
  }

  // Fonction de connexion pour authentifier et stocker le token dans un cookie
  public static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      Cookies.set(AuthServices.COOKIE_NAME, response.data.token, {
        expires: 7, // Le cookie expire dans 7 jours
        sameSite: "Strict",
      });

      return response;
    } catch (error) {
      // Utilisez isAxiosError importé ici
      if (isAxiosError(error)) {
        // Vérifiez si l'erreur est une erreur Axios
        if (error.response) {
          return error.response;
        }
      }
      throw new Error("Une erreur inattendue s'est produite");
    }
  }

  public static isAuthenticated(): boolean {
    const token = Cookies.get(AuthServices.COOKIE_NAME);
    return !!token;
  }

  public static logout() {
    Cookies.remove(AuthServices.COOKIE_NAME);
  }

  public static getToken(): string | undefined {
    return Cookies.get(AuthServices.COOKIE_NAME);
  }

  static async refreshToken(): Promise<AxiosResponse> {
    const refreshToken = Cookies.get(REFRESH_TOKEN_NAME);
    const response = await api.post("/refresh-token", { refreshToken });
    return response;
  }
}

export default AuthServices;
