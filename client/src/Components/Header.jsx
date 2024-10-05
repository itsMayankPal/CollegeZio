import React from "react";
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
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Contact", path: "/contact" },
    { text: "Courses", path: "/courses" },
    { text: "Dashboard", path: "/dashboard" },
    { text: "Mock Test", path: "/mock-test" },
    { text: "Profile", path: "/profile" },
    { text: "Review", path: "/reviews" },
    { text: "Login", path: "/login" },
    { text: "Register", path: "/register" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#00539C", // Deep blue for trust and professionalism
          padding: "0.5rem",
          boxShadow: "none", // For cleaner look
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
              {" "}
              {/* Wrap the logo with Link to navigate to home */}
              <img
                src={logo}
                alt="CollegeZio Logo"
                style={{ height: isMobile ? "40px" : "60px", width: "auto" }} // Responsive logo size
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
                sx={{ marginLeft: "20px" }} // Added margin to the left of the menu icon
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
                      onClick={handleDrawerToggle}
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
                  sx={{
                    color: "#FFD700", // Golden/yellow for enthusiasm and contrast
                    fontWeight: "bold",
                    marginLeft: "1rem",
                    fontSize: { xs: "0.875rem", md: "1rem" }, // Responsive font size
                    "&:hover": {
                      backgroundColor: "#008080", // Teal for balance and refreshing feel
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
