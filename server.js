const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Users = require("./models/userModel");
const authRoutes = require("./routes/auth.js");
const adminRoutes = require("./routes/adminRoutes.js");
const editSchoolProfile = require("./routes/schoolProfile.js");
const getSchoolData = require("./routes/getSchoolData.js");
const getAllSchools = require("./routes/getAllSchools.js");
const Schools = require("./models/schoolModel.js");

require("dotenv").config();

//const userRoutes = require("./routes/registeredUsers.js");
const uploads = require("./middlewares/upload.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
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
app.use("/getAllSchools", getAllSchools);

// app.use(
//   "/gallery-content",
//   uploads.fields([{ name: "images" }]),
//   controllerFunction
// );
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

const API_KEY = process.env.API_KEY;

app.post("/ai", async (req, res) => {
  // console.log("GPT AI CALL", req.body);

  const prompt = req.body.message;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
