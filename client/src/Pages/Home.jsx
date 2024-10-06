import React, { useState } from "react";
import { Box, Typography, Button, Container, Grid } from "@mui/material";
import HeroSection from "../Components/HeroSection";

const Home = () => {
  // State to manage visibility of all courses, blogs, and resources
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [showAllBlogs, setShowAllBlogs] = useState(false);
  const [showAllResources, setShowAllResources] = useState(false);

  // Sample data
  const courses = [
    { id: 1, title: "Mathematics", description: "Dive deep into Mathematics." },
    { id: 2, title: "Physics", description: "Explore the wonders of Physics." },
    {
      id: 3,
      title: "Biology",
      description: "Understand the principles of Biology.",
    },
    {
      id: 4,
      title: "Chemistry",
      description: "Learn about the reactions of chemicals.",
    },
    {
      id: 5,
      title: "Computer Science",
      description: "Get into the world of programming.",
    },
  ];

  const blogs = [
    {
      id: 1,
      title: "Understanding Quantum Physics",
      snippet: "A brief overview of quantum principles.",
    },
    {
      id: 2,
      title: "The Future of AI",
      snippet: "Exploring advancements in artificial intelligence.",
    },
    {
      id: 3,
      title: "Healthy Study Habits",
      snippet: "Tips for effective learning and retention.",
    },
    {
      id: 4,
      title: "Mathematics in Everyday Life",
      snippet: "How math applies to our daily routines.",
    },
    {
      id: 5,
      title: "Science Experiments You Can Do at Home",
      snippet: "Fun and educational experiments.",
    },
  ];

  const resources = [
    {
      id: 1,
      title: "Free E-books",
      description: "Access a variety of free educational e-books.",
    },
    {
      id: 2,
      title: "Online Courses",
      description: "Explore various online courses available for free.",
    },
    {
      id: 3,
      title: "Study Tools",
      description: "Get access to tools that enhance your studying.",
    },
    {
      id: 4,
      title: "Webinars",
      description: "Join live webinars on various educational topics.",
    },
    {
      id: 5,
      title: "Tutoring Services",
      description: "Find tutoring services to help with your studies.",
    },
  ];

  // Function to toggle visibility of items
  const toggleVisibility = (setter) => {
    setter((prev) => !prev);
  };

  return (
    <Container maxWidth="lg" sx={{ padding: 4 }}>
      <HeroSection />

      {/* Featured Courses/Programs */}
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: 3, color: "#3E2723" }}
      >
        Featured Courses to Boost Your Knowledge
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {courses.slice(0, showAllCourses ? courses.length : 3).map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Box
              sx={{
                textAlign: "center",
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <img
                src={`path_to_image/course${course.id}.jpg`}
                alt={course.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: "600", margin: 2, color: "#3E2723" }}
              >
                {course.title}
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                {course.description}
              </Typography>
              <Button variant="outlined" href={`/courses/${course.id}`}>
                View Details
              </Button>
              <Typography sx={{ marginTop: 1, color: "#FFD700" }}>
                ⭐ 4.5/5
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        onClick={() => toggleVisibility(setShowAllCourses)}
        sx={{ marginTop: 2 }}
      >
        {showAllCourses ? "Show Less" : "Show All Courses"}
      </Button>

      {/* Latest Blog Posts */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginTop: 5,
          marginBottom: 3,
          color: "#3E2723",
        }}
      >
        Latest Insights & Articles
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {blogs.slice(0, showAllBlogs ? blogs.length : 3).map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Box
              sx={{
                textAlign: "center",
                padding: 2,
                border: "1px solid #ccc",
                borderRadius: 2,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={`path_to_image/blog${post.id}.jpg`}
                alt={post.title}
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Typography variant="h6" sx={{ margin: 2, color: "#3E2723" }}>
                {post.title}
              </Typography>
              <Typography>{post.snippet}</Typography>
              <Button variant="outlined" href={`/blog/${post.id}`}>
                Read More
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        onClick={() => toggleVisibility(setShowAllBlogs)}
        sx={{ marginTop: 2 }}
      >
        {showAllBlogs ? "Show Less" : "Show All Blogs"}
      </Button>

      {/* Resources Section */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginTop: 5,
          marginBottom: 3,
          color: "#3E2723",
        }}
      >
        Helpful Resources for Your Learning Journey
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {resources
          .slice(0, showAllResources ? resources.length : 3)
          .map((resource) => (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <Box
                sx={{
                  textAlign: "center",
                  padding: 2,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "600", marginBottom: 1, color: "#6A1B9A" }}
                >
                  {resource.title}
                </Typography>
                <Typography>{resource.description}</Typography>
              </Box>
            </Grid>
          ))}
      </Grid>
      <Button
        variant="contained"
        onClick={() => toggleVisibility(setShowAllResources)}
        sx={{ marginTop: 2 }}
      >
        {showAllResources ? "Show Less" : "Show All Resources"}
      </Button>

      {/* Community Engagement */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginTop: 5,
          marginBottom: 3,
          color: "#3E2723",
        }}
      >
        Join Our Learning Community
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              backgroundColor: "#F3E5F5",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", marginBottom: 1, color: "#6A1B9A" }}
            >
              Forum Highlights
            </Typography>
            <Typography>
              Active discussions from our community forum to encourage
              participation.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            sx={{
              textAlign: "center",
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              backgroundColor: "#E8F5E9",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "600", marginBottom: 1, color: "#388E3C" }}
            >
              Community Events
            </Typography>
            <Typography>
              Join our upcoming events and webinars to connect with peers.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box
        sx={{
          textAlign: "center",
          marginTop: 5,
          padding: 4,
          backgroundColor: "#E8F5E9", // Light green background for newsletter
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ color: "#388E3C" }}>
          Stay Updated! Subscribe to Our Newsletter
        </Typography>
        <Typography sx={{ marginBottom: 2, color: "#555" }}>
          Get updates, study tips, and exclusive offers straight to your inbox.
        </Typography>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "250px",
          }}
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: 1,
            backgroundColor: "#4CAF50",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#388E3C",
            },
          }}
        >
          Subscribe
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
