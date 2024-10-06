// src/Pages/NotFound.js
import React from "react";
import { Container, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" align="center">
        Sorry, the page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default NotFound;
