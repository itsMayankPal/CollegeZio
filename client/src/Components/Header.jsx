// Header.jsx

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
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
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            CollegeZio
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
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
                    color: "#F4B400", // Golden/yellow for enthusiasm and contrast
                    fontWeight: "bold",
                    marginLeft: "1rem",
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
