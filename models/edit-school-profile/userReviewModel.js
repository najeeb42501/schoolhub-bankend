const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the user review
const userReviewSchema = new mongoose.Schema({
  schoolID: {
    type: Schema.Types.ObjectId,
    ref: "schools", // Reference to the 'schools' collection
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
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
});

// Create a Mongoose model based on the schema
const UserReview = mongoose.model("User_Reviews", userReviewSchema);

module.exports = UserReview;
