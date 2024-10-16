// App.tsx
import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <div className="bg-gradient-to-t from-gradient-start to-gradient-end h-full w-full">
      {/* Header, navbar, or other shared components */}
      <NavBar />
      <Outlet /> {/* This will render the child routes (like Login) */}
      {/* Footer or other shared components */}
    </div>
  );
};

export default App;
