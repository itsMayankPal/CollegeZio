import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../Context/AuthContext"; // Adjust the import path as necessary
import { universities, courses } from "../Utils/Constant"; // Adjust the path if necessary

export default function SavedResources() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentResource, setCurrentResource] = useState({
    title: "",
    description: "",
    type: "",
    link: "",
    university: "",
    course: [],
    semester: "",
    subject: "",
  });
  const [resources, setResources] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth(); // Getting user data from context

  // Fetch saved resources
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

  // Open dialog for adding new resource
  const handleOpenDialog = () => {
    setCurrentResource({
      title: "",
      description: "",
      type: "",
      link: "",
      university: "",
      course: [],
      semester: "",
      subject: "",
    });
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentResource((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle save action
  const handleSaveResource = async () => {
    // Check for missing fields
    if (
      !currentResource.title ||
      !currentResource.type ||
      !currentResource.link ||
      !currentResource.university ||
      !currentResource.course.length ||
      !currentResource.semester ||
      !currentResource.subject
    ) {
      setErrorMessage("All fields are required.");
      return; // Early return to prevent submission
    }

    if (!user._id) {
      alert("You need to log in to save resources.");
      return;
    }

    const userConfirmed = window.confirm(
      "Are you sure you want to save this resource?"
    );

    if (userConfirmed) {
      try {
        const response = await fetch(
          "http://localhost:3002/api/resources/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(currentResource),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to save resource");
        }

        const data = await response.json();
        setResources((prev) => [...prev, data]); // Add the new resource to state
        setOpenDialog(false);
        alert("Resource saved successfully!");
      } catch (error) {
        console.error(error);
        alert("Error saving resource: " + error.message);
      }
    }
  };

  // Handle resource deletion
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Resource</DialogTitle>
        <DialogContent>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <TextField
            autoFocus
            margin="dense"
            label="Title"
            name="title"
            type="text"
            fullWidth
            variant="outlined"
            value={currentResource.title}
            onChange={handleInputChange}
            required
          />

          <TextField
            margin="dense"
            label="Description"
            name="description"
            type="text"
            fullWidth
            variant="outlined"
            value={currentResource.description}
            onChange={handleInputChange}
            required
          />

          <FormControl fullWidth required variant="outlined" margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={currentResource.type || ""}
              onChange={handleInputChange}
            >
              <MenuItem value="Notes">Notes</MenuItem>
              <MenuItem value="PYQs">PYQs</MenuItem>
              <MenuItem value="YouTube Video">YouTube Video</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Link"
            name="link"
            type="text"
            fullWidth
            variant="outlined"
            value={currentResource.link}
            onChange={handleInputChange}
            required
          />

          <FormControl fullWidth required variant="outlined" margin="dense">
            <InputLabel>University</InputLabel>
            <Select
              name="university"
              value={currentResource.university || ""}
              onChange={handleInputChange}
            >
              {universities.map((uni, index) => (
                <MenuItem key={index} value={uni}>
                  {uni}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required variant="outlined" margin="dense">
            <InputLabel>Semester</InputLabel>
            <Select
              name="semester"
              value={currentResource.semester || ""}
              onChange={handleInputChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <MenuItem key={sem} value={sem}>
                  {sem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth required variant="outlined" margin="dense">
            <InputLabel>Course</InputLabel>
            <Select
              name="course"
              multiple
              value={currentResource.course}
              onChange={(e) =>
                setCurrentResource({
                  ...currentResource,
                  course: e.target.value,
                })
              }
            >
              {courses.map((course, index) => (
                <MenuItem key={index} value={course}>
                  {course}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Subject"
            name="subject"
            type="text"
            fullWidth
            variant="outlined"
            value={currentResource.subject}
            onChange={handleInputChange}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveResource} color="primary">
            Save Resource
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
