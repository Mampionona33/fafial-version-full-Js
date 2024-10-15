import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {
        <>
          <Route path="/*" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
        </>
      }
    </Routes>
  );
};

export default AppRoutes;
