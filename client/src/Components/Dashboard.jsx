import React, { useState } from "react";
import {
  Drawer,
  Toolbar,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ResourcesIcon from "@mui/icons-material/LibraryBooks";
import NotesIcon from "@mui/icons-material/Description";
import CommunityIcon from "@mui/icons-material/Forum";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SavedResources from "./SavedResources";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";

// Import the Settings component
import Settings from "./Setting";

// Sample items for navigation (this can be dynamic)
const navItems = [
  { label: "Home", icon: <MenuIcon /> },
  { label: "Saved Resources", icon: <ResourcesIcon /> },
  { label: "Study Materials", icon: <NotesIcon /> },
  { label: "Community", icon: <CommunityIcon /> },
  { label: "Notifications", icon: <NotificationsIcon /> },
  { label: "Settings", icon: <SettingsIcon /> },
];

const DashboardContent = ({ userData }) => {
  const savedResources = useSelector(
    (state) => state.resourceState.savedResourcesList
  );
  const [activeComponent, setActiveComponent] = useState("Home");

  // Define the content for each section
  const renderContent = () => {
    switch (activeComponent) {
      case "Saved Resources":
        return (
          <Grid item xs={12} md={12} lg={12}>
            {" "}
            {/* Updated Grid layout to full width */}
            <Card sx={{ height: "100%", width: "100%" }}>
              {" "}
              {/* Ensure full width for the Card */}
              <CardContent>
                {/* <Typography variant="h6" gutterBottom>
                  Saved Resources
                </Typography> */}
                <SavedResources savedResources={savedResources} />
              </CardContent>
            </Card>
          </Grid>
        );

      case "Study Materials":
        return (
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Study Materials
                </Typography>
                <Typography variant="body2">
                  Access your notes and previous year questions.
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginTop: "16px" }}
                >
                  View Study Materials
                </Button>
              </CardContent>
            </Card>
          </Grid>
        );
      case "Community":
        return (
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Community Discussions
                </Typography>
                <Typography variant="body2">
                  Join active discussions and share your knowledge.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "16px" }}
                >
                  Visit Forums
                </Button>
              </CardContent>
            </Card>
          </Grid>
        );
      case "Notifications":
        return (
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notifications
                </Typography>
                <Typography variant="body2">
                  Check for new updates and alerts.
                </Typography>
                <ul>
                  <li>New blog post available</li>
                  <li>System maintenance on 12th Oct</li>
                </ul>
              </CardContent>
            </Card>
          </Grid>
        );
      case "Settings":
        return <Settings userData={userData} />;
      default:
        return (
          <Grid item xs={12} md={6} lg={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Welcome to the Dashboard!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <div>
          {navItems.map((item) => (
            <Button
              key={item.label}
              startIcon={item.icon}
              fullWidth
              sx={{ justifyContent: "flex-start", padding: "12px" }}
              onClick={() => setActiveComponent(item.label)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </Drawer>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1, padding: "24px", marginTop: "64px" }}>
        {" "}
        {/* Adjust marginTop to prevent overlapping */}
        {/* Rendered Content */}
        <Grid container spacing={3}>
          {renderContent()}
        </Grid>
      </div>
    </div>
  );
};

export default DashboardContent;
