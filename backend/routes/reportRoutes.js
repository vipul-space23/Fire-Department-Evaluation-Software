const express = require("express");
const router = express.Router();
const fireSafetyController = require("../controllers/reportController");

// POST a new inspection
router.post("/inspections", fireSafetyController.createInspection);

// GET all inspections
router.get("/inspections", fireSafetyController.getInspections);

// GET inspection by ID
router.get("/inspections/:id", fireSafetyController.getInspectionById);

// PUT to update an inspection by ID
router.put("/inspections/:id", fireSafetyController.updateInspection);

// DELETE an inspection by ID
router.delete("/inspections/:id", fireSafetyController.deleteInspection);

module.exports = router;
