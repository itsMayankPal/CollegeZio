// src/Pages/Register.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AuthService from "../Services/AuthService";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  Fade,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "scale(1.03)",
    boxShadow: "0 8px 40px rgba(0, 0, 0, 0.2)",
  },
}));

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    universityName: "",
    collegeName: "",
    courseName: "",
    governmentExamPlanning: "",
  });
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check if the token exists and is valid
    if (!token || token === "undefined") {
      localStorage.removeItem("token"); // Remove invalid token
    } else {
      navigate("/dashboard"); // Redirect to dashboard if logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clear any existing token
      localStorage.removeItem("token");

      const response = await AuthService.register(formData);
      alert("Registration Successful!");
      localStorage.setItem("token", response.token); // Store the new token
      navigate("/dashboard"); // Redirect to dashboard after successful registration
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Fade in timeout={1000}>
        <StyledPaper elevation={3}>
          <Typography
            variant="h4"
            sx={{ mb: 2, fontWeight: "bold", color: "#3f51b5" }}
            align="center"
          >
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              required
              name="username"
              label="Username"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              variant="outlined"
              required
              name="email"
              label="Email"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              variant="outlined"
              required
              name="password"
              type="password"
              label="Password"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              variant="outlined"
              required
              name="universityName"
              label="University Name"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              variant="outlined"
              required
              name="collegeName"
              label="College Name"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              variant="outlined"
              required
              name="courseName"
              label="Course Name"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              variant="outlined"
              required
              name="governmentExamPlanning"
              label="Government Exam Planning"
              onChange={handleChange}
              fullWidth
              sx={{ mb: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#3f51b5",
                color: "#fff",
                "&:hover": { backgroundColor: "#283593" },
              }}
              fullWidth
            >
              Register
            </Button>
          </form>
        </StyledPaper>
      </Fade>
    </Container>
  );
};

export default Register;
