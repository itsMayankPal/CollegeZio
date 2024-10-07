// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import DashboardContent from "../Components/Dashboard"; // Import the Dashboard component from Components folder
import { AuthProvider } from "../Context/AuthContext";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log(token);

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
        alert("Failed to fetch user data.");
        navigate("/login"); // Redirect to login if fetching fails
      }
    };

    fetchUserData();
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <AuthProvider>
        {" "}
        {userData ? (
          <DashboardContent userData={userData} />
        ) : (
          <p>Loading...</p>
        )}
      </AuthProvider>
    </div>
  );
};

export default Dashboard;
