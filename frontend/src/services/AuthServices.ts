import axios from "axios";
import Cookies from "js-cookie";

class AuthServices {
  private static URL_API: string;
  private static COOKIE_NAME = "auth_token";

  // Static block for initializing static properties
  static {
    AuthServices.URL_API = `${import.meta.env.VITE_API_END_POINT}/api/v1`;
  }

  // Login function to authenticate and store the token in a cookie
  public static async login(email: string, password: string) {
    try {
      // Make the request to the API endpoint
      const response = await axios.post(`${AuthServices.URL_API}/login`, {
        email,
        password,
      });

      // Store the JWT token in a cookie
      Cookies.set(AuthServices.COOKIE_NAME, response.data.token, {
        expires: 7, // Cookie expires in 7 days
        // secure: process.env.NODE_ENV === "production", // Only sent over HTTPS in production
        sameSite: "Strict", // Prevent CSRF
      });

      return response.data; // Return the response data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(
            `API Error: ${error.response.data.message || "Unknown error"}`
          );
        } else if (error.request) {
          throw new Error("No response received from the API");
        }
      }

      // Throw generic error message for non-Axios errors
      throw new Error(
        `Unknown Error: ${
          (error as Error).message || "An unexpected error occurred"
        }`
      );
    }
  }

  // Function to check if the user is authenticated by reading the token from the cookie
  public static isAuthenticated(): boolean {
    const token = Cookies.get(AuthServices.COOKIE_NAME);
    return !!token; // Return true if token exists, false otherwise
  }

  // Function to log out the user by removing the cookie
  public static logout() {
    Cookies.remove(AuthServices.COOKIE_NAME);
  }

  // Function to get the stored token
  public static getToken(): string | undefined {
    return Cookies.get(AuthServices.COOKIE_NAME);
  }
}

export default AuthServices;
