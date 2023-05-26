// External Imports
const asyncHandler = require("express-async-handler");

// Internal Imports
const Product = require("../models/productModel");
const { cloudinary } = require("../config/cloudinary");

/**
 * @route   Post /api/product
 * @desc    Add a new product
 * @access  Private/Admin
 */
const addProduct = asyncHandler(async (req, res) => {
  // distructure the value
  const { title, description, category, price, countInStock } = req.body;

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
      price,
      countInStock,
      image: result.secure_url,
      image_id: result.public_id,
    });

    if (product) {
      res.status(201).json({
        success: true,
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
 * @route   Put /api/product/:prodId
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
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.image = result.secure_url || product.image;
    product.image_id = result.public_id || product.image_id;

    const updatedProduct = await product.save();
    if (updateProduct) {
      res.status(200).json({
        success: true,
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
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;

    const updatedProduct = await product.save();
    if (updateProduct) {
      res.status(200).json({
        success: true,
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
 * @route   Delete /api/product/:prodId
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
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @route   Get /api/product/products?keyword=afgad
 * @desc    Get all products
 * @access  Private/Admin/Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
  // search products by keyword or get all products
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // find all products
  const product = await Product.find({ ...keyword });
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

/**
 * @route   Get /api/product?sort=1&page=1&size=4
 * @desc    Get all product
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  // paginations
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  const sort = parseInt(req.query.sort);
  const skip = page * size;

  // get total products count
  const counts = await Product.countDocuments({});

  // find all products
  const products = await Product.find({}).limit(size).skip(skip).sort(sort);

  if (products) {
    res.status(200).json({ products, counts });
  } else {
    res.status(404);
    throw new Error("Products not found");
  }
});

/**
 * @route   Get /api/product/prodId
 * @desc    Get single product by ID
 * @access  Public
 */
const getProduct = asyncHandler(async (req, res) => {
  // find product by id
  const product = await Product.findById(req.params.prodId);
  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @route   Post /api/product/review/:revId
 * @desc    Create a product review
 * @access  Private
 */
const createProductReview = asyncHandler(async (req, res) => {
  // find product by id
  const product = await Product.findById(req.params.id);

  if (product) {
    // check exist review
    const reviewExist = product.reviews.find(
      (x) => req.user._id.toString() === x.user.toString()
    );

    if (reviewExist) {
      res.status(404);
      throw new Error("Review is already created");
    }

    if (req.user.isAdmin) {
      // create review object
      const review = {
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar,
        rating: Number(req.body.rating),
        comment: req.body.comment,
        action: "approve",
      };

      // push review object in product reviews
      product.reviews.push(review);

      // update count reviews
      product.countReviews = product.reviews.length;

      const totalReviews =
        product.reviews?.length > 0 ? product.reviews?.length : 1;

      // count avarage rating
      const ratings =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        totalReviews;

      product.ratings = ratings.toFixed(2);

      // save in database
      await product.save();
      res.status(200).json({
        success: true,
        message: "Your comment is added.",
      });
    } else {
      // create review object
      const review = {
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };

      // push review object in product reviews
      product.reviews.push(review);

      // save in database
      await product.save();
      res.status(200).json({
        success: true,
        message: "Your comment is waiting for approval.",
      });
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @route   Post /api/product/review/approve/:revId?
 * @desc    Approve, Declien a product review
 * @access  Private/Admin
 */
const approveProductReview = asyncHandler(async (req, res) => {
  // find product by id
  const product = await Product.findById(req.params.id);

  if (product) {
    // check exist review
    const reviewExist = product.reviews.find(
      (x) => req.query.reviewID.toString() === x._id.toString()
    );

    if (reviewExist) {
      if (req.query.request === "approve") {
        reviewExist.action = "approve";

        // update count reviews
        product.countReviews = product.reviews.length;

        const totalReviews = product.reviews?.length;

        // count avarage rating
        const ratings =
          product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          totalReviews;

        product.ratings = ratings.toFixed(2);

        // save in database
        await product.save();
        res.status(200).json({
          success: true,
          message: "Comment is approved.",
        });
      }
      if (req.query.request === "decline") {
        reviewExist.action = "decline";

        // save in database
        await product.save();
        res.status(200).json({
          success: true,
          message: "Comment is declined.",
        });
      }
    }
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

/**
 * @route   Post /api/product/review?
 * @desc    Delete a product review
 * @access  Private/Admin
 */
const deleteProductReview = asyncHandler(async (req, res) => {
  // find product by id
  const product = await Product.findById(req.query.productID);

  if (product) {
    const result = product.reviews.filter((p, index) => {
      if (p._id.toString() === req.query.reviewID.toString()) {
        product.reviews.splice(index, 1); //remove the mached object from the original array
        return p;
      }
    });

    if (result?.length > 0) {
      // update count reviews
      product.countReviews = product.reviews.length;

      const totalReviews =
        product.reviews?.length > 0 ? product.reviews?.length : 1;

      // count avarage rating
      const ratings =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        totalReviews;

      product.ratings = ratings.toFixed(2);

      // save in database
      await product.save();

      res.status(200).json({
        success: true,
      });
    } else {
      res.status(404);
      throw new Error("Something was wrong!");
    }
  } else {
    res.status(404);
    throw new Error("Something went wrong!");
  }
});

// Export all controller function
module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProducts,
  getProduct,
  createProductReview,
  approveProductReview,
  deleteProductReview,
};
