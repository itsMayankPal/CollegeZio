import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Container, IconButton, Grid } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../Assets/images/logo.png";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#003366", // Navy Blue
        color: "white",
        padding: { xs: "20px 0", md: "40px 0" }, // Responsive padding
        marginTop: "20px",
        fontFamily: "'Poppins', sans-serif", // Change font family here
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4} textAlign="center">
            <Link to="/">
              <img
                src={logo}
                alt="CollegeZio Logo"
                style={{
                  height: "40px",
                  width: "auto",
                  marginBottom: "20px",
                  maxWidth: "100%",
                }} // Responsive logo size
              />
            </Link>
            <Typography
              variant="body2"
              sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
            >
              CollegeZio empowers students to excel in their academic pursuits.
              With a range of resources and personalized support, we guide you
              on your educational journey.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Typography
              variant="h5"
              sx={{
                marginBottom: "20px",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Quick Links
            </Typography>
            <nav>
              <ul
                style={{
                  listStyleType: "none",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Centered items
                }}
              >
                {["Home", "About", "Contact", "Courses", "Privacy Policy"].map(
                  (text) => (
                    <li key={text} style={{ margin: "10px 0" }}>
                      <Link
                        to={`/${text.toLowerCase()}`}
                        style={{
                          color: "white",
                          textDecoration: "none",
                          fontSize: { xs: "0.875rem", md: "1rem" },
                        }}
                      >
                        {text}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </Grid>
          <Grid item xs={12} md={4} textAlign="center">
            <Typography
              variant="h5"
              sx={{
                marginBottom: "20px",
                fontSize: { xs: "1.5rem", md: "2rem" },
              }}
            >
              Follow Us
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              {[
                { icon: <FacebookIcon />, link: "https://www.facebook.com/" },
                { icon: <TwitterIcon />, link: "https://twitter.com/" },
                { icon: <InstagramIcon />, link: "https://www.instagram.com/" },
                { icon: <LinkedInIcon />, link: "https://www.linkedin.com/" },
              ].map((social) => (
                <IconButton
                  key={social.link}
                  component="a"
                  href={social.link}
                  target="_blank"
                  sx={{ color: "white", margin: "0 10px" }}
                  aria-label={`Follow us on ${social.link}`} // Accessibility
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: "20px",
            fontSize: { xs: "0.75rem", md: "0.875rem" },
          }}
        >
          © {new Date().getFullYear()} CollegeZio. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
