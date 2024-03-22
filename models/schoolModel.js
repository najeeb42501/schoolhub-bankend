const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  school_name: {
    type: String,
    required: true,
    unique: true,
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
});

const Schools = mongoose.model("schools", schoolSchema);

module.exports = Schools;
