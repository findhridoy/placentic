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
  const { title, slug } = req.body;

  // find the category
  const existCategory = await Category.findOne({ slug });

  if (existCategory) {
    res.status(400);
    throw new Error("Category is already created");
  }

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "placentic_categories",
    });

    // create a new category
    const category = await Category.create({
      user: req.user._id,
      title,
      slug,
      image: result.secure_url,
      image_id: result.public_id,
    });

    if (category) {
      res.status(201).json(category);
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
 * @route   Get /api/category/categores
 * @desc    Get all categories
 * @access  Private
 */
const getCategories = asyncHandler(async (req, res) => {
  // find all category
  const categories = await Category.find({}).sort({ _id: -1 });
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(400);
    throw new Error("Categores are not found!");
  }
});

/**
 * @route   Get /api/category/category
 * @desc    Get all categories
 * @access  Private/Admin
 */
const getCategory = asyncHandler(async (req, res) => {
  // find all category
  const category = await Category.find({ id: req.body._id });
  if (category) {
    res.status(200).json(categories);
  } else {
    res.status(400);
    throw new Error("Category not found!");
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
    category.slug = req.body.slug || category.slug;
    category.image = result.secure_url || category.image;
    category.image_id = result.public_id || category.image_id;

    const updatedCategory = await category.save();
    if (updatedCategory) {
      res.status(200).json(updatedCategory);
    } else {
      res.status(404);
      throw new Error("Something went wrong");
    }
  }

  // without image changes
  if (category && !req.file) {
    category.user = req.user._id || category.user;
    category.title = req.body.title || category.title;
    category.slug = req.body.slug || category.slug;

    const updatedCategory = await category.save();
    if (updatedCategory) {
      res.status(200).json(updatedCategory);
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

// Export all controller function
module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
