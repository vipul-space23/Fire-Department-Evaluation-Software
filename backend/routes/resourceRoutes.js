const express = require("express");
const {
  getResources,
  addResource,
} = require("../controllers/resourceController");
const router = express.Router();

router.get("/", getResources);
router.post("/", addResource);

module.exports = router;
