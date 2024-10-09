import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../Context/AuthContext"; // Uncomment and use this

export default function SavedResources() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentResource, setCurrentResource] = useState({
    title: "",
    description: "",
    type: "",
    link: "",
    academicYear: "",
    course: [],
  });

  const [resources, setResources] = useState([]);
  const { user } = useAuth(); // Getting user data from context

  useEffect(() => {
    const fetchResources = async () => {
      const response = await fetch(
        "http://localhost:3002/api/resources/saved",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }
      const data = await response.json();
      setResources(data);
    };
    fetchResources();
  }, []);

  const handleOpenDialog = () => {
    setCurrentResource({
      title: "",
      description: "",
      type: "",
      link: "",
      academicYear: "",
      course: [],
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    if (!user._id) {
      alert("You need to log in to save resources.");
      return;
    }
    console.log("Handle save is running");
    const userConfirmed = window.confirm(
      "Are you sure you want to save this resource?"
    );
    if (userConfirmed) {
      try {
        console.log("User Confirmed to Add Resource");
        const response = await fetch(
          "http://localhost:3002/api/resources/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              type: currentResource.type,
              title: currentResource.title,
              link: currentResource.link,
              description: currentResource.description,
              academicYear: currentResource.academicYear,
              course: currentResource.course,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save resource");
        }

        const data = await response.json();
        alert(data);
        setResources((prev) => [...prev, data]); // Add the new resource to state
        setOpenDialog(false);
      } catch (error) {
        console.error(error);
        alert("Error saving resource: " + error.message);
      }
    }
  };

  const handleDelete = async (resourceId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/api/resources/saved/${resourceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();
      if (response.ok) {
        setResources((prev) => prev.filter((res) => res._id !== resourceId));
        console.log(result.message);
        alert(result.message); // Feedback on successful deletion
      } else {
        alert("Error deleting resource: " + result.message);
      }
    } catch (error) {
      alert("Error deleting resource: " + error.message);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Saved Resources
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6">Your Saved Resources</Typography>
            {resources.length > 0 ? (
              <List>
                {resources.map((resource) => (
                  <ListItem key={resource._id}>
                    <ListItemIcon>
                      <DescriptionIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={resource.title}
                      secondary={resource.description}
                    />
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleDelete(resource._id)}
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1">No resources saved yet!</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Add New Resource
        </Button>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Resource</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={currentResource.title}
            onChange={(e) =>
              setCurrentResource({ ...currentResource, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            value={currentResource.description}
            onChange={(e) =>
              setCurrentResource({
                ...currentResource,
                description: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Type"
            type="text"
            fullWidth
            variant="outlined"
            value={currentResource.type}
            onChange={(e) =>
              setCurrentResource({
                ...currentResource,
                type: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Link"
            type="text"
            fullWidth
            variant="outlined"
            value={currentResource.link}
            onChange={(e) =>
              setCurrentResource({
                ...currentResource,
                link: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Academic Year"
            type="text"
            fullWidth
            variant="outlined"
            value={currentResource.academicYear}
            onChange={(e) =>
              setCurrentResource({
                ...currentResource,
                academicYear: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Course"
            type="text"
            fullWidth
            variant="outlined"
            value={currentResource.course.join(", ")} // Assuming it's an array of strings
            onChange={(e) =>
              setCurrentResource({
                ...currentResource,
                course: e.target.value
                  .split(",")
                  .map((course) => course.trim()), // Convert back to array
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
