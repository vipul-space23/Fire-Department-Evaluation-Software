const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(cors({ origin: '*' }));

app.use(express.json());

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/fireFighter', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// NOC Application Schema
const nocSchema = new mongoose.Schema({
  applicantInfo: {
    name: String,
    email: String,
    phone: String,
    organization: String,
  },
  propertyDetails: {
    address: String,
    propertyType: String,
    numFloors: Number,
    totalArea: Number,
  },
  fireSafety: {
    fireExtinguishers: Boolean,
    fireAlarms: Boolean,
    fireExits: Number,
  },
  documents: String, // Will store the path to the uploaded document
  preferredDate: String,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Disapproved'], // Add your statuses here
    default: 'Pending',
  },
});

const NOC = mongoose.model('NOC', nocSchema);

// Multer Setup for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
app.post('/noc-application', upload.single('documents'), (req, res) => {
  console.log('Incoming request body:', req.body);
  console.log('Uploaded file:', req.file);

  try {
    const { applicantInfo, propertyDetails, fireSafety, preferredDate } = req.body;
    const documentPath = req.file ? req.file.path : null;

    const newNOC = new NOC({
      applicantInfo: JSON.parse(applicantInfo),
      propertyDetails: JSON.parse(propertyDetails),
      fireSafety: JSON.parse(fireSafety),
      documents: documentPath,
      preferredDate,
    });

    newNOC.save()
      .then(() => res.status(201).json({ message: 'NOC Application submitted successfully!' }))
      .catch(err => {
        console.error('Error saving NOC to the database:', err);
        res.status(500).json({ error: err.message });
      });
  } catch (err) {
    console.error('Error in request handling:', err);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// Fetch all NOCs
app.get('/api/nocs', async (req, res) => {
  try {
    const nocs = await NOC.find(); // Fetch all NOCs from the database
    res.json(nocs); // Send JSON response
  } catch (error) {
    console.error("Error fetching NOCs:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Approve a NOC application
app.post('/api/nocs/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the NOC by ID and update its status
    const updatedNOC = await NOC.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });

    if (!updatedNOC) {
      return res.status(404).json({ error: 'NOC not found' });
    }

    res.json({ message: 'NOC approved successfully', noc: updatedNOC });
  } catch (error) {
    console.error("Error approving NOC:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Disapprove a NOC application
app.post('/api/nocs/:id/disapprove', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the NOC by ID and update its status
      const updatedNOC = await NOC.findByIdAndUpdate(id, { status: 'Disapproved' }, { new: true });
  
      if (!updatedNOC) {
        return res.status(404).json({ error: 'NOC not found' });
      }
  
      res.json({ message: 'NOC disapproved successfully', noc: updatedNOC });
    } catch (error) {
      console.error("Error disapproving NOC:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Start the server
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
