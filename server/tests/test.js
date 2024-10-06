// test.js
const mongoose = require("mongoose");
// const User = require("../models/UserSchema");
const dotenv = require("dotenv");
const Resource = require("../models/ResourceSchema");
const User = require("../models/UserSchema");

const runTest = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      "mongodb+srv://CollegeZio:zD2tdUqPCyU8ZmgT@collegezio.bbwmiln.mongodb.net/?retryWrites=true&w=majority&appName=CollegeZio"
    );

    // 1. Create a new user
    const newUser = new User({
      username: "testuser",
      email: "test@example.com",
      password: "yourpassword", // Ideally, this should be hashed
      universityName: "Example University",
      collegeName: "Example College",
      courseName: "Computer Science",
      governmentExamPlanning: ["GATE", "UPSC"],
    });

    const savedUser = await newUser.save();
    console.log("User Created:", savedUser);

    // 2. Add a resource
    const newResource = new Resource({
      type: "Notes",
      title: "Sample Notes",
      link: "http://example.com/sample-notes",
      description: "These are sample notes.",
      academicYear: "2024-2025",
      course: "Computer Science",
      addedBy: savedUser._id,
    });

    const savedResource = await newResource.save();
    console.log("Resource Added:", savedResource);

    // 3. Retrieve all resources
    const resources = await Resource.find().populate("addedBy", "username");
    console.log("All Resources:", resources);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
};

runTest();
