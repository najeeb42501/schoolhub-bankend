const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Users = require("./models/userModel");
const authRoutes = require("./routes/auth.js");
const adminRoutes = require("./routes/adminRoutes.js");
const editSchoolProfile = require("./routes/schoolProfile.js");
const getSchoolData = require("./routes/getSchoolData.js");
const Schools = require("./models/schoolModel.js");
//const userRoutes = require("./routes/registeredUsers.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGODB_URI = "mongodb://127.0.0.1:27017/SCHOOLSHUB_DATABASE";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Mount the auth routes
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/editSchoolProfile", editSchoolProfile);
app.use("/getSchoolData", getSchoolData);
app.use("/uploads", express.static("uploads"));

// Define a GET route to fetch all users
// Node.js backend (Express example)
app.get("/users", async (req, res) => {
  try {
    const totalUsers = await Users.countDocuments();
    const totalSchools = await Schools.countDocuments();
    res.json({ totalUsers, totalSchools });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user counts" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
