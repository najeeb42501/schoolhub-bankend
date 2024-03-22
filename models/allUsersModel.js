const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["admin", "user", "school"],
      required: true,
    },
    // Additional fields specific to each type of user can be added here
  },
  {
    timestamps: true,
  }
);

const AllUsers = mongoose.model("all_users", usersSchema);

module.exports = AllUsers;
