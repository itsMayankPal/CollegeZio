const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], // Array of tags
    default: [],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    required: true,
    ref: "User", // Adjust to your User model name
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Insights", insightSchema);
