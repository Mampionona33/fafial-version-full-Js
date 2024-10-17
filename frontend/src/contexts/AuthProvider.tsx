import React, { useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

import AuthServices, { LoginData } from "../services/AuthServices";
import { AxiosError } from "axios";

// Le provider AuthContext
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
