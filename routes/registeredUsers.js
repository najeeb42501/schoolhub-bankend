// routes/auth.js
const express = require("express");
const User = require("../models/userModel");

const router = express.Router();

router.post("/saveUser", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate form fields (you can use a validation library like Joi)

    // Check if the user already exists
    const existingUser = await AllUsers.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance
    const newUser = new AllUsers({
      email,
      password,
      type: "user",
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
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
