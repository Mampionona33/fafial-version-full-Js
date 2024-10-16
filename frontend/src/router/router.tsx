import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ProtectedRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import AuthRedirect from "./AuthRedirect";

// Create the routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Redirection vers login si non authentifié, sinon dashboard */}
      <Route
        index
        element={
          <AuthRedirect>
            <Login />
          </AuthRedirect>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        {/* Toutes les routes protégées */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

export default router;
