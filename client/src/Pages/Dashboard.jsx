// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import DashboardContent from "../Components/Dashboard"; // Import the Dashboard component from Components folder
import { AuthProvider } from "../Context/AuthContext";
import { CircularProgress, Box, Typography } from "@mui/material";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/register"); // Redirect to login if no token
      return;
    }

    const fetchUserData = async () => {
      try {
        const data = await AuthService.getUserData(token);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Failed to fetch user data. Redirecting to login...");
        navigate("/login"); // Redirect to login if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <AuthProvider>
      <Box
        sx={{
          padding: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center">
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
              Loading your dashboard...
            </Typography>
          </Box>
        ) : userData ? (
          <>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
              Welcome to Your Dashboard
            </Typography>
            <DashboardContent userData={userData} />
          </>
        ) : (
          <Typography variant="h6">No user data available.</Typography>
        )}
      </Box>
    </AuthProvider>
  );
};

export default Dashboard;
