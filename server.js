const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const authRoutes = require("./routes/auth.js");
const adminRoutes = require("./routes/adminRoutes.js");
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

// Define a GET route to fetch all users
// Node.js backend (Express example)
app.get("/users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ type: "user" });
    const totalSchools = await User.countDocuments({ type: "school" });
    res.json({ totalUsers, totalSchools });
  } catch (error) {
    res.status(500).json({ error: "Failed to get user counts" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
