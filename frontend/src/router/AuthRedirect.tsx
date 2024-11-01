import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import RoleChecker from "../utils/RoleChecker";
import Cookies from "js-cookie";
import { REFRESH_TOKEN_NAME } from "../constants/appContants";

const AuthRedirect = () => {
  const { user } = useAuth();
  const location = useLocation();
  const token = Cookies.get(REFRESH_TOKEN_NAME);

  // Si l'utilisateur n'est pas authentifié
  if (!token) {
    return location.pathname === "/login" ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} />
    );
  }


  // Si l'utilisateur est authentifié
  if (user) {
    // Récupérer les rôles de l'utilisateur
    const hasSuperAdminRole = RoleChecker.hasRole(user, "superAdmin");
    const hasStafRole = RoleChecker.hasRole(user, "staf");
    const hasFrontDeskRole = RoleChecker.hasRole(user, "frontDesk");

    // Créer une liste de rôles
    const roles = [];
    if (hasSuperAdminRole) roles.push("superAdmin");
    if (hasStafRole) roles.push("staf");
    if (hasFrontDeskRole) roles.push("frontDesk");

    // Redirection depuis la page de connexion
    if (location.pathname === "/login" || location.pathname === "/") {
      if (roles.length > 1 || hasSuperAdminRole) {
        return <Navigate to="/select-dashboard" state={{ from: location }} />;
      }

      // Redirection en fonction d'un rôle unique
      if (hasSuperAdminRole) {
        return (
          <Navigate to="/super-admin/dashboard" state={{ from: location }} />
        );
      }
      if (hasStafRole) {
        return <Navigate to="/staf/dashboard" state={{ from: location }} />;
      }
      if (hasFrontDeskRole) {
        return (
          <Navigate to="/front-desck/dashboard" state={{ from: location }} />
        );
      }
    }

    // Si l'utilisateur est déjà sur une page protégée, afficher le contenu
    return <Outlet />;
  }

  // Par défaut, afficher le contenu si le token existe mais l'utilisateur n'est pas encore défini
  return <Outlet />;
};

export default AuthRedirect;
