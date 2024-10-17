import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL, COOKIE_NAME } from "../constants/appContants";
import { LoginData } from "../../interfaces/LoginDataInterface";

class AuthServices {
  private static URL_API: string;
  private static COOKIE_NAME: string;

  static {
    AuthServices.URL_API = BACKEND_URL;
    AuthServices.COOKIE_NAME = COOKIE_NAME;
  }

  // Login function to authenticate and store the token in a cookie
  public static async login(
    email: string,
    password: string
  ): Promise<{ status: number; data: LoginData }> {
    try {
      const response = await axios.post(`${AuthServices.URL_API}/login`, {
        email,
        password,
      });

      Cookies.set(AuthServices.COOKIE_NAME, response.data.token, {
        expires: 7, // Cookie expires in 7 days
        sameSite: "Strict",
      });

      return {
        status: response.status,
        data: response.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return {
            status: error.response.status,
            data: error.response.data,
          };
        }
      }
      throw new Error("An unexpected error occurred");
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
}

export default AuthServices;
