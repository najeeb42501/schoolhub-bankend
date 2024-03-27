const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a Mongoose schema for the curriculum data
const curriculumSchema = new mongoose.Schema({
  schoolID: {
    type: Schema.Types.ObjectId,
    ref: "schools", // Reference to the 'schools' collection
    required: true,
    unique: true,
  },
  courses: [
    {
      type: String,
      required: true,
    },
  ],
  otherDetails: {
    type: String,
  },
});

// Create a Mongoose model using the schema
const SchoolCurriculum = mongoose.model(
  "schools_curriculum_details",
  curriculumSchema
);

module.exports = SchoolCurriculum;
