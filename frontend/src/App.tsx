import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useAuth } from "./hooks/useAuth";
import IndeterminateProgressBar from "./components/IndeterminateProgressBar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "material-symbols";
import { useLoading } from "./hooks/useLoading";
import { SalleProvider } from "./providers/SalleProvider";
import { PaymentMethodesProvider } from "./providers/PaymentMethodesProvider";
import { ReservationProvider } from "./providers/ReservationProvider";
import { PaymentMethodeFieldsProviders } from "./providers/PaymentMethodeFieldsProviders";

const App = () => {
  const { loading: authLoading } = useAuth();
  const { loading: globalLoading } = useLoading();
  // Create a client

  return (
    <SalleProvider>
      <PaymentMethodesProvider>
        <ReservationProvider>
          <PrimeReactProvider>
            {authLoading && <IndeterminateProgressBar />}
            <PaymentMethodeFieldsProviders>
              <div className="bg-gradient-to-t from-gradient-start to-gradient-end h-full w-full">
                {/* Header, navbar, or other shared components */}
                <NavBar />
                <div className="min-h-screen pt-14">
                  {globalLoading && <IndeterminateProgressBar />}
                  {/* Ajuster en fonction de la hauteur de la NavBar */}
                  <Outlet />
                </div>
              </div>
            </PaymentMethodeFieldsProviders>
          </PrimeReactProvider>
        </ReservationProvider>
      </PaymentMethodesProvider>
    </SalleProvider>
  );
};

export default App;
