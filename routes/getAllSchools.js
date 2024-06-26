const express = require("express");
const router = express.Router();
const Schools = require("../models/schoolModel");
const SchoolOverview = require("../models/edit-school-profile/schoolOverviewModel");

// Route to get all schools with their profile photos and school level
router.get("/schools", async (req, res) => {
  console.log("Get All schools data call");
  try {
    // Step 1: Fetch all schools with selected fields
    const schools = await Schools.find({}).select("_id school_name city");

    // Collect all schoolIds from the fetched schools
    const schoolIds = schools.map((school) => school._id.toString()); // Ensure _id is a string for matching

    // Step 2: Fetch all relevant school profile photos and levels in one go
    const schoolDetails = await SchoolOverview.find({
      schoolId: { $in: schoolIds },
    }).select("schoolId schoolProfilePhoto schoolLevel -_id");

    // Convert to a map for efficient lookup
    const detailsMap = new Map();
    schoolDetails.forEach((detail) => {
      // Convert ObjectId to string
      detailsMap.set(detail.schoolId.toString(), {
        schoolProfilePhoto: detail.schoolProfilePhoto,
        schoolLevel: detail.schoolLevel,
      });
    });

    // Enrich each school object with its profile photo and school level
    const enrichedSchools = schools.map((school) => {
      let schoolObject = school.toObject(); // Convert Mongoose document to plain object
      const detail = detailsMap.get(school._id.toString());

      if (detail) {
        schoolObject.schoolProfilePhoto = detail.schoolProfilePhoto;
        schoolObject.schoolLevel = detail.schoolLevel;
      } else {
        schoolObject.schoolProfilePhoto = null;
        schoolObject.schoolLevel = null;
      }

      return schoolObject;
    });

    console.log("Schools with Photos and Levels:", enrichedSchools);
    res.json(enrichedSchools);
  } catch (err) {
    console.error("Failed to get schools:", err);
    res.status(500).json({ message: err.message });
  }
});
router.get("/allSchools", async (req, res) => {
  console.log("Api schools merging call data");
  try {
    const result = await Schools.aggregate([
      {
        $lookup: {
          from: "schools_overviews",
          localField: "_id",
          foreignField: "schoolId",
          as: "overview",
        },
      },
      {
        $unwind: "$overview",
      },
      {
        $lookup: {
          from: "school_contact_details",
          localField: "_id",
          foreignField: "schoolID",
          as: "contactDetails",
        },
      },
      {
        $unwind: "$contactDetails",
      },
      {
        $lookup: {
          from: "schools_curriculum_details",
          localField: "_id",
          foreignField: "schoolID",
          as: "curriculumDetails",
        },
      },
      {
        $unwind: {
          path: "$curriculumDetails",
          preserveNullAndEmptyArrays: true, // Optionally preserve schools with no curriculum details
        },
      },
      {
        $project: {
          schoolID: "$_id",
          schoolName: "$overview.schoolName",
          schoolCity: "$city",
          schoolProfilePhoto: "$overview.schoolProfilePhoto",
          schoolLevel: "$overview.schoolLevel",
          schoolMedium: "$overview.schoolMedium",
          schoolSystem: "$overview.schoolSystem",
          schoolType: "$overview.schoolingType",
          enrolledStudents: "$overview.enrolledStudents",
          teachers: "$overview.numberOfTeachers",
          schoolAddress: "$contactDetails.schoolAddress",
          latitude: "$contactDetails.latitude",
          longitude: "$contactDetails.longitude",
          curriculums: "$curriculumDetails.courses", // Include the courses array
        },
      },
    ]);
    res.json(result);
  } catch (err) {
    console.error("Failed to fetch school data:", err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
