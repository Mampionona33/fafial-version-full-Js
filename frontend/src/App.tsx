import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useAuth } from "./hooks/useAuth";
import IndeterminateProgressBar from "./components/IndeterminateProgressBar";

const App = () => {
  const { loading } = useAuth();
  return (
    <PrimeReactProvider>
      {loading && <IndeterminateProgressBar />}
      <div className="bg-gradient-to-t from-gradient-start to-gradient-end h-full w-full">
        {/* Header, navbar, or other shared components */}
        <NavBar />
        <Outlet /> {/* This will render the child routes (like Login) */}
        {/* Footer or other shared components */}
        <ToastContainer />
      </div>
    </PrimeReactProvider>
  );
};

export default App;
