import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import HeroImage from "../Assets/images/hero-image.jpg"; // Replace with your hero image path
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${HeroImage})`, // Hero background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff", // Text color for contrast
        padding: { xs: 2, sm: 4 }, // Responsive padding
        position: "relative",
        borderRadius: 2,
        overflow: "hidden", // Ensures the overlay effect is contained
        "&::before": {
          // Overlay effect
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Darker overlay for better text visibility
          borderRadius: 2,
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" }, // Responsive font sizes
            marginBottom: 2,
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)", // Text shadow for depth
          }}
        >
          Your Gateway to Academic Success
        </Typography>
        <Typography
          variant="h5"
          sx={{
            marginBottom: 3,
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            lineHeight: 1.4, // Improved line height for readability
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)", // Text shadow for depth
          }}
        >
          Empowering students with the right resources and guidance for their
          educational journey.
        </Typography>
        <Button
          variant="contained"
          component={Link}
          to="/register"
          sx={{
            backgroundColor: "#FF9800", // Bright orange for CTA
            color: "#fff",
            padding: "12px 30px", // Increased padding for better button size
            fontSize: { xs: "1rem", sm: "1.2rem" }, // Responsive font size
            borderRadius: "30px", // Rounded button
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)", // Subtle shadow
            transition: "background-color 0.3s, transform 0.2s", // Transition for hover effects
            "&:hover": {
              backgroundColor: "#F57C00", // Darker orange on hover
              transform: "translateY(-2px)", // Slight lift on hover
            },
          }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;
