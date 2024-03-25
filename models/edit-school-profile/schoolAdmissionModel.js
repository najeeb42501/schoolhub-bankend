const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolAdmissionSchema = new Schema({
  schoolId: {
    type: Schema.Types.ObjectId,
    ref: "schools", // Reference to the 'schools' collection
    required: true,
    unique: true,
  },
  openingDate: {
    type: Date,
    required: true,
  },
  closingDate: {
    type: Date,
    required: true,
  },
  criteria: {
    type: String,
    required: true,
  },
  process: {
    type: String,
    required: true,
  },
  requiredDocuments: {
    type: String,
    required: true,
  },
});

const SchoolAdmission = mongoose.model(
  "school_admissions",
  schoolAdmissionSchema
);

module.exports = SchoolAdmission;
