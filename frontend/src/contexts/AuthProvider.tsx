import React, { useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext"; // Import context and hook

import AuthServices, { LoginData } from "../services/AuthServices";

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
      // Appel à AuthServices.login pour obtenir le token et le stocker dans les cookies
      const respons = await AuthServices.login(email, password);
      console.log(respons);
      if (respons?.status === 200) {
        setIsAuthenticated(true);
      }
      return respons;
    } catch (error) {
      console.error("Login failed:", error);
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
