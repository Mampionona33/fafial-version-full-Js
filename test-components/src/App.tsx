// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
// import AppCalendar from "./components/AppCalendar";
import Reservation from "./pages/Reservation";

function App() {
  return (
    <>
      <div className="w-screen p-4 h-full bg-gradient-to-t from-gradient-start to-gradient-end">
        {/* <AppCalendar /> */}
        <Reservation />
      </div>
    </>
  );
}

export default App;
