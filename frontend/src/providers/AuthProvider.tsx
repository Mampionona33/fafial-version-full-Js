import React, { useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../contexts/AuthContext";
import { LoginData } from "../interfaces/LoginDataInterface";
import AuthServices from "../services/AuthServices";
import { AxiosError } from "axios";
import UserServices from "../services/UserServices";
import { UserInterface } from "../interfaces/userInterface";
import { COOKIE_NAME } from "../constants/appContants";
import { ToastContainer, toast } from "react-toastify";

// Le provider AuthContext
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setSuser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(false);

  // Vérification de l'utilisateur dans les cookies et localStorage
  useEffect(() => {
    const token = Cookies.get(COOKIE_NAME);

    // Si un token est présent dans les cookies, on essaie de récupérer l'utilisateur
    if (token) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setSuser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ status: number; data: LoginData } | undefined> => {
    setLoading(true);
    try {
      const response = await AuthServices.login(email, password);
      if (response.status === 200) {
        const resp = await UserServices.getAuthenticatedUser();

        if (resp.status === 200) {
          const user = resp.data.user;
          setSuser(user);
          localStorage.setItem("user", JSON.stringify(user));
        }

        Cookies.set(COOKIE_NAME, response.data.token);
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
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    Cookies.remove(COOKIE_NAME);
    setIsAuthenticated(false);
    setSuser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login: login as (
          email: string,
          password: string
        ) => Promise<{ status: number; data: LoginData } | undefined>,
        logout,
      }}
    >
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};
