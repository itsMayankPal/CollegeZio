import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Box,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
// Importing universities and courses arrays
import { universities, courses } from "../Utils/Constant"; // Adjust the path if necessary

export default function UploadResources() {
  const [resourceData, setResourceData] = useState({
    title: "",
    type: "",
    link: "",
    description: "",
    university: "",
    course: "",
    semester: "",
    subject: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResourceData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(resourceData); // Log the resource data to check its values

    // Check for missing fields
    if (
      !resourceData.title ||
      !resourceData.type ||
      !resourceData.link ||
      !resourceData.university ||
      !resourceData.course ||
      !resourceData.semester ||
      !resourceData.subject
    ) {
      setErrorMessage("All fields are required.");
      return; // Early return to prevent submission
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("Authorization token not found. Please log in.");
        return;
      }
      const response = await axios.post(
        "http://localhost:3002/api/resources/add",
        resourceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Resource uploaded successfully!");
        setResourceData({
          title: "",
          type: "",
          link: "",
          description: "",
          university: "",
          course: "",
          semester: "",
          subject: "",
        });
        setErrorMessage(""); // Clear any previous error messages
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to upload resource."
      );
    }
  };

  return (
    <Container>
      <Box sx={{ py: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload a New Resource
        </Typography>

        {/* Success and error messages */}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={resourceData.title}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select
                  name="type"
                  value={resourceData.type || ""}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Notes">Notes</MenuItem>
                  <MenuItem value="PYQs">PYQs</MenuItem>
                  <MenuItem value="YouTube Video">YouTube Video</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Link"
                name="link"
                value={resourceData.link}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel>University</InputLabel>
                <Select
                  name="university"
                  value={resourceData.university || ""}
                  onChange={handleInputChange}
                >
                  {universities.map((uni, index) => (
                    <MenuItem key={index} value={uni}>
                      {uni}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel>Semester</InputLabel>
                <Select
                  name="semester"
                  value={resourceData.semester || ""}
                  onChange={handleInputChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <MenuItem key={sem} value={sem}>
                      {sem}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required variant="outlined">
                <InputLabel>Course</InputLabel>
                <Select
                  name="course"
                  value={resourceData.course || ""}
                  onChange={handleInputChange}
                >
                  {courses.map((course, index) => (
                    <MenuItem key={index} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={resourceData.subject}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={resourceData.description}
                onChange={handleInputChange}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} className="text-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                className="btn btn-primary"
              >
                Upload Resource
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
