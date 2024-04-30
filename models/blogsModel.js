const mongoose = require("mongoose");

// Define a schema for the blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Create a model based on the schema
const Blogs = mongoose.model("Blogs", blogSchema);

module.exports = Blogs;
