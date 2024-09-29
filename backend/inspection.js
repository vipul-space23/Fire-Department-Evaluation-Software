// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/fireFighter', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the Inspection Schema
const inspectionSchema = new mongoose.Schema({
  id: String,
  location: String,
  dateTime: String,
  officer: String,
  status: String,
});

// Create Inspection Model
const Inspection = mongoose.model('Inspection', inspectionSchema);

// Routes
app.get('/inspections', async (req, res) => {
  const inspections = await Inspection.find();
  res.json(inspections);
});

app.post('/inspections', async (req, res) => {
  const newInspection = new Inspection(req.body);
  await newInspection.save();
  res.json(newInspection);
});

app.put('/inspections/:id', async (req, res) => {
  const { id } = req.params;
  const updatedInspection = await Inspection.findOneAndUpdate({ id }, req.body, { new: true });
  res.json(updatedInspection);
});

app.delete('/inspections/:id', async (req, res) => {
  const { id } = req.params;
  await Inspection.findOneAndDelete({ id });
  res.json({ message: 'Inspection deleted' });
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
