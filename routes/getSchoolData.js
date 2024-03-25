// routes/schoolOverview.js
const express = require("express");
const router = express.Router();
const SchoolOverview = require("../models/edit-school-profile/schoolOverviewModel");
const SchoolAdmission = require("../models/edit-school-profile/schoolAdmissionModel");

// GET route to fetch school overview data
router.get("/school-overview/:id", async (req, res) => {
  console.log("Get SO data call");
  try {
    const id = req.params.id;
    const schoolOverview = await SchoolOverview.findOne({ schoolId: id });
    if (!schoolOverview) {
      return res.status(404).json({ message: "School data not found" });
    }
    res.status(200).json(schoolOverview);
  } catch (error) {
    console.error("Error fetching school data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET route to fetch school admission data
router.get("/school-admission/:id", async (req, res) => {
  console.log("Get school admission data call");
  try {
    const id = req.params.id;
    const schoolAdmission = await SchoolAdmission.findOne({ schoolId: id });
    if (!schoolAdmission) {
      return res
        .status(404)
        .json({ message: "School admission data not found" });
    }
    res.status(200).json(schoolAdmission);
  } catch (error) {
    console.error("Error fetching school admission data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
