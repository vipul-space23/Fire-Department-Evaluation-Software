const fireSafetyInspection = require("../models/report");

// Create a new inspection
exports.createInspection = async (req, res) => {
  try {
    const newInspection = new fireSafetyInspection(req.body);
    await newInspection.save();
    res.status(201).json({
      message: "Inspection created successfully",
      inspection: newInspection,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating inspection", error });
  }
};

// Get all inspections
exports.getInspections = async (req, res) => {
  try {
    const inspections = await fireSafetyInspection.find();
    res.status(200).json(inspections);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving inspections", error });
  }
};

// Get inspection by ID
exports.getInspectionById = async (req, res) => {
  try {
    const inspection = await fireSafetyInspection.findById(req.params.id);
    if (!inspection) {
      return res.status(404).json({ message: "Inspection not found" });
    }
    res.status(200).json(inspection);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving inspection", error });
  }
};

// Update an inspection
exports.updateInspection = async (req, res) => {
  try {
    const updatedInspection = await fireSafetyInspection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInspection) {
      return res.status(404).json({ message: "Inspection not found" });
    }
    res.status(200).json({
      message: "Inspection updated successfully",
      inspection: updatedInspection,
    });
  } catch (error) {
    res.status(400).json({ message: "Error updating inspection", error });
  }
};

// Delete an inspection
exports.deleteInspection = async (req, res) => {
  try {
    const deletedInspection = await fireSafetyInspection.findByIdAndDelete(
      req.params.id
    );
    if (!deletedInspection) {
      return res.status(404).json({ message: "Inspection not found" });
    }
    res.status(200).json({ message: "Inspection deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inspection", error });
  }
};
