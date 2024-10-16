import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthRedirect = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Si l'utilisateur n'est pas authentifie, on redirige vers la page de login
  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" state={{ from: location }} />;
  } else if (isAuthenticated && location.pathname === "/login") {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }

  // Sinon, on rend les sous-composants
  return <Outlet />;
};

export default AuthRedirect;
