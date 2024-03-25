const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolOverviewSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools", // Reference to the 'schools' collection
    required: true,
    unique: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
  schoolProfilePhoto: {
    type: String,
    required: true,
  },
  coverPhoto: {
    type: String,
    required: true,
  },
  schoolLevel: {
    type: String,
    required: true,
  },
  schoolSystem: {
    type: String,
    required: true,
  },
  schoolMedium: {
    type: String,
    required: true,
  },
  schoolingType: {
    type: String,
    required: true,
  },
  accreditations: {
    type: String,
    required: true,
  },
  enrolledStudents: {
    type: Number,
    required: true,
  },
  numberOfTeachers: {
    type: Number,
    required: true,
  },
  averageClassSize: {
    type: Number,
    required: true,
  },
  studentTeacherRatio: {
    type: Number,
    required: true,
  },
});

const SchoolOverview = mongoose.model("schools_overview", schoolOverviewSchema);

module.exports = SchoolOverview;
