import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { AuthProvider } from "./providers/AuthProvider";
import { SalleProvider } from "./providers/SalleProvider";
import { PaymentMethodesProvider } from "./providers/PaymentMethodesProvider";
import { ReservationProvider } from "./providers/ReservationProvider";
import LoadingProvider from "./providers/LoadingProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PrimeReactProvider>
        <LoadingProvider>
          <SalleProvider>
            <ReservationProvider>
              <PaymentMethodesProvider>
                <RouterProvider router={router} />
              </PaymentMethodesProvider>
            </ReservationProvider>
          </SalleProvider>
        </LoadingProvider>
      </PrimeReactProvider>
    </AuthProvider>
  </StrictMode>
);
