const Resource = require("../models/resource");

// Get all resources
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new resource
const addResource = async (req, res) => {
  const resource = new Resource({
    name: req.body.name,
    status: req.body.status,
    location: req.body.location,
  });

  try {
    const newResource = await resource.save();
    res.status(201).json(newResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getResources,
  addResource,
};
