// External Imports
const { Schema, model } = require("mongoose");

// Category Schema
const CategorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
    },
    image_id: {
      type: String,
      default: "abcdefgh",
    },
  },
  { timestamps: true }
);

// Export category model
const Category = model("Categorie", CategorySchema);
module.exports = Category;
