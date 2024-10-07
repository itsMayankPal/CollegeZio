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
import EditIcon from "@mui/icons-material/Edit";
// import { useAuth } from "../Context/AuthContext";

export default function SavedResources() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentResource, setCurrentResource] = useState({
    id: null,
    title: "",
    description: "",
    type: "",
    link: "",
    academicYear: "",
    course: [],
  });

  const [resources, setResources] = useState([]);
  const [userData, setUserData] = useState(null);
  // const { userData } = useAuth();

  useEffect(() => {
    const fetchResources = async () => {
      console.log("====TOKEN SENT===", localStorage.getItem("token"));
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
      const data = await response.json();
      setResources(data);
    };
    fetchResources();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log("User ID:", userData.id);
    }
  }, [userData]);

  const handleOpenDialog = (
    resource = {
      id: null,
      title: "",
      description: "",
      type: "",
      link: "",
      academicYear: "",
      course: [],
    }
  ) => {
    setCurrentResource(resource);
    setIsEditMode(!!resource.id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentResource({
      id: null,
      title: "",
      description: "",
      type: "",
      link: "",
      academicYear: "",
      course: [],
    });
  };

  const handleSave = async () => {
    console.log(userData);
    if (!userData.id) {
      alert("You need to log in to save resources.");
      return;
    }

    const userConfirmed = window.confirm(
      "Are you sure you want to save this resource?"
    );
    if (userConfirmed) {
      try {
        const method = isEditMode ? "PUT" : "POST";
        const endpoint = isEditMode
          ? `http://localhost:3002/api/resources/update/${currentResource.id}`
          : "http://localhost:3002/api/resources/save";

        const response = await fetch(endpoint, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.id,
            resource: currentResource,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to save resource");
        }

        const data = await response.json();
        alert(data.message);
        setOpenDialog(false);
        setResources((prev) =>
          isEditMode
            ? prev.map((res) =>
                res.id === currentResource.id ? currentResource : res
              )
            : [...prev, data.savedResource]
        );
      } catch (error) {
        console.error(error);
        alert("Error saving resource: " + error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3002/resources/${id}`, {
      method: "DELETE",
    });
    setResources((prev) => prev.filter((resource) => resource._id !== id));
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
                    <a
                      href={resource?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <a
                        href={resource?.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button className="view-button">View</button>
                      </a>
                    </a>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Add New Resource
        </Button>
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditMode ? "Edit Resource" : "Add New Resource"}
        </DialogTitle>
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
            type="url"
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
            value={currentResource.course.join(", ")}
            onChange={(e) =>
              setCurrentResource({
                ...currentResource,
                course: e.target.value.split(",").map((item) => item.trim()),
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {isEditMode ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
