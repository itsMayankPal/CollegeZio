const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
dotenv.config();

// Import routes
const userRoutes = require("./routes/userRoutes");
const resourceRoutes = require("./routes/resourceRoutes");

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Placeholder for future routes
app.get("/", (req, res) => {
  res.send("Welcome to the CollegeZio API!");
});

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/resources", resourceRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
