// src/Services/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

// PrivateRoute component to protect routes
const PrivateRoute = ({ element }) => {
  // Check for authentication token
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  // If authenticated, render the element; otherwise, redirect to login
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
