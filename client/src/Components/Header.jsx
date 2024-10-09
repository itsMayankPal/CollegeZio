import React, { useState, useEffect } from "react";
import logo from "../Assets/images/logo.png";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // State variable to manage login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check login status
  const checkLoginStatus = () => {
    const token = localStorage.getItem("authToken");
    console.log("Checking login status... Token:", !token); // Debugging
    const flag = !token;
    setIsLoggedIn(flag); // Set true if token exists
  };

  // Check if the token exists in local storage on mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const logoutUser = () => {
    localStorage.removeItem("token"); // Remove the token
    console.log("User logged out, token removed."); // Debugging
    setIsLoggedIn(false); // Update the state to logged out
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Dashboard", path: "/dashboard" },
    { text: "Insights", path: "/insights" },
    { text: "Resources", path: "/resources" },
  ];

  // Conditionally add "Login" and "Register" to the menu items based on login status
  if (!isLoggedIn) {
    menuItems.push(
      { text: "Login", path: "/login" },
      { text: "Register", path: "/register" }
    );
  } else {
    menuItems.push(
      { text: "Logout", path: "/", action: logoutUser } // Add logout option
    );
  }

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#00539C",
          padding: "0.5rem",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <Link to="/">
              <img
                src={logo}
                alt="CollegeZio Logo"
                style={{ height: isMobile ? "40px" : "60px", width: "auto" }}
              />
            </Link>
          </div>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ marginLeft: "20px" }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
              >
                <List>
                  {menuItems.map((item) => (
                    <ListItem
                      button
                      component={Link}
                      to={item.path}
                      key={item.text}
                      onClick={() => {
                        if (item.action) item.action(); // Call logout if defined
                        handleDrawerToggle();
                      }}
                    >
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  onClick={item.action} // Call logout if defined
                  sx={{
                    color: "#FFD700",
                    fontWeight: "bold",
                    marginLeft: "1rem",
                    fontSize: { xs: "0.875rem", md: "1rem" },
                    "&:hover": {
                      backgroundColor: "#008080",
                      color: "white",
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
