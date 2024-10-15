const nocApplication = require("../models/NocApplication")
// Middleware to check if user is an admin
exports.checkAdmin = (req, res, next) => {
  const userRole = req.body.role; // Assume role is passed in the request body or from session (for simplicity)
  if (userRole !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// @route   POST /api/noc/apply
// @desc    Apply for NOC (accessible to all users)
exports.applyForNOC = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "File upload failed", error: err });
    }

    const {
      name,
      email,
      phone,
      organization,
      address,
      propertyType,
      numberOfFloors,
      totalArea,
      fireExtinguishers,
      fireAlarms,
      siteInspection,
    } = req.body;
    const document = req.file ? req.file.filename : null;

    try {
      const newApplication = new nocApplication({
        name,
        email,
        phone,
        organization,
        address,
        propertyType,
        numberOfFloors,
        totalArea,
        fireSafety: {
          fireExtinguishers: fireExtinguishers === "on",
          fireAlarms: fireAlarms || 0,
        },
        siteInspection,
        document,
      });

      const savedApplication = await newApplication.save();
      res.status(201).json({
        message: "NOC application submitted successfully!",
        application: savedApplication,
      });
    } catch (err) {
      res.status(500).json({ message: "Error saving application", error: err });
    }
  });
};

// @route   GET /api/noc/applications
// @desc    Get all NOC applications (admin only)
exports.getAllApplications = async (req, res) => {
  try {
    const applications = await nocApplication.find();
    res.status(200).json(applications);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching applications", error: err });
  }
};

// @route   GET /api/noc/application/:id
// @desc    Get a specific NOC application by ID (admin only)
exports.getApplicationById = async (req, res) => {
  try {
    const application = await nocApplication.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application);
  } catch (err) {
    res.status(500).json({ message: "Error fetching application", error: err });
  }
};

// @route   PUT /api/noc/application/:id
// @desc    Edit an NOC application (admin only)
exports.updateApplicationById = async (req, res) => {
  try {
    const updatedData = req.body;
    const updatedApplication = await nocApplication.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({
      message: "NOC application updated successfully!",
      application: updatedApplication,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating application", error: err });
  }
};

// @route   DELETE /api/noc/application/:id
// @desc    Delete an NOC application (admin only)
exports.deleteApplicationById = async (req, res) => {
  try {
    const application = await NocApplication.findByIdAndDelete(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({
      message: "NOC application deleted successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting application", error: err });
  }
};
