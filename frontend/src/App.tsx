import React from "react";
import { useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoute";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PrimeReactProvider>
        <AppRoutes />
      </PrimeReactProvider>
    </>
  );
}

export default App;
