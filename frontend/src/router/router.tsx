import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/Login";
import AuthRedirect from "./AuthRedirect";
import SuperAdminDashboard from "../pages/SuperAdmin/SuperAdmin.Dashboard";
import StafDashboard from "../pages/Staf/Staf.Dashboard";
import Unauthorized from "../pages/Unauthorized";
import App from "../App";
import ProtectedRoute from "./PrivateRoute";
import SelectDashboard from "../pages/SelectDashboard";
import FrontDesckDashboard from "../pages/FrontDesck/FrontDesck.Dashboard";
import StafCalendar from "../pages/Staf/StafCalendar";
import StafAjoutReservation from "../pages/Staf/StafAjoutReservation";
import StafDetailsReservation from "../pages/Staf/StafDetailsReservation";
import JournalCaisse from "../pages/JournalCaisse";
import AjoutEntree from "../pages/AjoutRecette";
import StaffPageListAcompt from "../pages/Staf/StaffPageListAcompt.tsx";

// Créer les routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthRedirect />}>
      {/* Page de connexion publique */}
      <Route path="/login" element={<Login />} />
      {/* Page pour les utilisateurs non autorisés */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Layout principal avec éléments communs */}
      <Route element={<App />}>
        {/* Pages protégées, nécessitant une authentification et des rôles spécifiques */}
        <Route path="/select-dashboard" element={<SelectDashboard />} />

        <Route
          element={<ProtectedRoute allowedRoles={["superAdmin", "staf"]} />}
        >
          {/* Route pour le tableau de bord Staf */}
          <Route path="/staf">
            <Route path="dashboard" element={<StafDashboard />} />
            <Route path="calendar">
              <Route path="" element={<StafCalendar />} />
              <Route
                path="reservations/:idReservation"
                element={<StafDetailsReservation />}
              />
            </Route>
            <Route path="acompte">
              <Route
                path="annee/:annee/mois/:mois/page/:page"
                element={<StaffPageListAcompt />}
              />
            </Route>
            <Route
              path="ajout-reservation"
              element={<StafAjoutReservation />}
            />
            <Route path="journal-des-caisses">
              <Route path="" element={<JournalCaisse />} />
              <Route path="ajout-entree" element={<AjoutEntree />} />
            </Route>
          </Route>
        </Route>

        {/* Page Admin uniquement accessible par les administrateurs */}
        <Route element={<ProtectedRoute allowedRoles={["superAdmin"]} />}>
          <Route path="/super-admin">
            <Route path="dashboard" element={<SuperAdminDashboard />} />
          </Route>
        </Route>

        {/* Page Front Desk accessible aux rôles frontDesk et superAdmin */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["frontDesk", "superAdmin"]} />
          }
        >
          <Route path="/front-desck">
            <Route path="dashboard" element={<FrontDesckDashboard />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default router;
