import React, { useState, useEffect, ReactNode, useCallback } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";
import { LoginData } from "../interfaces/LoginDataInterface";
import AuthServices from "../services/AuthServices";
import { AxiosError } from "axios";
import UserServices from "../services/UserServices";
import { UserInterface } from "../interfaces/userInterface";
import { COOKIE_NAME, REFRESH_TOKEN_NAME } from "../constants/appContants";
import { ToastContainer, toast } from "react-toastify";

// Le provider AuthContext
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(false);

  // Fonction pour vérifier l'expiration du token
  const isTokenExpired = (token: string) => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now();
      const expirationTime = decoded.exp * 1000; // Convertir en ms
      return currentTime >= expirationTime;
    } catch (error) {
      console.error("Failed to decode token", error);
      return true;
    }
  };

  const logout = useCallback(async () => {
    // Cookies.remove(COOKIE_NAME);
    // Cookies.remove(REFRESH_TOKEN_NAME);
    const resp = await AuthServices.logout();
    // if()
    setIsAuthenticated(false);
    setUser(null);
  }, [setIsAuthenticated, setUser]);

  // Fonction pour rafraîchir le token
  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = Cookies.get(REFRESH_TOKEN_NAME);
      if (!refreshToken) return;

      const response = await AuthServices.refreshToken();
      if (response.status === 200) {
        const newAccessToken = response.data.accessToken;
        Cookies.set(COOKIE_NAME, newAccessToken);
        return newAccessToken;
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
    }
  }, [logout]);

  // Vérification du token et rafraîchissement si nécessaire
  useEffect(() => {
    const token = Cookies.get(COOKIE_NAME);

    if (token) {
      if (isTokenExpired(token)) {
        refreshToken().then((newToken) => {
          if (newToken) {
            authenticateUser(newToken);
          }
        });
      } else {
        authenticateUser(token);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [refreshToken]);

  // Fonction pour authentifier l'utilisateur après récupération du token
  const authenticateUser = async (token: string) => {
    try {
      const response = await UserServices.getAuthenticatedUser(token);
      if (response.status === 200) {
        const user = response.data.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Failed to authenticate user:", error);
      setIsAuthenticated(false);
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ status: number; data: LoginData } | undefined> => {
    setLoading(true);
    try {
      const response = await AuthServices.login(email, password);
      if (response.status === 200) {
        const { accessToken, refreshToken } = response.data;

        if (!accessToken || !refreshToken) {
          throw new Error("Login failed. Please try again.");
        }

        Cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        });

        Cookies.set(COOKIE_NAME, accessToken);

        await authenticateUser(accessToken);
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
