// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Get the token from the Authorization header
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = verified; // Attach the verified user to the request
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: "Invalid token" }); // Handle invalid token
  }
};

module.exports = authMiddleware; // Export the middleware
