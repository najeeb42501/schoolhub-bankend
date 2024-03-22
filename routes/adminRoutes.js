// adminRoutes.js
const express = require("express");
const router = express.Router();
const Schools = require("../models/schoolModel");
const AllUsers = require("../models/allUsersModel");

router.post("/createSchoolProfile", async (req, res) => {
  console.log("Signup request call");
  try {
    const { email, school_name, password, city, type } = req.body;

    // Validate form fields (you can use a validation library like Joi)
    // Check if the user already exists
    const existingUser = await AllUsers.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance
    const newSchool = new Schools({
      email,
      school_name,
      password,
      city,
    });

    // Save the user to the database
    await newSchool.save();

    // Create a new instance of AllUsers with the same ID as newUser
    const user = new AllUsers({
      _id: newSchool._id,
      email,
      password,
      type,
    });

    // Save the user to the AllUsers collection
    await user.save();

    // Respond with success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// adminRoutes.js
router.get("/schools", async (req, res) => {
  try {
    const schools = await Schools.find();
    res.status(200).json(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
