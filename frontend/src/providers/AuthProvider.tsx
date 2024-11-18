import React, { useState, useEffect, ReactNode, useCallback } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../contexts/AuthContext";
import { LoginData } from "../interfaces/LoginDataInterface";
import AuthServices from "../services/AuthServices";
import { AxiosError } from "axios";
import UserServices from "../services/UserServices";
import { UserInterface } from "../interfaces/userInterface";
import {
  ACCESS_TOKEN_NAME,
  REFRESH_TOKEN_NAME,
  EXPIRATION_BUFFER,
} from "../constants/appContants";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery } from "@tanstack/react-query";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const isAccessTokenExpired = useCallback(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
    if (accessToken) {
      try {
        const decodedToken: { exp: number } = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const anticipatingTime = expirationTime - EXPIRATION_BUFFER;
        return currentTime > anticipatingTime;
      } catch (error) {
        console.error("Failed to decode token", error);
        return true;
      }
    }
    return true;
  }, []);

  // const refreshToken = useCallback(async () => {
  //   try {
  //     console.log("Refreshing token...");
  //     const resp = await AuthServices.refreshToken();
  //     if (resp.status === 200) {
  //       const { accessToken } = resp.data;
  //       localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
  //       console.log("Token refreshed:", accessToken); // Log pour vérifier le token rafraîchi
  //       return accessToken;
  //     } else if (resp.status === 401) {
  //       setIsAuthenticated(false);
  //       localStorage.removeItem(ACCESS_TOKEN_NAME);
  //       Cookies.remove(REFRESH_TOKEN_NAME);
  //     }
  //   } catch (error) {
  //     console.error("Token refresh failed:", error);
  //   }
  //   return null;
  // }, []);

  const refreshToken = useCallback(async () => {
    try {
      console.log("Refreshing token...");
      const resp = await AuthServices.refreshToken();
      if (resp.status === 200) {
        const { accessToken } = resp.data;
        localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
        setAccessToken(accessToken); // Update the access token in state
        console.log("Token refreshed:", accessToken);
        return accessToken;
      } else if (resp.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem(ACCESS_TOKEN_NAME);
        Cookies.remove(REFRESH_TOKEN_NAME);
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
    return null;
  }, []);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      AuthServices.login(email, password),
    onSuccess: (response) => {
      if (response?.status === 200) {
        const { accessToken, refreshToken } = response.data;
        Cookies.set(REFRESH_TOKEN_NAME, refreshToken, {
          expires: 7,
          sameSite: "Strict",
          secure: true,
          path: "/",
        });

        setAccessToken(accessToken);
        localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const { data: userResponse, isLoading: userLoading } = useQuery({
    queryKey: ["user", accessToken],
    queryFn: async () => {
      if (accessToken) {
        return UserServices.getAuthenticatedUser(accessToken);
      }
    },
    enabled: !!accessToken,
  });

  // useEffect(() => {
  //   let tokenRefreshInterval: NodeJS.Timeout;

  //   if (isAuthenticated && accessToken) {
  //     const decodedToken: { exp: number } = jwtDecode(accessToken);
  //     console.log("decodedToken", decodedToken);
  //     const expirationTime = decodedToken.exp * 1000;
  //     const currentTime = Date.now();
  //     console.log("expirationTime", expirationTime);
  //     const anticipatedTime = expirationTime - EXPIRATION_BUFFER;
  //     console.log("EXPIRATION_BUFFER", EXPIRATION_BUFFER);

  //     console.log(anticipatedTime, currentTime);

  //     if (anticipatedTime < currentTime) {
  //       tokenRefreshInterval = setInterval(async () => {
  //         console.log("Refreshing token...");
  //         await refreshToken();
  //       }, Math.max(0, anticipatedTime - currentTime));
  //     }
  //   }

  //   if (userResponse?.status === 200) {
  //     const user = userResponse.data.user;
  //     setUser(user);
  //     localStorage.setItem("user", JSON.stringify(user));
  //     setIsAuthenticated(true);
  //     setLoading(false);
  //   }

  //   const checkAuthStatus = async () => {
  //     const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
  //     const refreshTokenCookie = Cookies.get(REFRESH_TOKEN_NAME);

  //     if (isAccessTokenExpired() && isAuthenticated) {
  //       const newAccessToken = await refreshToken();
  //       if (newAccessToken) {
  //         const userResponse = await UserServices.getAuthenticatedUser(
  //           newAccessToken
  //         );
  //         if (userResponse.status === 200) {
  //           const user = userResponse.data.user;
  //           setUser(user);
  //           localStorage.setItem("user", JSON.stringify(user));
  //           setIsAuthenticated(true);
  //         }
  //       } else {
  //         setIsAuthenticated(false);
  //         localStorage.removeItem("user");
  //       }
  //     } else if (accessToken && refreshTokenCookie) {
  //       const storedUser = localStorage.getItem("user");
  //       if (storedUser) {
  //         setUser(JSON.parse(storedUser));
  //         setIsAuthenticated(true);
  //       }
  //     } else {
  //       setIsAuthenticated(false);
  //       localStorage.removeItem("user");
  //     }
  //   };

  //   checkAuthStatus();

  //   if (userLoading) {
  //     setLoading(true);
  //   }

  //   return () => clearInterval(tokenRefreshInterval);
  // }, [
  //   isAccessTokenExpired,
  //   refreshToken,
  //   isAuthenticated,
  //   userResponse,
  //   userLoading,
  //   accessToken,
  // ]);

  useEffect(() => {
    const scheduleTokenRefresh = () => {
      if (accessToken) {
        const decodedToken: { exp: number } = jwtDecode(accessToken);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const anticipatedTime = expirationTime - EXPIRATION_BUFFER;

        // Calculate the delay before refreshing the token
        const delay = anticipatedTime - currentTime;

        if (delay > 0) {
          // Schedule a one-time refresh when the anticipated time is reached
          const timeoutId = setTimeout(async () => {
            console.log("Refreshing token...");
            await refreshToken();
          }, delay);

          return () => clearTimeout(timeoutId);
        } else {
          // Refresh token immediately if it's already past the anticipated time
          refreshToken();
        }
      }
    };

    if (userResponse?.status === 200) {
      const user = userResponse.data.user;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
      setLoading(false);
    }

    if (userLoading) {
      setLoading(true);
    }

    scheduleTokenRefresh();
  }, [accessToken, isAuthenticated, refreshToken, userResponse, userLoading]);

  const login = async (
    email: string,
    password: string
  ): Promise<{ status: number; data: LoginData } | undefined> => {
    setLoading(true);
    try {
      loginMutation.mutate({ email, password });

      if (loginMutation.isSuccess && loginMutation.data?.data?.status === 200) {
        const { accessToken } = loginMutation.data.data;
        if (accessToken) {
          setAccessToken(accessToken);
          localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
        }
      }

      return loginMutation.data;
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
