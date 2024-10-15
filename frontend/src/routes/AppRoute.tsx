import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";

const AppRoutes: React.FC = () => {
  const isAuthenticated = false;

  return (
    <Routes>
      {!isAuthenticated && (
        <>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
