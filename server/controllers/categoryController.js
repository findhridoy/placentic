// External Imports
const asyncHandler = require("express-async-handler");

// Internal Imports
const Category = require("../models/categoryModel");
const { cloudinary } = require("../config/cloudinary");

/**
 * @route   Post /api/category/create
 * @desc    Create a new category
 * @access  Private/Admin
 */
const createCategory = asyncHandler(async (req, res) => {
  const { title, message } = req.body;

  // exist category title
  const existCategoryTitle = await Category.findOne({ title });

  if (existCategoryTitle) {
    res.status(400);
    throw new Error("Category title is already exist!");
  }

  // exist category message
  const existCategoryMessage = await Category.findOne({ message });

  if (existCategoryMessage) {
    res.status(400);
    throw new Error("Category message is already exist!");
  }

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "placentic_categories",
    });

    // create a new category
    const category = await Category.create({
      user: req.user._id,
      title,
      message,
      image: result.secure_url,
      image_id: result.public_id,
    });

    if (category) {
      res.status(201).json({
        success: true,
      });
    } else {
      res.status(400);
      throw new Error("Something went wrong!");
    }
  } else {
    res.status(400);
    throw new Error("Something was wrong!");
  }
});

/**
 * @route   Get /api/category
 * @desc    Get all categories
 * @access  Private/Public
 */
const getCategories = asyncHandler(async (req, res) => {
  // find all category
  const categories = await Category.find({}).sort({ _id: -1 });

  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(400);
    throw new Error("Categories are not found!");
  }
});

/**
 * @route   Put /api/category/update/:id
 * @desc    Update category
 * @access  Private/Admin
 */

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  // with image changes
  if (category && req.file) {
    await cloudinary.uploader.destroy(category.image_id);
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "placentic_categories",
    });

    category.user = req.user._id || category.user;
    category.title = req.body.title || category.title;
    category.message = req.body.message || category.message;
    category.image = result.secure_url || category.image;
    category.image_id = result.public_id || category.image_id;

    const updatedCategory = await category.save();
    if (updatedCategory) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404);
      throw new Error("Something went wrong");
    }
  }

  // without image changes
  if (category && !req.file) {
    category.user = req.user._id || category.user;
    category.title = req.body.title || category.title;
    category.message = req.body.message || category.message;

    const updatedCategory = await category.save();
    if (updatedCategory) {
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404);
      throw new Error("Something went wrong");
    }
  } else {
    res.status(400);
    throw new Error("Category is not found");
  }
});

/**
 * @route   Delete /api/category/delete/:id
 * @desc    Delete category
 * @access  Private/Admin
 */

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await cloudinary.uploader.destroy(category.image_id);
    await category.remove();
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Category is not found");
  }
});

// Unauthrized
/**
 * @route   Get /api/category/category
 * @desc    Get limit categories
 * @access  Public
 */
const limitCategories = asyncHandler(async (req, res) => {
  // find all category
  const categories = await Category.find({}).sort({ _id: -1 }).limit(4);
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(400);
    throw new Error("Categores are not found!");
  }
});

// Export all controller function
module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  limitCategories,
};
