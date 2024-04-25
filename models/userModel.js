const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["user"],
    required: true,
  },
  // Additional fields specific to each type of user can be added here
});

const Users = mongoose.model("users", userSchema);

module.exports = Users;
