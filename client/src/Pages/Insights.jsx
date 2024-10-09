import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  card: {
    margin: theme.spacing(2),
    transition: "0.3s",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: theme.shadows[5],
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

export default function Insights() {
  const classes = useStyles();

  const articles = [
    {
      title: "Tech Update: The Future of AI",
      description:
        "Exploring the latest advancements in artificial intelligence.",
      link: "#",
    },
    {
      title: "Career Roadmap: Navigating Your Path",
      description: "Tips and strategies for building a successful career.",
      link: "#",
    },
    {
      title: "College Tips: Making the Most of Your Experience",
      description: "Advice for maximizing your college experience.",
      link: "#",
    },
  ];

  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Insights
      </Typography>
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6">{article.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {article.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  href={article.link}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
