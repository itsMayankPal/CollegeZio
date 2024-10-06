// controllers/userController.js
const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const {
    username,
    email,
    password,
    universityName,
    collegeName,
    courseName,
    governmentExamPlanning,
  } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
      universityName,
      collegeName,
      courseName,
      governmentExamPlanning,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a method to follow a user
exports.followUser = async (req, res) => {
  const { userId } = req.params; // User ID to follow
  const { followerId } = req.body; // ID of the user who is following

  try {
    const userToFollow = await User.findById(userId);
    const follower = await User.findById(followerId);

    if (!userToFollow || !follower) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the follower to the followed user's following list
    userToFollow.following.push(followerId);
    await userToFollow.save();

    res
      .status(200)
      .json({ message: "Successfully followed the user", userToFollow });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
