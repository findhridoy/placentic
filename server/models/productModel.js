// External Imports
const { Schema, model } = require("mongoose");

// Review Schema
const ReviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

// Product Schema
const ProductSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    categorySlug: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    countReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [ReviewSchema],
    image: {
      type: String,
      required: true,
    },
    image_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Export product model
const Product = model("Product", ProductSchema);
module.exports = Product;
