const express = require("express");
const Insights = require("../models/insightSchema"); // Adjust the path as necessary
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // Middleware for authentication

// Create a new insight
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, description, content, tags } = req.body;
    const newInsight = new Insights({
      title,
      description,
      content,
      tags,
      author: req.user._id, // Store the ID of the authenticated user
    });

    await newInsight.save();
    res
      .status(201)
      .json({ message: "Insight created successfully", newInsight });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating insight", error: error.message });
  }
});

// Get all insights
router.get("/", async (req, res) => {
  try {
    const insights = await Insights.find().populate("author", "name"); // Populate author name
    res.status(200).json(insights);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching insights", error: error.message });
  }
});

// Get a single insight by ID
router.get("/:id", async (req, res) => {
  try {
    const insight = await Insights.findById(req.params.id).populate(
      "author",
      "name"
    );
    if (!insight) {
      return res.status(404).json({ message: "Insight not found" });
    }
    res.status(200).json(insight);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching insight", error: error.message });
  }
});

// Update an insight by ID
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const insight = await Insights.findById(req.params.id);
    if (!insight) {
      return res.status(404).json({ message: "Insight not found" });
    }

    // Ensure the user is the author of the insight
    if (!insight.author.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this insight" });
    }

    const updatedInsight = await Insights.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res
      .status(200)
      .json({ message: "Insight updated successfully", updatedInsight });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating insight", error: error.message });
  }
});

// Delete an insight by ID
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const insight = await Insights.findById(req.params.id);
    if (!insight) {
      return res.status(404).json({ message: "Insight not found" });
    }

    // Ensure the user is the author of the insight
    if (!insight.author.equals(req.user._id)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this insight" });
    }

    await Insights.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Insight deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting insight", error: error.message });
  }
});

// Export the router to use in the main app
module.exports = router;
