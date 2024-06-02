// routes/schoolOverview.js
const express = require("express");
const router = express.Router();
const SchoolOverview = require("../models/edit-school-profile/schoolOverviewModel");
const SchoolAdmission = require("../models/edit-school-profile/schoolAdmissionModel");
const SchoolContact = require("../models/edit-school-profile/schoolContactModel");
const SchoolCurriculum = require("../models/edit-school-profile/schoolCurriculumModel");
const SchoolActivities = require("../models/edit-school-profile/schoolActivitiesModel");
const SchoolFee = require("../models/edit-school-profile/schoolFeeStructureModel");
const AboutSchool = require("../models/edit-school-profile/schoolAboutModel");
const SchoolGallery = require("../models/edit-school-profile/schoolGalleryModel.js");
const UserReview = require("../models/edit-school-profile/userReviewModel.js");

const uploads = require("../middlewares/upload.js");

router.put(
  "/save-so-data/:id",
  uploads.fields([{ name: "schoolProfilePhoto" }, { name: "coverPhoto" }]),
  async (req, res) => {
    console.log("School Overview save data call");

    const schoolProfilePhoto = req.files?.schoolProfilePhoto[0];
    const coverPhoto = req.files?.coverPhoto[0];

    console.log("s: ", schoolProfilePhoto.filename);
    console.log("d: ", coverPhoto.filename);
    try {
      const {
        schoolName,
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

      console.log(
        "so DATA : " + schoolId,
        schoolSystem,
        schoolLevel,
        enrolledStudents
      );

      // Check if school overview data already exists for the given schoolId
      let schoolOverview = await SchoolOverview.findOne({ schoolId });

      // If data does not exist, create a new document; otherwise, update the existing document
      if (!schoolOverview) {
        schoolOverview = new SchoolOverview({
          schoolName,
          schoolProfilePhoto: schoolProfilePhoto?.filename,
          coverPhoto: coverPhoto?.filename,
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
        schoolOverview.schoolProfilePhoto = schoolProfilePhoto.filename;
        schoolOverview.coverPhoto = coverPhoto.filename;
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
  }
);
router.post(
  "/save-school-gallery-images/:id",
  uploads.array("images[]"),
  async (req, res) => {
    console.log("School gallery images save data call");
    const { id } = req.params;
    const imageFilenames = req.files.map((file) => file.filename); // Extract filenames from uploaded files

    try {
      // Find the document with the given schoolId
      let gallery = await SchoolGallery.findOne({
        schoolID: id,
      });

      if (gallery) {
        // If the gallery exists, push the new images to the existing array
        gallery.images.push(...imageFilenames);
      } else {
        // If no gallery exists for this schoolId, create a new document
        gallery = new SchoolGallery({
          schoolID: id,
          images: imageFilenames,
        });
      }

      await gallery.save(); // Save the document (either new or updated)
      res.status(200).send("Images added to gallery successfully");
    } catch (error) {
      console.error("Error handling images:", error);
      res.status(500).send("Server error while handling images");
    }
  }
);

router.put("/save-sa-data/:id", async (req, res) => {
  console.log("Save admiision data call");
  try {
    const { openingDate, closingDate, criteria, process, requiredDocuments } =
      req.body;

    console.log(openingDate, closingDate);

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

// PUT route to save or update school contact details
router.put("/save-school-contact-data/:id", async (req, res) => {
  console.log("Save school contact data call");
  const {
    schoolID,
    schoolMobileNo,
    schoolEmail,
    schoolWebsite,
    schoolAddress,
    longitude,
    latitude,
  } = req.body;

  console.log(schoolMobileNo);
  try {
    let schoolContact = await SchoolContact.findOne({ schoolID });

    if (!schoolContact) {
      schoolContact = new SchoolContact({
        schoolID,
        schoolMobileNo,
        schoolEmail,
        schoolWebsite,
        schoolAddress,
        longitude,
        latitude,
      });

      await schoolContact.save();
      return res.status(201).json({ saved: true, data: schoolContact });
    }

    // Update existing school contact details
    schoolContact.schoolMobileNo = schoolMobileNo;
    schoolContact.schoolEmail = schoolEmail;
    schoolContact.schoolWebsite = schoolWebsite;
    schoolContact.schoolAddress = schoolAddress;
    schoolContact.longitude = longitude;
    schoolContact.latitude = latitude;

    await schoolContact.save();
    return res.status(200).json({ saved: true, data: schoolContact });
  } catch (error) {
    console.error("Error saving/updating school contact details:", error);
    return res.status(500).json({ saved: false, error: error.message });
  }
});

// PUT request to save or update curriculum data based on school ID
router.put("/save-school-curriculum-data/:id", async (req, res) => {
  console.log("save curr data call");
  const schoolID = req.params.id;
  const { courses, otherDetails } = req.body;
  console.log(req.params.id);

  try {
    let curriculum = await SchoolCurriculum.findOne({ schoolID });

    if (!curriculum) {
      // If curriculum data doesn't exist, create a new instance
      curriculum = new SchoolCurriculum({ schoolID, courses, otherDetails });
    } else {
      // If curriculum data exists, update the existing instance
      curriculum.schoolID = schoolID;
      curriculum.courses = courses;
      curriculum.otherDetails = otherDetails;
    }

    // Save the curriculum data
    await curriculum.save();

    res.status(200).json({ message: "Curriculum data saved successfully" });
  } catch (error) {
    console.error("Error saving curriculum data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to save activities for a school
router.post("/saveActivities/:id", async (req, res) => {
  const schoolID = req.params.id;
  try {
    const { activities } = req.body;

    console.log("Save acitivities call : ", schoolID, activities);
    // Check if schoolId is provided
    if (!schoolID) {
      return res.status(400).json({ error: "School ID is required" });
    }

    // Check if activities array is provided
    if (!activities || !Array.isArray(activities) || activities.length === 0) {
      return res.status(400).json({ error: "Activities array is required" });
    }

    // Save activities for the school
    const savedActivities = await SchoolActivities.findOneAndUpdate(
      { schoolID: schoolID },
      { $addToSet: { activities: { $each: activities } } }, // Add activities to the existing array
      { upsert: true, new: true } // Create new document if schoolId doesn't exist
    );

    res.status(200).json({
      message: "Activities saved successfully",
      activities: savedActivities,
    });
  } catch (error) {
    console.error("Error saving activities:", error);
    res.status(500).json({ error: "Failed to save activities" });
  }
});

router.put("/save-school-fee-structure/:id", async (req, res) => {
  console.log("save fee data call");
  try {
    const id = req.params.id;
    const feeList = req.body;

    // Check if data exists for the given school ID
    const existingData = await SchoolFee.findOne({ schoolID: id });

    if (existingData) {
      // If data exists, update it
      existingData.feeList = feeList; // Update the feeList with the new data
      const updatedData = await existingData.save();
      res.json(updatedData);
    } else {
      // If no data found, create new data
      const newData = new SchoolFee({
        schoolID: id,
        feeList: feeList, // Use the feeList from the request body
      });
      const savedData = await newData.save();
      res.json(savedData);
    }
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/save-school-about-data/:id", async (req, res) => {
  console.log("save about school data call");
  const { aboutSchoolDescription, foundedDate } = req.body;

  try {
    const schoolID = req.params.id;
    console.log("data : ", schoolID, foundedDate);

    const filter = { schoolID: schoolID };
    const update = {
      aboutSchoolDescription: aboutSchoolDescription,
      foundedDate: foundedDate,
    };
    const options = { new: true, upsert: true };

    const aboutSchool = await AboutSchool.findOneAndUpdate(
      filter,
      update,
      options
    );
    res.status(200).json(aboutSchool);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update school profile" });
  }
});

// Define a route to handle POST requests for creating a new review
router.post("/reviews/:schoolID", async (req, res) => {
  const schoolID = req.params.schoolID;
  const { userName, generalReview, ratings } = req.body; // Extract ratings object and review text from the request body

  console.log("save reviews api called", schoolID, req.body);
  try {
    // Create a new review instance using the UserReview model
    const newReview = new UserReview({
      schoolID: schoolID,
      reviewerName: userName,
      comment: generalReview,
      ratings: ratings, // Use the ratings object directly as it matches the structure expected by the schema
    });

    // Save the new review to the database
    await newReview.save();

    // Send a success response back to the client
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
});

module.exports = router;
