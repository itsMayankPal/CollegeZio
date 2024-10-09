// src/Pages/Login.js
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

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      // localStorage.removeItem("token");

      const response = await AuthService.login(formData);
      alert("Login Successful!");
      console.log("Token stored:", response.token);
      console.log("Login response:", response);

      // Store the new token in localStorage
      localStorage.setItem("token", response.token);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Fade in timeout={1000}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: "16px" }}>
          <Typography
            variant="h4"
            sx={{ mb: 2, fontWeight: "bold", color: "#3f51b5" }}
            align="center"
          >
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
              Login
            </Button>
          </form>
        </Paper>
      </Fade>
    </Container>
  );
};

export default Login;
