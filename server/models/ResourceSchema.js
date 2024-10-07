const mongoose = require("mongoose");

const ResourceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Notes", "PYQs", "YouTube Video"],
      required: true,
    },
    title: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String },
    academicYear: { type: String, required: true }, // e.g., "2024-2025"
    course: {
      type: [String], // Changed to an array of strings to allow multiple courses
      required: true,
    },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resource", ResourceSchema);
