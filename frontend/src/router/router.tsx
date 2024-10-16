import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ProtectedRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";

// Create the routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        {/* All other routes that you want to protect will go inside here */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

// You can't use `useAuth` directly outside a component, so you should wrap your Router with the Auth context or handle authentication checks inside components like ProtectedRoute.

export default router;
