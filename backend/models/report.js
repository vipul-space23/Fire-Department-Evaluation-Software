const mongoose = require("mongoose");

const fireSafetyInspectionSchema = new mongoose.Schema({
  buildingName: { type: String, required: true },
  inspectionDate: { type: Date, required: true },
  inspectorName: { type: String, required: true },
  fireExtinguishersPresent: { type: Boolean, required: true },
  conditionOfFireAlarms: { type: String, required: true }, // E.g., Functional/Non-functional
  exitsCondition: { type: Number, min: 1, max: 5, required: true }, // Rating from 1 to 5
  commentsForExtinguishers: { type: String },
  commentsForAlarms: { type: String },
});

module.exports = mongoose.model(
  "fireSafetyInspection",
  fireSafetyInspectionSchema
);
