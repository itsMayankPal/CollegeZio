import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";

const MainContent = ({ userData }) => {
  const {
    username,
    email,
    collegeName,
    universityName,
    courseName,
    governmentExamPlanning,
  } = userData;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f5f5f5", // Light grey background for modern look
        // minHeight: "100vh",
      }}
    >
      {/* Card Container for User Profile */}
      <Card
        sx={{
          width: "100%",
          //   maxWidth: "900px", // A wider card to display all content without cramping
          borderRadius: "16px", // Modern smooth edges
          overflow: "hidden", // To handle content overflow in a clean manner
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
        }}
      >
        <CardContent sx={{ padding: "40px" }}>
          <Grid container spacing={3}>
            {/* Avatar and Username Section */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  backgroundColor: "#3f51b5",
                  fontSize: 48,
                  marginBottom: "20px",
                }}
              >
                {username[0]} {/* First letter of the username */}
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {username}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {email}
              </Typography>
            </Grid>

            {/* Divider Line */}
            <Grid item xs={12}>
              <Box
                sx={{
                  height: "2px",
                  backgroundColor: "#e0e0e0",
                  marginY: "20px",
                }}
              />
            </Grid>

            {/* College, University, Course and Exam Planning */}
            <Grid item xs={6}>
              <Typography
                variant="h6"
                sx={{ color: "#555", fontWeight: "bold" }}
              >
                College
              </Typography>
              <Typography variant="body1">{collegeName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                sx={{ color: "#555", fontWeight: "bold" }}
              >
                University
              </Typography>
              <Typography variant="body1">{universityName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                sx={{ color: "#555", fontWeight: "bold" }}
              >
                Course
              </Typography>
              <Typography variant="body1">{courseName}</Typography>
            </Grid>
            {governmentExamPlanning?.length > 0 && (
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  sx={{ color: "#555", fontWeight: "bold" }}
                >
                  Exam Planning
                </Typography>
                <Typography variant="body1">
                  {governmentExamPlanning.join(", ")}
                </Typography>
              </Grid>
            )}

            {/* Edit Profile Button */}
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            ></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MainContent;
