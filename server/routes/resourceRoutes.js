const express = require("express");
const Resource = require("../models/ResourceSchema");
const authMiddleware = require("../middleware/authMiddleware"); // Import authMiddleware
const router = express.Router();

// Create a new resource
router.post("/", authMiddleware, async (req, res) => {
  const { type, title, link, description, academicYear, course } = req.body;

  // Validate that all required fields are provided
  if (!type || !title || !link || !academicYear || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newResource = new Resource({
      type,
      title,
      link,
      description,
      academicYear,
      course,
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
  const { type, title, link, description, academicYear, course } = req.body;

  // Validate that at least one field is being updated
  if (!type && !title && !link && !academicYear && !course) {
    return res
      .status(400)
      .json({ message: "At least one field must be provided for update" });
  }

  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { type, title, link, description, academicYear, course },
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

// Delete a resource
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedResource = await Resource.findByIdAndDelete(id);
    if (!deletedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
