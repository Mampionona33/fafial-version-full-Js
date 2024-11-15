import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { AuthProvider } from "./providers/AuthProvider";
import "react-toastify/dist/ReactToastify.css";

import LoadingProvider from "./providers/LoadingProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PrimeReactProvider>
          <LoadingProvider>
            <RouterProvider router={router} />
          </LoadingProvider>
        </PrimeReactProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
