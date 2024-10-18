import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RoleChecker from "../utils/RoleChecker";

const AuthRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  console.log("user", user);

  // Si l'utilisateur n'est pas authentifié
  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Si l'utilisateur est authentifié
  if (isAuthenticated && location.pathname === "/login") {
    // Récupérer les rôles de l'utilisateur
    const hasSuperAdminRole = RoleChecker.hasRole(user!, "superAdmin");
    const hasStafRole = RoleChecker.hasRole(user!, "staf");
    const hasFrontDeskRole = RoleChecker.hasRole(user!, "frontDesk");

    // Si l'utilisateur a plusieurs rôles, redirige vers une page de sélection
    const roles = [];
    if (hasSuperAdminRole) roles.push("superAdmin");
    if (hasStafRole) roles.push("staf");
    if (hasFrontDeskRole) roles.push("frontDesk");

    if (roles.length > 1 || hasSuperAdminRole) {
      return <Navigate to="/select-dashboard" state={{ from: location }} />;
    }

    // Redirection en fonction d'un rôle unique
    if (hasSuperAdminRole) {
      return (
        <Navigate to="/super-admin-dashboard" state={{ from: location }} />
      );
    }
    if (hasStafRole) {
      return <Navigate to="/staf-dashboard" state={{ from: location }} />;
    }
    if (hasFrontDeskRole) {
      return (
        <Navigate
          to="/front-desck-dashboard"
          state={{ from: location }}
          replace
        />
      );
    }
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  // Sinon, on rend les sous-composants (routes protégées)
  return <Outlet />;
};

export default AuthRedirect;
