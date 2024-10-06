// controllers/resourceController.js
const Resource = require("../models/Resource");
const User = require("../models/User");

exports.addResource = async (req, res) => {
  const { type, title, link, description, academicYear, course, addedBy } =
    req.body;

  try {
    const resource = new Resource({
      type,
      title,
      link,
      description,
      academicYear,
      course,
      addedBy,
    });
    await resource.save();

    // Update the uploaded resources count for the user
    await User.findByIdAndUpdate(addedBy, {
      $inc: { uploadedResourcesCount: 1 },
    });

    res.status(201).json({ message: "Resource added successfully", resource });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate("addedBy", "username");
    res.status(200).json(resources);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
