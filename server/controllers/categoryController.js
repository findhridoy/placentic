// External Imports
const asyncHandler = require("express-async-handler");

// Internal Imports
const { validateRegInput } = require("../utils/validation/registerValidation");
const { validateLoginInput } = require("../utils/validation/loginValidation");
const Category = require("../models/categoryModel");
const { generateToken } = require("../utils/generateToken");
const { cloudinary } = require("../config/cloudinary");

/**
 * @route   Post /api/category/create
 * @desc    Create a new category
 * @access  Private/Admin
 */
const createCategory = asyncHandler(async (req, res) => {
  const { title, slug } = req.body;
  const existCategory = await Category.findOne({ slug });

  if (existCategory) {
    res.status(400);
    throw new Error("Category is already created");
  }

  const category = await Category.create({
    title,
    slug,
  });

  if (category) {
    res.status(201).json({
      message: "Category is created succesfully",
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

/**
 * @route   Get /api/category/categores
 * @desc    Get all categories
 * @access  Private/Admin
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  if (categories) {
    res.status(200).json(categories);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

/**
 * @route   Put /api/category/update
 * @desc    Update category
 * @access  Private/Admin
 */

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    category.title = req.body.title || category.title;
    category.slug = req.body.slug || category.slug;

    const updatedCategory = await category.save();
    res.status(200).json({
      message: "Category is updated succesfully",
    });
  } else {
    res.status(400);
    throw new Error("Category is not found");
  }
});

/**
 * @route   Delete /api/category/delete
 * @desc    Delete category
 * @access  Private/Admin
 */

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await category.remove();
    res.status(200).json({
      message: "Category is deleted succesfully",
    });
  } else {
    res.status(400);
    throw new Error("Category is not found");
  }
});
