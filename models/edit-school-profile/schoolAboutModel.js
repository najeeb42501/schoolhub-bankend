const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aboutSchoolSchema = new mongoose.Schema({
  schoolID: {
    type: Schema.Types.ObjectId,
    ref: "schools", // Reference to the 'schools' collection
    required: true,
    unique: true,
  },
  aboutSchoolDescription: {
    type: String,
    required: true,
  },
  foundedDate: {
    type: String,
    required: true,
  },
});

const AboutSchool = mongoose.model("school_about_details", aboutSchoolSchema);

module.exports = AboutSchool;
