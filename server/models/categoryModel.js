// External Imports
const { Schema, model } = require("mongoose");

// Category Schema
const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
  },
  image_id: {
    type: String,
    default: "abcdefgh",
  },
});

// Export category model
const Category = model("Categorie", CategorySchema);
module.exports = Category;
