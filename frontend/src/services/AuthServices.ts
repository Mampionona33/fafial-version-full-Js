import Cookies from "js-cookie";
import api from "./axiosConfig"; // Importez votre instance api
import {
  REFRESH_TOKEN_NAME,
  ACCESS_TOKEN_NAME,
} from "../constants/appContants";
import { AxiosResponse, isAxiosError } from "axios"; // Importez isAxiosError

class AuthServices {
  private static ACCESS_TOKEN_NAME: string;
  private static REFRESH_TOKEN_NAME: string;

  static {
    AuthServices.ACCESS_TOKEN_NAME = ACCESS_TOKEN_NAME;
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

      return response;
    } catch (error) {
      // Utilisez isAxiosError importé ici
      if (isAxiosError(error)) {
        if (error.response) {
          return error.response;
        }
      }
      throw new Error("Une erreur inattendue s'est produite");
    }
  }

  public static isAuthenticated(): boolean {
    const token = localStorage.getItem(AuthServices.ACCESS_TOKEN_NAME);
    return !!token;
  }

  public static async logout(): Promise<AxiosResponse> {
    try {
      const refreshToken = Cookies.get(REFRESH_TOKEN_NAME);

      const resp = await api.post("/logout", {
        refreshToken,
      });

      return resp;
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }

  public static getTokenAccess(): string | null {
    return localStorage.getItem(AuthServices.ACCESS_TOKEN_NAME);
  }

  public static getRefreshToken(): string | undefined {
    return Cookies.get(AuthServices.REFRESH_TOKEN_NAME);
  }

  public static setTokenAccess(token: string): void {
    localStorage.setItem(AuthServices.ACCESS_TOKEN_NAME, token);
  }

  public static removeAccessToken(): void {
    localStorage.removeItem(AuthServices.ACCESS_TOKEN_NAME);
  }

  static async refreshToken(): Promise<AxiosResponse> {
    const refreshToken = Cookies.get(REFRESH_TOKEN_NAME);
    const response = await api.post("/refresh-token", { refreshToken });
    return response;
  }
}

export default AuthServices;
