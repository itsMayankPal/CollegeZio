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
    university: { type: String }, // New field for university
    course: {
      type: [String], // Array of strings for multiple courses
    },
    semester: { type: Number }, // New field for semester
    subject: { type: String }, // New field for subject
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resource", ResourceSchema);
