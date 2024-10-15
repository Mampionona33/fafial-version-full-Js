// App.tsx
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* Header, navbar, or other shared components */}
      <Outlet /> {/* This will render the child routes (like Login) */}
      {/* Footer or other shared components */}
    </div>
  );
};

export default App;
