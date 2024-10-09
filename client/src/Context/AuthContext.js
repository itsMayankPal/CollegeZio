import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../Services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (userData) => {
    const response = await AuthService.login(userData);
    setUser(response.user);
    localStorage.setItem("token", response.token);
  };

  const register = async (userData) => {
    await AuthService.register(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await AuthService.getUserData(token);
          setUser(userData);
        } catch (error) {
          console.error("Failed to fetch user data:", error.message);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []); // Now there's no warning

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
