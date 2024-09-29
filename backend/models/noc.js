const mongoose = require("mongoose");

// Define schema
const nocApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  organization: { type: String },
  address: { type: String, required: true },
  propertyType: { type: String, required: true },
  numberOfFloors: { type: Number, required: true },
  totalArea: { type: Number, required: true },
  fireSafety: {
    fireExtinguishers: { type: Boolean, default: false },
    fireAlarms: { type: Number, default: 0 },
  },
  siteInspection: { type: Date },
  document: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// Create model
const nocApplication = mongoose.model("nocApplication", nocApplicationSchema);

module.exports = nocApplication;
