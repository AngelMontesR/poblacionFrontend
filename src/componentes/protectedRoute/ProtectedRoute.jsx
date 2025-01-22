import React from "react";
import { Navigate } from "react-router-dom";
import { verificaLogin } from "../../services/auth";

const ProtectedRoute = ({ children }) => {
  const estaAutenticado = verificaLogin();

  return estaAutenticado ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
