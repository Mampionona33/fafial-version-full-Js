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

  const refreshToken = useCallback(async () => {
    try {
      console.log("Refreshing token...");
      const pathname = window.location.pathname;
      if (pathname === "/login") return;
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

  useEffect(() => {
    const scheduleTokenRefresh = () => {
      if (accessToken) {
        try {
          const decodedToken: { exp: number } = jwtDecode(accessToken);
          const expirationTime = decodedToken.exp * 1000;
          const currentTime = Date.now();
          const anticipatedTime = expirationTime - EXPIRATION_BUFFER;

          // Calculate the delay before refreshing the token
          const delay = anticipatedTime - currentTime;

          // Debug logs to verify the values
          console.log("Access Token:", accessToken);
          console.log("Expiration Time (ms):", expirationTime);
          console.log("Current Time (ms):", currentTime);
          console.log("Anticipated Time (ms):", anticipatedTime);
          console.log("Calculated Delay (ms):", delay);

          // Check the condition
          if (delay > 0) {
            let countdown = Math.floor(delay / 1000); // Convert delay to seconds
            console.log(`Token will refresh in ${countdown} seconds`);

            // Create an interval to count down every second
            const countdownInterval = setInterval(() => {
              countdown -= 1;
              console.log(`Time until token refresh: ${countdown} seconds`);

              // Stop the countdown when it reaches 0
              if (countdown <= 0) {
                clearInterval(countdownInterval);
              }
            }, 1000);

            // Schedule a one-time refresh when the anticipated time is reached
            const timeoutId = setTimeout(async () => {
              console.log("Refreshing token...");
              clearInterval(countdownInterval); // Clear the countdown interval when refreshing
              clearTimeout(timeoutId);

              await refreshToken();
            }, delay);

            // Cleanup function to clear timeout and interval if component unmounts
            return () => {
              clearTimeout(timeoutId);
              clearInterval(countdownInterval);
            };
          } else {
            // Refresh token immediately if it's already past the anticipated time
            console.log(
              "Immediate token refresh due to expired or login page."
            );
            refreshToken();
          }
        } catch (error) {
          console.error("Failed to decode the access token:", error);
          refreshToken(); // Attempt to refresh if decoding fails
        }
      }
    };

    // Handle user state if user data is retrieved successfully
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
