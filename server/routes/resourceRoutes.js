const express = require("express");
const Resource = require("../models/ResourceSchema");
const authMiddleware = require("../middleware/authMiddleware"); // Import authMiddleware
const router = express.Router();
const User = require("../models/UserSchema");

// Create a new resource
router.post("/add", authMiddleware, async (req, res) => {
  const {
    type,
    title,
    link,
    description,
    university,
    course,
    semester,
    subject,
  } = req.body;

  // Validate that all required fields are provided
  if (
    !type ||
    !title ||
    !link ||
    !university ||
    !course ||
    !semester ||
    !subject
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newResource = new Resource({
      type,
      title,
      link,
      description,
      university,
      course,
      semester,
      subject,
      addedBy: req.user.id, // Automatically set addedBy to the authenticated user
    });

    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find().populate("addedBy", "username");
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a resource
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const {
    type,
    title,
    link,
    description,
    university,
    course,
    semester,
    subject,
  } = req.body;

  // Validate that at least one field is being updated
  if (
    !type &&
    !title &&
    !link &&
    !university &&
    !course &&
    !semester &&
    !subject
  ) {
    return res
      .status(400)
      .json({ message: "At least one field must be provided for update" });
  }

  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { type, title, link, description, university, course, semester, subject },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json(updatedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Save a resource to the user's saved list
router.post("/save", authMiddleware, async (req, res) => {
  const { resource } = req.body; // Expect the full resource object in the body
  const resourceId = resource._id;

  // Validate the resource input
  if (!resource || !resourceId) {
    return res.status(400).json({ message: "Invalid resource data" });
  }

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the resource is already saved to avoid duplicates
    const alreadySaved = user.savedResources.some(
      (savedResource) => savedResource.toString() === resourceId
    );

    if (alreadySaved) {
      return res.status(400).json({ message: "Resource already saved" });
    }

    // Add the resource to savedResources
    user.savedResources.push(resourceId);

    // Save the user with the updated savedResources
    await user.save();

    res.status(200).json({ message: "Resource saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving resource", error });
  }
});

// Get user's saved resources with pagination
router.get("/saved", authMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to 10 items per page
    const user = await User.findById(req.user.id).populate({
      path: "savedResources",
      options: {
        limit: parseInt(limit), // Convert to number
        skip: (page - 1) * limit,
      },
    });

    res.json(user.savedResources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/filter", async (req, res) => {
  const { course, university, semester, subject } = req.query; // Get filters from query parameters

  try {
    const filter = {};
    if (course) filter.course = course;
    if (university) filter.university = university;
    if (semester) filter.semester = semester;
    if (subject) filter.subject = subject;

    const resources = await Resource.find(filter).populate(
      "addedBy",
      "username"
    );

    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a saved resource from the user's saved list
router.delete("/saved/:resourceId", authMiddleware, async (req, res) => {
  const { resourceId } = req.params; // Extract resourceId from URL parameters

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Remove the resourceId from savedResources array
    user.savedResources.pull(resourceId);

    // Save the updated user document
    await user.save();

    res
      .status(200)
      .json({ message: "Resource removed from saved resources successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// deleteing the resource
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    // Find the resource by ID
    const resource = await Resource.findById(id);

    // Check if the resource exists
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    // Check if the user is authorized to delete the resource
    if (resource.addedBy.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this resource" });
    }

    // Delete the resource
    await Resource.findByIdAndDelete(id);

    res.status(200).json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
