import React, {useState, useEffect, ReactNode, useCallback} from "react";
import Cookies from "js-cookie";
import {AuthContext} from "../contexts/AuthContext";
import {LoginData} from "../interfaces/LoginDataInterface";
import AuthServices from "../services/AuthServices";
import {AxiosError} from "axios";
import UserServices from "../services/UserServices";
import {UserInterface} from "../interfaces/userInterface";
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  EXPIRATION_BUFFER,
} from "../constants/appContants";
import {jwtDecode} from "jwt-decode";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
                                                                  children,
                                                                }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(false);

  // Fonction pour vérifier si le token d'accès est expiré
  const isAccessTokenExpired = useCallback(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
    if (accessToken) {
      try {
        const decodedToken: { exp: number } = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000; // Convertir l'expiration en ms
        const currentTime = Date.now();
        const anticipatingTime = expirationTime - EXPIRATION_BUFFER; // Anticipation
        return currentTime > anticipatingTime; // Si le token a expiré
      } catch (error) {
        console.error("Failed to decode token", error);
        return true; // Considérer comme expiré en cas d'échec
      }
    }
    return true; // Si pas de token, considérer comme expiré
  }, []);

  // Fonction pour rafraîchir le token
  const refreshToken = useCallback(async () => {
    try {
      const resp = await AuthServices.refreshToken();
      if (resp.status === 200) {
        const {accessToken} = resp.data;
        localStorage.setItem(ACCESS_TOKEN_NAME, accessToken); // Mettre à jour le token
        return accessToken; // Retourner le nouveau token
      } else if (resp.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem(ACCESS_TOKEN_NAME); // Retirer le token si non autorisé
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
    return null;
  }, []);

  // Vérification de l'authentification lors du montage du composant
  useEffect(() => {
    let tokenRefreshInterval: NodeJS.Timeout;

    const checkAuthStatus = async () => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
      const refreshTokenCookie = Cookies.get(REFRESH_TOKEN_NAME);

      if (isAccessTokenExpired() && isAuthenticated) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          const userResponse = await UserServices.getAuthenticatedUser(
            newAccessToken
          );
          if (userResponse.status === 200) {
            const user = userResponse.data.user;
            setUser(user);
            localStorage.setItem("user", JSON.stringify(user));
            setIsAuthenticated(true);
          }
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem("user");
        }
      } else if (accessToken && refreshTokenCookie) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("user");
      }
    };

    checkAuthStatus();

    if (isAuthenticated) {
      const accessToken = AuthServices.getTokenAccess();
      if (accessToken) {
        const decodedToken: { exp: number } = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const anticipatedTime = expirationTime - EXPIRATION_BUFFER;
        tokenRefreshInterval = setInterval(async () => {
          console.log("Refreshing token...");
          await refreshToken();
        }, anticipatedTime - currentTime);
      }
    }

    return () => clearInterval(tokenRefreshInterval);
  }, [isAccessTokenExpired, refreshToken, isAuthenticated]);

  // Fonction de connexion
  const login = async (
    email: string,
    password: string
  ): Promise<{ status: number; data: LoginData } | undefined> => {
    setLoading(true);
    try {
      const response = await AuthServices.login(email, password);

      if (response.status === 200) {
        const {accessToken, refreshToken} = response.data;

        // Sauvegarder le token d'accès et le refresh token
        Cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
          path: "/",
        });

        // Récupérer les informations de l'utilisateur
        const userResponse = await UserServices.getAuthenticatedUser(
          accessToken
        );

        if (userResponse.status === 200) {
          const user = userResponse.data.user;
          setUser(user);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(user));
        }
      }

      return response;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        console.log("Unauthorized:", error);
        setIsAuthenticated(false);
      } else {
        console.error("Login failed:", error);
      }
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      const response = await AuthServices.logout();
      if (response.status === 200) {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("user");
        Cookies.remove(REFRESH_TOKEN_NAME);
        AuthServices.removeAccessToken();
      }
    } catch (error) {
      console.error("Logout failed:", error);
      AuthServices.removeAccessToken();
      window.location.href = "/login";
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
