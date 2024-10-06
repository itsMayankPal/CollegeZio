// src/Components/Dashboard.jsx
import React from "react";

const DashboardContent = ({ userData }) => {
  return (
    <div>
      <h2>Welcome, {userData.username}!</h2>
      <p>Email: {userData.email}</p>
      {/* Additional user data and dashboard features */}
    </div>
  );
};

export default DashboardContent;
