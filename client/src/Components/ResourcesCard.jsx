import React, { useEffect, useState } from "react";
import "../Styles/ResourcesCards.css";
import AuthService from "../Services/AuthService";
import {
  Paper,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function ResourcesCards() {
  const [resources, setResources] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // State for dialog

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

  const handleDelete = async (resource) => {
    if (!userData || !userData._id) {
      alert("You need to log in to delete resources.");
      return;
    }

    // Check if the user is the owner of the resource
    if (resource.addedBy !== userData._id) {
      setDialogOpen(true); // Open the dialog if the user cannot delete
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token not found. Please log in.");
        return;
      }

      const response = await fetch(
        `http://localhost:3002/api/resources/${resource._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete resource. Status: " + response.status
        );
      }

      const data = await response.json();
      alert(data.message);
      // Filter out the deleted resource
      setResources((prev) => prev.filter((r) => r._id !== resource._id));
    } catch (error) {
      console.error("Error deleting resource:", error);
      alert("Error deleting resource: " + error.message);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false); // Close the dialog
  };

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

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Grid container spacing={3} className="resources-cards">
        {resources.map((resource, index) =>
          resource ? (
            <Grid item xs={12} sm={6} md={4} key={resource.id || index}>
              <Paper elevation={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Title: {resource?.title || "No Title"}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      Description: {resource?.description || "No Description"}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Type:</strong> {resource?.type || "N/A"}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Course:</strong>{" "}
                      {resource?.course?.join(", ") || "N/A"}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      <strong>Academic Year:</strong>{" "}
                      {resource?.academicYear || "N/A"}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      href={resource?.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleSave(resource)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(resource)}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          ) : null
        )}
      </Grid>

      {/* Dialog for unauthorized delete attempt */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>No! You Can Not Delete This</DialogTitle>
        <DialogContent>
          <Typography>You can only delete your uploaded resources.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
