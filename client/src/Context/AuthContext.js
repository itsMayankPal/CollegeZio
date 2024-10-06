// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (userData) => {
    const response = await AuthService.login(userData);
    setUser(response.user); // Store user data
    localStorage.setItem("token", response.token); // Store token
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = await AuthService.getUserData(token); // Fetch user data
      setUser(userData);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser(); // Check for user data on mount
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
