// src/services/AuthService.js
import axios from "axios";

// Optionally, use an environment variable for the API URL
const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3002/api/users/";

const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}register`, userData);
    return response.data; // Make sure the response has the expected structure
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed.");
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}login`, userData);
    return response.data; // Ensure this has the token or user details
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed.");
  }
};

// New function to get user data
const getUserData = async (token) => {
  try {
    const response = await axios.get(`${API_URL}me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Validate the response as needed
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data."
    );
  }
};

// Exporting the functions
const AuthService = {
  register,
  login,
  getUserData,
};

export default AuthService;
