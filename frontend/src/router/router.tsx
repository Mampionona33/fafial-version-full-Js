import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/Login";
import AuthRedirect from "./AuthRedirect";
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdmin.Dashboard";
import StafDashboard from "../pages/Staf/Staf.Dashboard";
import FrontDesckDashboard from "../pages/FrontDesck/FrontDesck.Dashboard";
import Unauthorized from "../pages/Unauthorized";
import App from "../App";
import ProtectedRoute from "./PrivateRoute";
import SelectDashboard from "../pages/SelectDashboard";

// Créer les routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthRedirect />}>
      {/* Page de connexion publique */}
      <Route path="/login" element={<Login />} />
      {/* Page pour les utilisateurs non autorisés */}
      <Route path="/unauthorized" element={<Unauthorized />} />{" "}
      {/* Correction ici */}
      {/* Entoure les pages protégées avec le layout principal, incluant les éléments communs comme l'en-tête, la barre de navigation et la sidebar pour toutes les pages protégées */}
      <Route element={<App />}>
        {/* Pages protégées, nécessitant une authentification et des rôles spécifiques */}
        <Route
          element={<ProtectedRoute allowedRoles={["superAdmin", "staf"]} />}
        >
          {/* Le tableau de bord est accessible aux rôles superAdmin et staf */}
          <Route path="/staf-dashboard" element={<StafDashboard />} />
        </Route>
        <Route path="/select-dashboard" element={<SelectDashboard />} />

        {/* Page Admin uniquement accessible par les administrateurs */}
        <Route element={<ProtectedRoute allowedRoles={["superAdmin"]} />}>
          <Route
            path="/super-admin-dashboard"
            element={<SuperAdminDashboard />}
          />
        </Route>

        {/* Page Front Desk accessible aux rôles frontDesk et superAdmin */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["frontDesk", "superAdmin"]} />
          }
        >
          <Route
            path="/front-desck-dashboard"
            element={<FrontDesckDashboard />}
          />
        </Route>
      </Route>
    </Route>
  )
);

export default router;
