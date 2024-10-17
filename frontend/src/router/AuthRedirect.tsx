import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AuthRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une page protégée
  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Si l'utilisateur est authentifié et essaie d'accéder à la page de login
  if (isAuthenticated && location.pathname === "/login") {
    // Vérification des rôles de l'utilisateur
    const hasSuperAdminRole = user?.roles.some(
      (role: { name: string }) => role.name === "superAdmin"
    );
    const hasStafRole = user?.roles.some(
      (role: { name: string }) => role.name === "staf"
    );
    const hasFrontDeskRole = user?.roles.some(
      (role: { name: string }) => role.name === "frontDesk"
    );

    // Redirection en fonction des rôles
    if (hasSuperAdminRole) {
      return (
        <Navigate to="/super-admin-dashboard" state={{ from: location }} />
      );
    } else if (hasStafRole) {
      return <Navigate to="/staf-dashboard" state={{ from: location }} />;
    } else if (hasFrontDeskRole) {
      return (
        <Navigate
          to="/front-desck-dashboard"
          state={{ from: location }}
          replace
        />
      );
    } else {
      return <Navigate to="/unauthorized" state={{ from: location }} />;
    }
  }

  // Sinon, on rend les sous-composants (routes protégées)
  return <Outlet />;
};

export default AuthRedirect;
