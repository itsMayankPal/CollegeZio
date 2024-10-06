// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    universityName: { type: String, required: true },
    collegeName: { type: String, required: true },
    courseName: { type: String, required: true },
    governmentExamPlanning: [{ type: String }], // Array of exam names
    role: { type: String, enum: ["student", "admin"], default: "student" }, // Default to student
    savedResources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // To keep track of followed users
    // models/User.js (Update)
    uploadedResourcesCount: { type: Number, default: 0 }, // Field to count uploaded resources
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
