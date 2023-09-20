// External Imports
const asyncHandler = require("express-async-handler");

// Internal Imports
const Category = require("../models/categoryModel");
const { cloudinary } = require("../config/cloudinary");
const Apifeatures = require("../utils/ApiFeatures");

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
 * @route   Get /api/v1/category
 * @desc    Get all categories
 * @access  Private/Public
 */
const getCategories = asyncHandler(async (req, res) => {
  // using reuseable class for filter, sort, paginate and search
  const features = new Apifeatures(
    Category.find(),
    req.query,
    Category.countDocuments()
  )
    .search()
    .sort()
    .paginate();

  const counts = await features.countsQuery;
  const categories = await features.query;

  if (categories) {
    res.status(200).json({ counts, categories });
  } else {
    res.status(400);
    throw new Error("Categories are not found!");
  }
});

/**
 * @route   Get /api/category/prodId
 * @desc    Get single category by title
 * @access  Public
 */
const getCategory = asyncHandler(async (req, res) => {
  // regex
  const searchRegExp = new RegExp(".*" + req.params.cat_title + ".*", "i");

  // find category by title
  const category = await Category.find({ title: { $regex: searchRegExp } })
    .select(["title", "message", "image", "-_id"])
    .setOptions({ lean: true });
  if (category?.length > 0) {
    res.status(200).json(category[0]);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

/**
 * @route   Put /api/category/update/:id
 * @desc    Update category
 * @access  Private/Admin
 */

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.catId);

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
  const category = await Category.findById(req.params.catId);
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
  getCategory,
  updateCategory,
  deleteCategory,
};
