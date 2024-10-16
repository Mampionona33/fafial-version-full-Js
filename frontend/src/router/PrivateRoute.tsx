import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import App from "../App";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <App />;
};

export default ProtectedRoute;
