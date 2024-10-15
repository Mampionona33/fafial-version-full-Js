import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { AuthProvider } from "./contexts/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </PrimeReactProvider>
  </StrictMode>
);
