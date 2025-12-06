import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const userRole = localStorage.getItem("userRole");
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect to login and preserve attempted path
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
