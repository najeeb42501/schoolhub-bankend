// routes/schoolOverview.js
const express = require("express");
const router = express.Router();
const SchoolOverview = require("../models/edit-school-profile/schoolOverviewModel");
const SchoolAdmission = require("../models/edit-school-profile/schoolAdmissionModel");

router.put("/save-so-data/:id", async (req, res) => {
  console.log("School Overview save data call");
  try {
    const {
      schoolName,
      schoolProfilePhoto,
      coverPhoto,
      schoolLevel,
      schoolSystem,
      schoolMedium,
      schoolingType,
      accreditations,
      enrolledStudents,
      numberOfTeachers,
      averageClassSize,
      studentTeacherRatio,
    } = req.body;

    const schoolId = req.params.id; // Extract schoolId from the URL

    // Check if school overview data already exists for the given schoolId
    let schoolOverview = await SchoolOverview.findOne({ schoolId });

    // If data does not exist, create a new document; otherwise, update the existing document
    if (!schoolOverview) {
      schoolOverview = new SchoolOverview({
        schoolName,
        schoolProfilePhoto,
        coverPhoto,
        schoolLevel,
        schoolSystem,
        schoolMedium,
        schoolingType,
        accreditations,
        enrolledStudents,
        numberOfTeachers,
        averageClassSize,
        studentTeacherRatio,
        schoolId,
      });
    } else {
      // Update the existing document with the new data
      schoolOverview.schoolName = schoolName;
      schoolOverview.schoolProfilePhoto = schoolProfilePhoto;
      schoolOverview.coverPhoto = coverPhoto;
      schoolOverview.schoolLevel = schoolLevel;
      schoolOverview.schoolSystem = schoolSystem;
      schoolOverview.schoolMedium = schoolMedium;
      schoolOverview.schoolingType = schoolingType;
      schoolOverview.accreditations = accreditations;
      schoolOverview.enrolledStudents = enrolledStudents;
      schoolOverview.numberOfTeachers = numberOfTeachers;
      schoolOverview.averageClassSize = averageClassSize;
      schoolOverview.studentTeacherRatio = studentTeacherRatio;
    }

    // Save the document to the database
    await schoolOverview.save();

    res.status(200).json({ message: "School data saved successfully" });
  } catch (error) {
    console.error("Error saving school data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/save-sa-data/:id", async (req, res) => {
  try {
    const { openingDate, closingDate, criteria, process, requiredDocuments } =
      req.body;

    const schoolId = req.params.id; // Extract schoolId from the URL

    // Check if school admission data already exists for the given schoolId
    let schoolAdmission = await SchoolAdmission.findOne({ schoolId });

    // If data does not exist, create a new document; otherwise, update the existing document
    if (!schoolAdmission) {
      schoolAdmission = new SchoolAdmission({
        schoolId,
        openingDate,
        closingDate,
        criteria,
        process,
        requiredDocuments,
      });
    } else {
      // Update the existing document with the new data
      schoolAdmission.openingDate = openingDate;
      schoolAdmission.closingDate = closingDate;
      schoolAdmission.criteria = criteria;
      schoolAdmission.process = process;
      schoolAdmission.requiredDocuments = requiredDocuments;
    }

    // Save the document to the database
    await schoolAdmission.save();

    res
      .status(200)
      .json({ message: "School admission data saved successfully" });
  } catch (error) {
    console.error("Error saving school admission data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
