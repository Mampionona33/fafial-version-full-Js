import React from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoute";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

export const u = 12;
console.log("exporting u really screws up HMR :(", u);
const App = () => {
  return (
    <>
      <PrimeReactProvider>
        <AppRoutes />
      </PrimeReactProvider>
    </>
  );
};

export default App;
