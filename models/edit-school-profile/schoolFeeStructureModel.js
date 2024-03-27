const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the collection
const SchoolFeeStructureSchema = new mongoose.Schema({
  schoolID: {
    type: Schema.Types.ObjectId,
    ref: "schools", // Reference to the 'schools' collection
    required: true,
    unique: true,
  },
  feeList: [
    {
      className: {
        type: String,
        required: true,
      },
      depositFee: {
        type: Number,
        required: true,
      },
      admissionFee: {
        type: Number,
        required: true,
      },
      tuitionFee: {
        type: Number,
        required: true,
      },
      examFee: {
        type: Number,
        required: true,
      },
    },
  ],
});

// Create the Mongoose model
const SchoolFee = mongoose.model(
  "school_fees_details",
  SchoolFeeStructureSchema
);

module.exports = SchoolFee;
