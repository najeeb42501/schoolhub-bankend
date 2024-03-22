// routes/auth.js
const express = require("express");
const Users = require("../models/userModel");
const AllUsers = require("../models/allUsersModel");
//const RegisteredUsers = require("../models/usersLogModel");

const router = express.Router();

router.post("/createSchoolProfile", async (req, res) => {
  console.log("School profile creation request call");
  try {
    const { username, email, password, city } = req.body;

    const existingSchool = await User.findOne({ email });
    if (existingSchool) {
      return res.status(400).json({ message: "School profile already exists" });
    }

    const newSchool = new User({
      username,
      email,
      password,
      type: "school",
    });

    await newSchool.save();
    res.status(201).json(newSchool);
  } catch (error) {
    console.error("Error creating school profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/createUserProfile", async (req, res) => {
  console.log("Signup request call");
  try {
    const { email, username, password, city, type } = req.body;

    // Validate form fields (you can use a validation library like Joi)

    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance
    const newUser = new Users({
      email,
      username,
      password,
      city,
      type,
    });

    // Save the user to the database
    await newUser.save();
    // Create a new instance of AllUsers with the same ID as newUser
    const user = new AllUsers({
      _id: newUser._id,
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await AllUsers.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  // If login is successful, return user data and success message
  res.json({ user, message: "Login Successful" });
});

module.exports = router;
