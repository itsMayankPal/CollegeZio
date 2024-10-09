import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Fade,
  Avatar,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import myImg from "../Assets/images/MayankPal.jpeg";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  heading: {
    fontWeight: "bold",
    marginBottom: theme.spacing(3),
    color: "#2e7d32",
    textAlign: "center",
  },
  card: {
    borderRadius: "16px",
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2),
    transition: "0.3s ease-in-out",
    backgroundColor: "#f5f5f5",
    "&:hover": {
      boxShadow: theme.shadows[10],
      transform: "translateY(-5px)",
    },
  },
  cardHeader: {
    backgroundColor: "#4caf50",
    color: "#fff",
    padding: theme.spacing(1),
    textAlign: "center",
  },
  cardContent: {
    textAlign: "justify",
    color: "#333",
  },
  developerSection: {
    marginTop: theme.spacing(8),
    textAlign: "center",
  },
  developerInfo: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  developerImage: {
    textAlign: "center",
  },
  avatar: {
    width: "100%",
    maxWidth: "300px",
    height: "auto",
    borderRadius: "50%",
    margin: "0 auto",
    boxShadow: theme.shadows[5],
  },
  developerDetails: {
    marginLeft: theme.spacing(4),
    textAlign: "left",
  },
  iconButton: {
    marginTop: theme.spacing(2),
    "&:hover": {
      backgroundColor: "transparent",
      color: "#3f51b5",
    },
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.heading}>
        About Collegezio
      </Typography>
      <Fade in={true} timeout={1000}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader title="Our Mission" className={classes.cardHeader} />
              <CardContent className={classes.cardContent}>
                <Typography variant="body1">
                  Collegezio is dedicated to helping students access the best
                  educational content. We provide accurate information on
                  university updates, exam tips, and study materials to help you
                  succeed.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                title="What We Offer"
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="body1">
                  From exam preparation guides to curated study material,
                  YouTube playlists, and short books, we offer tools that help
                  students maximize their academic potential.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                title="Why Choose Us?"
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="body1">
                  We understand the challenges students face. Collegezio
                  provides relevant information, saving time and helping you
                  focus on what really matters: learning and excelling in your
                  academic journey.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                title="Future Vision"
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="body1">
                  We are shaping the future of education by providing a
                  comprehensive platform for students across India. Our goal is
                  to ensure students are equipped with the tools needed to make
                  informed educational decisions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader
                title="Our Resources"
                className={classes.cardHeader}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="body1">
                  Collegezio offers university circulars, Quantum study guides,
                  previous year questions (PYQs), and updates to ensure you stay
                  on top of your academic game.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardHeader title="Our Values" className={classes.cardHeader} />
              <CardContent className={classes.cardContent}>
                <Typography variant="body1">
                  Transparency, reliability, and student empowerment are at the
                  heart of what we do. We are committed to offering the best
                  resources to help students make smart choices for their
                  academic careers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fade>

      {/* Developer Section */}
      <Box className={classes.developerSection}>
        <Typography variant="h5" className={classes.heading}>
          Meet the Developer
        </Typography>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={4} className={classes.developerImage}>
            <Avatar alt="Mayank Pal" src={myImg} className={classes.avatar} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className={classes.developerInfo}>
              <div className={classes.developerDetails}>
                <Typography variant="h6" fontWeight="bold">
                  Mayank Pal
                </Typography>
                <Typography variant="body1">
                  Full Stack MERN Developer, Founder of Collegezio
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  I'm passionate about building tools that simplify education.
                  Through Collegezio, I aim to make the lives of students easier
                  by providing quick access to study materials, updates, and
                  more.
                </Typography>
                <IconButton
                  href="https://www.linkedin.com/in/its-mayank-pal/"
                  target="_blank"
                  aria-label="LinkedIn Profile"
                  className={classes.iconButton}
                >
                  <LinkedInIcon sx={{ fontSize: 40, color: "#0077b5" }} />
                </IconButton>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="body1" align="center" sx={{ marginTop: 4 }}>
        <b>Thank you for being a part of our journey at Collegezio!</b>
      </Typography>
    </Container>
  );
}
