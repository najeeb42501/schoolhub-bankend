// routes/schoolOverview.js
const express = require("express");
const router = express.Router();
const Schools = require("../models/schoolModel");
const SchoolOverview = require("../models/edit-school-profile/schoolOverviewModel");
const SchoolAdmission = require("../models/edit-school-profile/schoolAdmissionModel");
const SchoolContact = require("../models/edit-school-profile/schoolContactModel");
const SchoolCurriculum = require("../models/edit-school-profile/schoolCurriculumModel");
const SchoolActivities = require("../models/edit-school-profile/schoolActivitiesModel");
const SchoolFee = require("../models/edit-school-profile/schoolFeeStructureModel");
const SchoolAbout = require("../models/edit-school-profile/schoolAboutModel");

// GET route to fetch school overview data
router.get("/school-overview/:schoolID", async (req, res) => {
  console.log("Get SO data call");
  try {
    const id = req.params.schoolID;
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
router.get("/school-admission/:schoolID", async (req, res) => {
  console.log("Get school admission data call");
  try {
    const id = req.params.schoolID;
    console.log("ID : ", id);
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

router.get("/school-contact/:schoolID", async (req, res) => {
  console.log("Get contact data call");
  try {
    const id = req.params.schoolID;
    console.log(id);
    const schoolContact = await SchoolContact.findOne({ schoolID: id });
    if (!schoolContact) {
      return res.status(404).json({ message: "School data not found" });
    }
    res.status(200).json(schoolContact);
  } catch (error) {
    console.error("Error fetching school data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/school-curriculum/:schoolID", async (req, res) => {
  console.log("Get school curriculum data call");
  try {
    const id = req.params.schoolID;
    console.log(id);
    const schoolCurriculum = await SchoolCurriculum.findOne({ schoolID: id });
    console.log("CC : ", schoolCurriculum);
    if (!schoolCurriculum) {
      return res
        .status(404)
        .json({ message: "School curriculum data not found" });
    }
    console.log("CCC");
    res.status(200).json(schoolCurriculum);
  } catch (error) {
    console.error("Error fetching school curriculum data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/school-activities/:schoolID", async (req, res) => {
  console.log("Get school activities data call");
  try {
    const id = req.params.schoolID;

    const schoolActivities = await SchoolActivities.findOne({ schoolID: id });
    console.log("CC : ", schoolActivities);
    if (!schoolActivities) {
      return res
        .status(404)
        .json({ message: "School activities data not found" });
    }
    console.log("CCC");
    res.status(200).json(schoolActivities);
  } catch (error) {
    console.error("Error fetching school activities data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/school-fee-structure/:schoolID", async (req, res) => {
  console.log("get fee data call");
  try {
    const id = req.params.schoolID;
    // Find the data for the given school ID
    const data = await SchoolFee.findOne({ schoolID: id });

    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error getting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/school-about/:schoolID", async (req, res) => {
  console.log("get about data call");
  try {
    const id = req.params.schoolID;
    console.log("About sID: ", id);
    // Find the data for the given school ID
    const data = await SchoolAbout.findOne({ schoolID: id });
    console.log("aa");
    if (!data) {
      return res.status(404).json({ error: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error getting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
