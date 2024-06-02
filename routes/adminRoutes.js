// adminRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Schools = require("../models/schoolModel");
const AllUsers = require("../models/allUsersModel");
const Users = require("../models/userModel");
const Blogs = require("../models/blogsModel");

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

router.post("/add-blogs", async (req, res) => {
  console.log("add blogs api call");
  try {
    const { _id, title, content, author } = req.body;

    if (_id && mongoose.Types.ObjectId.isValid(_id)) {
      // Check if the blog already exists by _id
      let existingBlog = await Blogs.findOne({ _id });

      if (existingBlog) {
        // Update the existing blog
        existingBlog.title = title;
        existingBlog.content = content;
        existingBlog.author = author;

        // Save the updated blog
        const updatedBlog = await existingBlog.save();

        return res.status(200).json(updatedBlog);
      }
    }

    // Create a new blog using the data from the request body
    const newBlog = new Blogs({
      title,
      content,
      author,
    });

    // Save the new blog to the database
    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error saving or updating blog:", error);
    res.status(500).json({ error: "Failed to save or update blog" });
  }
});

router.get("/get-blogs", async (req, res) => {
  console.log("get blogs api call");
  try {
    const blogs = await Blogs.find();
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/blog/:id", async (req, res) => {
  console.log("blog get by id api called");
  const blogId = req.params.id;

  console.log("blog id ", blogId);

  try {
    const blog = await Blogs.findById(blogId); // Assuming Blog is your Mongoose model
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

router.get("/schools", async (req, res) => {
  try {
    const schools = await Schools.find();
    res.status(200).json(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const schools = await Users.find();
    res.status(200).json(schools);
  } catch (error) {
    console.error("Error fetching schools:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const allUsers = await AllUsers.find({}, { createdAt: 1, type: 1 });
    // const schools = allUsers.filter((user) => user.type === "school");
    // const users = allUsers.filter((user) => user.type === "user");
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// adminRoutes.js
router.delete("/deleteSchool/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Schools.findByIdAndDelete(id);
    await AllUsers.findByIdAndDelete(id);
    res.status(200).json({ message: "School deleted successfully" });
  } catch (error) {
    console.error("Error deleting school:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Users.findByIdAndDelete(id);
    await AllUsers.findByIdAndDelete(id);
    res.status(200).json({ message: "School deleted successfully" });
  } catch (error) {
    console.error("Error deleting school:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
