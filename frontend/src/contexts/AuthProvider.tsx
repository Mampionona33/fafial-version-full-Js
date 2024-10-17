import React, { useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";
import { LoginData } from "../../interfaces/LoginDataInterface";
import AuthServices from "../services/AuthServices";
import { AxiosError } from "axios";
import UserServices from "../services/UserServices";
import { UserInterface } from "../../interfaces/userInterface";

// Le provider AuthContext
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setSuser] = useState<UserInterface | null>(null);

  useEffect(() => {
    const token = Cookies.get("auth_token");
    setIsAuthenticated(!!token); // Si le token existe, l'utilisateur est authentifié
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ status: number; data: LoginData } | undefined> => {
    try {
      const response = await AuthServices.login(email, password);

      if (response.status === 200) {
        const user = await UserServices.getAuthenticatedUser();

        if (user) {
          setSuser(user);
        }

        setIsAuthenticated(true);
      } else if (response.status === 401) {
        setIsAuthenticated(false);
        toast.error(
          response.data.message || "Unauthorized. Check your credentials."
        );
      }

      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error(
          error.response.data.message || "Unauthorized. Check your credentials."
        );
      } else {
        console.error("Login failed:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login: login as (
          email: string,
          password: string
        ) => Promise<{ status: number; data: LoginData } | undefined>,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
