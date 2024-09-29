const express = require('express');
const router = express.Router();
const nocController = require('../controllers/nocController');

// Route for submitting NOC application (accessible by all users)
router.post('/apply', nocController.applyForNOC);

// Admin routes
router.get('/applications', nocController.checkAdmin, nocController.getAllApplications);
router.get('/application/:id', nocController.checkAdmin, nocController.getApplicationById);
router.put('/application/:id', nocController.checkAdmin, nocController.updateApplicationById);
router.delete('/application/:id', nocController.checkAdmin, nocController.deleteApplicationById);

module.exports = router;
