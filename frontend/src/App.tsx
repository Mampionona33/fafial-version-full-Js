import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { useAuth } from "./hooks/useAuth";
import IndeterminateProgressBar from "./components/IndeterminateProgressBar";
import "primeicons/primeicons.css";
import "material-symbols";
import { useLoading } from "./hooks/useLoading";

const App = () => {
  const { loading: authLoading } = useAuth();
  const { loading: globalLoading } = useLoading();

  return (
    <PrimeReactProvider>
      {authLoading && <IndeterminateProgressBar />}
      <div className="bg-gradient-to-t from-gradient-start to-gradient-end h-full w-full">
        {/* Header, navbar, or other shared components */}
        <NavBar />
        <div className="min-h-screen pt-14">
          {globalLoading && <IndeterminateProgressBar />}
          {/* Ajuster en fonction de la hauteur de la NavBar */}
          <Outlet />
        </div>
      </div>
    </PrimeReactProvider>
  );
};

export default App;
