// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { PrimeReactProvider } from "primereact/api";
import "./App.css";
// import AppCalendar from "./components/AppCalendar";
import Reservation from "./pages/Reservation";
import "primereact/resources/primereact.min.css";

function App() {
  return (
    <>
      <PrimeReactProvider>
        <div className="w-screen p-4 h-full bg-gradient-to-t from-gradient-start to-gradient-end">
          {/* <AppCalendar /> */}
          <Reservation />
        </div>
      </PrimeReactProvider>
    </>
  );
}

export default App;
