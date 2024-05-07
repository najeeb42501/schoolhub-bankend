const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the school gallery images
const schoolGallerySchema = new Schema({
  schoolID: {
    type: Schema.Types.ObjectId,
    ref: "School", // This references the School model
    required: true,
    unique: true,
  },
  images: [
    {
      type: String, // Assuming the image addresses are strings
      required: true,
    },
  ],
});

// Create the SchoolGallery model
const SchoolGallery = mongoose.model(
  "School-Gallery-Images",
  schoolGallerySchema
);

module.exports = SchoolGallery;
