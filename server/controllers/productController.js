// External Imports
const asyncHandler = require("express-async-handler");

// Internal Imports
const Product = require("../models/productModel");
const { cloudinary } = require("../config/cloudinary");

/**
 * @route   Post /api/product/add
 * @desc    Add a new product
 * @access  Private/Admin
 */
const addProduct = asyncHandler(async (req, res) => {
  // distructure the value
  const {
    title,
    description,
    category,
    categorySlug,
    price,
    countInStock,
  } = req.body;

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "placentic_products",
    });

    // create a new product
    const product = await Product.create({
      user: req.user._id,
      title,
      description,
      category,
      categorySlug,
      price,
      countInStock,
      image: result.secure_url,
      image_id: result.public_id,
    });

    if (product) {
      res.status(201).json({
        message: "Product added successfully",
      });
    } else {
      res.status(500);
      throw new Error("Somthing went wrong");
    }
  } else {
    res.status(500);
    throw new Error("Something was wrong!");
  }
});

/**
 * @route   Put /api/product/update/:id
 * @desc    Update product
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  // find the exect product
  const product = await Product.findById(req.params.id);

  // with image changes
  if (product && req.file) {
    await cloudinary.uploader.destroy(product.image_id);
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "placentic_products",
    });

    product.user = req.user._id || product.user;
    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.categorySlug = req.body.categorySlug || product.categorySlug;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.image = result.secure_url || product.image;
    product.image_id = result.public_id || product.image_id;

    const updatedProduct = await product.save();
    if (updateProduct) {
      res.status(200).json({
        message: "Product updated successfully",
      });
    } else {
      res.status(404);
      throw new Error("Something went wrong");
    }
  }

  // without image changes
  if (product && !req.file) {
    product.user = req.user._id || product.user;
    product.title = req.body.title || product.title;
    product.description = req.body.description || product.description;
    product.category = req.body.category || product.category;
    product.categorySlug = req.body.categorySlug || product.categorySlug;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;

    const updatedProduct = await product.save();
    if (updateProduct) {
      res.status(200).json({
        message: "Product updated successfully",
      });
    } else {
      res.status(404);
      throw new Error("Something went wrong");
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @route   Delete /api/product/delete/:id
 * @desc    Delete product
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  // find product by id
  const product = await Product.findById(req.params.id);
  if (product) {
    // remove image from cloudinary
    await cloudinary.uploader.destroy(product.image_id);

    // remove product from database
    await product.remove();

    res.status(200).json({
      message: "Product is removed successfully",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @route   Get /api/product/products
 * @desc    Get all products
 * @access  Private/Admin
 */
const getAllProducts = asyncHandler(async (req, res) => {
  // find all products
  const product = await Product.find({});
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

/**
 * @route   Get /api/product/product/:id
 * @desc    Get single product
 * @access  Private/Admin
 */
const getProduct = asyncHandler(async (req, res) => {
  // find product by id
  const product = await Product.findById(req.params.id);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @route   Post /api/product/review/:id
 * @desc    Create a product review
 * @access  Private/Admin
 */
const createProductReview = asyncHandler(async (req, res) => {
  // find product by id
  const product = await Product.findById(req.params.id);
  if (product) {
    // check exist review
    const reviewExist = product?.reviews.find(
      req.user.toString() === req.user._id.toString()
    );

    if (reviewExist) {
      res.status(404);
      throw new Error("Review is already created");
    }

    // create review object
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    // push review object in product reviews
    product.reviews.push(review);

    // update count reviews
    product.countReviews = product.reviews.length;

    // count avarage rating
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    // save in database
    await product.save();
    res.status(200).json({
      message: "Your review is created",
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Export all controller function
module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  createProductReview,
};
