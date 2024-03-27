const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const schoolSchema = new mongoose.Schema({
  schoolID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "School", // Reference to the School model
    required: true,
  },
  activities: [activitySchema], // Array of activities
});

const SchoolActivities = mongoose.model("SchoolActivity", schoolSchema);

module.exports = SchoolActivities;
