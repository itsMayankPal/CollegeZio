import React, { useEffect, useState } from "react";
import "../Styles/FilterSection.css"; // Import CSS for styling
import { universities, courses } from "../Utils/Constant"; // Use imported constants
import AuthService from "../Services/AuthService";
import axios from "axios"; // Make sure to install axios if you haven't already
import {
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";

export default function FilterSection() {
  const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"]; // Semester options
  // eslint-disable-next-line
  const [resources, setResources] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [userData, setUserData] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [error, setError] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [filteredResources, setFilteredResources] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch resources on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/resources");
        if (!response.ok) {
          throw new Error("Failed to fetch resources");
        }
        const resourcesData = await response.json();

        const user_data = await AuthService.getUserData(
          localStorage.getItem("token")
        );

        setResources(resourcesData);
        setUserData(user_data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load resources or user data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            "http://localhost:3002/api/user/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;
  // Function to handle filtering when the button is clicked
  const handleFilter = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        "http://localhost:3002/api/resources/filter",
        {
          params: {
            course: selectedCourse,
            university: selectedUniversity,
            semester: selectedSemester,
          },
        }
      );
      setFilteredResources(response.data);
    } catch (error) {
      console.error("Error filtering resources:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleClearFilters = () => {
    setSelectedCourse("");
    setSelectedUniversity("");
    setSelectedSemester("");
    setFilteredResources([]); // Clear filtered resources on reset
  };

  const handleSave = async (resource) => {
    if (!userData || !userData._id) {
      alert("You need to log in to save resources.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:3002/api/resources/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userData._id,
          resource: resource,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save resource. Status: " + response.status);
      }

      const data = await response.json();
      alert(data.message);
      setResources((prev) => [...prev, data.savedResource]);
    } catch (error) {
      console.error("Error saving resource:", error);
      alert("Error saving resource: " + error.message);
    }
  };

  return (
    <div className="filter-section">
      <h2 style={{ textAlign: "center" }}>Filter Resources</h2>
      <div
        className="filters"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <FormControl
          variant="outlined"
          style={{ margin: "8px", minWidth: 150 }}
        >
          <InputLabel>Course</InputLabel>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            label="Course"
          >
            <MenuItem value="">
              <em>Select Course</em>
            </MenuItem>
            {courses.map((course, index) => (
              <MenuItem key={index} value={course}>
                {course}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          style={{ margin: "8px", minWidth: 150 }}
        >
          <InputLabel>University</InputLabel>
          <Select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            label="University"
          >
            <MenuItem value="">
              <em>Select University</em>
            </MenuItem>
            {universities.map((university, index) => (
              <MenuItem key={index} value={university}>
                {university}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          variant="outlined"
          style={{ margin: "8px", minWidth: 150 }}
        >
          <InputLabel>Semester</InputLabel>
          <Select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            label="Semester"
          >
            <MenuItem value="">
              <em>Select Semester</em>
            </MenuItem>
            {semesters.map((semester, index) => (
              <MenuItem key={index} value={semester}>
                Semester {semester}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            style={{ margin: "8px" }}
          >
            Apply Filters
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            style={{ margin: "8px" }}
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {loading ? (
        <CircularProgress style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <div className="filtered-results">
          <h3 style={{ textAlign: "center" }}>Filtered Resources:</h3>
          {filteredResources.length > 0 ? (
            <Grid container spacing={3} justifyContent="center">
              {filteredResources.map((resource, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={3}
                    style={{ padding: "16px", borderRadius: "8px" }}
                  >
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {resource.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                        >
                          {resource.description}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Course:</strong>{" "}
                          {resource.course.join(", ") || "N/A"}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>University:</strong>{" "}
                          {resource.university || "N/A"}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          <strong>Semester:</strong>{" "}
                          {resource.semester || "N/A"}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "8px",
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Resource
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleSave(resource)}
                          >
                            Save
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography textAlign="center">
              No resources match the selected filters.
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}
