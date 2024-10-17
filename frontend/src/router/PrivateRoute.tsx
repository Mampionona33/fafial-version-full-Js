import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Vérifier si l'utilisateur a l'un des rôles autorisés
  const hasAccess = user?.roles.some((role: { name: string }) =>
    allowedRoles.includes(role.name)
  );

  // Si l'utilisateur n'a pas le rôle approprié, rediriger vers une page d'erreur ou d'accès refusé
  if (!hasAccess) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
