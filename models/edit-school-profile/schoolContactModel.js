const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schoolAdmissionSchema = new Schema({
  schoolID: {
    type: Schema.Types.ObjectId,
    ref: "schools", // Reference to the 'schools' collection
    required: true,
    unique: true,
  },
  schoolMobileNo: {
    type: String,
    required: true,
  },
  schoolEmail: {
    type: String,
    required: true,
  },
  schoolWebsite: {
    type: String,
    required: true,
  },
  schoolAddress: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
});

const SchoolContact = mongoose.model(
  "school_contact_details",
  schoolAdmissionSchema
);

module.exports = SchoolContact;
