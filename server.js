const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const authRoutes = require("./routes/auth.js");

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

// Define a GET route to fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log("Users  successfully:", users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
});

// Mount the auth routes
app.use("/auth", authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
