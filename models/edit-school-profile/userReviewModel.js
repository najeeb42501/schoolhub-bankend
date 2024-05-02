const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the user review with multiple dimensions
const userReviewSchema = new mongoose.Schema({
  schoolID: {
    type: Schema.Types.ObjectId,
    ref: "School", // Ensure the reference matches your School model's name
    required: true,
  },
  reviewerName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  comment: {
    type: String,
  },
  ratings: {
    // Adjusted to handle multiple dimensions
    environment: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    faculty: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    academicPerformance: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    facilities: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    recommend: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
  },
});

// Create a Mongoose model based on the schema
const UserReview = mongoose.model(
  "users_reviews_about_schools",
  userReviewSchema
);

module.exports = UserReview;
