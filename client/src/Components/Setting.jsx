import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const Settings = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [newPassword, setNewPassword] = useState("");
  const [university, setUniversity] = useState(userData.universityName);
  const [college, setCollege] = useState(userData.collegeName);
  const [course, setCourse] = useState(userData.courseName);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setSuccessMessage(""); // Clear any success messages when editing starts
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to send, preserving existing data if fields are empty
      const updatedData = {
        username: username.trim() !== "" ? username : userData.username, // Use current value if blank
        email: email.trim() !== "" ? email : userData.email,
        password: newPassword.trim() !== "" ? newPassword : undefined, // Only send if new password is provided
        collegeName: college.trim() !== "" ? college : userData.collegeName,
        courseName: course.trim() !== "" ? course : userData.courseName,
        universityName:
          university.trim() !== "" ? university : userData.universityName,
      };

      // Clean up the updatedData object to avoid sending undefined values
      Object.keys(updatedData).forEach(
        (key) => updatedData[key] === undefined && delete updatedData[key]
      );

      // Get the token from local storage or wherever you're storing it
      const token = localStorage.getItem("token"); // Adjust this based on your app

      // Make an API call to save changes
      const response = await axios.put(
        "http://localhost:3002/api/users/update",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );

      console.log("Response:", response.data);
      setSuccessMessage("Changes saved successfully!");

      // Optionally, update the local user data state
      // userData = { ...userData, ...updatedData }; // Ensure you handle this appropriately in your application state
    } catch (error) {
      console.error("Error saving changes:", error);
      setError("Failed to save changes. Please try again.");
    }

    setIsEditing(false);
  };

  return (
    <Grid item xs={12}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account Settings
          </Typography>
          <form onSubmit={handleSave}>
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  variant="outlined"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  fullWidth
                  label="Course"
                  variant="outlined"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  fullWidth
                  label="College"
                  variant="outlined"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  fullWidth
                  label="University"
                  variant="outlined"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  sx={{ marginBottom: "16px" }}
                />
                {error && <Typography color="error">{error}</Typography>}
                {successMessage && (
                  <Typography color="success">{successMessage}</Typography>
                )}
                <Button variant="contained" color="primary" type="submit">
                  Save Changes
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body1">
                  <strong>Username:</strong> {username}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {email}
                </Typography>
                <Typography variant="body1">
                  <strong>Password:</strong> ********** {/* Mask password */}
                </Typography>
                <Typography variant="body1">
                  <strong>Course:</strong> {course}
                </Typography>
                <Typography variant="body1">
                  <strong>College:</strong> {college}
                </Typography>
                <Typography variant="body1">
                  <strong>University:</strong> {userData.universityName}{" "}
                  {/* Display university but don't allow changes */}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                  sx={{ marginTop: "16px" }}
                >
                  Edit
                </Button>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Settings;
