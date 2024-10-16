import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

interface AuthRedirectProps {
  children: ReactNode;
}

const AuthRedirect = ({ children }: AuthRedirectProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  console.log("isAuthenticated: ", isAuthenticated);

  // Redirection si authentifié et à la racine ou sur la page de login
  if (
    isAuthenticated &&
    (location.pathname === "/" || location.pathname === "/login")
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthRedirect;
