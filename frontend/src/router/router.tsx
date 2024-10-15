import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import ProtectedRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        {/* All other routes that you want to protect will go inside here */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

export default router;
