import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ResourcesIcon from "@mui/icons-material/LibraryBooks";
import NotesIcon from "@mui/icons-material/Description";
import CommunityIcon from "@mui/icons-material/Forum";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { useSelector } from "react-redux";
import SavedResources from "./SavedResources";
import Settings from "./Setting";
import MainContent from "./DashboardContent/MainContent";

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
  const [drawerOpen, setDrawerOpen] = useState(false);

  const renderContent = () => {
    switch (activeComponent) {
      case "Saved Resources":
        return (
          <Grid item xs={12}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <SavedResources savedResources={savedResources} />
              </CardContent>
            </Card>
          </Grid>
        );

      case "Study Materials":
        return (
          <Grid item xs={12} md={6}>
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
                  color="primary"
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
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notificationssssss
                </Typography>
                <Typography variant="body2">
                  Check for new updates and alerts.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="New blog post available" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="System maintenance on 12th Oct" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        );

      case "Settings":
        return <Settings userData={userData} />;

      default:
        return <MainContent userData={userData} />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar Navigation */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <div style={{ width: 250 }}>
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.label}
                onClick={() => {
                  setActiveComponent(item.label);
                  setDrawerOpen(false); // Close drawer on item click
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      {/* Main Content Area */}
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#2196f3" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Rendered Content */}
        <div
          style={{
            padding: "24px",
            backgroundColor: "#f4f6f8", // Light background for better contrast
          }}
        >
          <Grid container spacing={3}>
            {renderContent()}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
