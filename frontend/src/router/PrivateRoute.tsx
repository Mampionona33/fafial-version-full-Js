import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Cookies from "js-cookie";
import { REFRESH_TOKEN_NAME} from "../constants/appContants";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const token = Cookies.get(REFRESH_TOKEN_NAME);

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (user) {
    // Vérifier si l'utilisateur a l'un des rôles autorisés
    const hasAccess = user?.roles.some((role: { name: string }) =>
      allowedRoles.includes(role.name)
    );
    // Si l'utilisateur n'a pas le rôle approprié, rediriger vers une page d'erreur ou d'accès refusé
    if (!hasAccess) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
