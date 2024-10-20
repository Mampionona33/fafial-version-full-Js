import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { AuthProvider } from "./providers/AuthProvider";
import { SalleProvider } from "./providers/SalleProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PrimeReactProvider>
        <SalleProvider>
          <RouterProvider router={router} />
        </SalleProvider>
      </PrimeReactProvider>
    </AuthProvider>
  </StrictMode>
);
