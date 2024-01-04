// External Imports
const asyncHandler = require("express-async-handler");
const generateUniqueId = require("generate-unique-id");

// Internal Imports
const Order = require("../models/orderModel");
const { ApiFeatures } = require("../utils/Apifeatures");

/**
 * @route   Post /api/v1/order
 * @desc    Create a new order
 * @access  Private/Users
 */
const createOrder = asyncHandler(async (req, res) => {
  const {
    customer,
    customerId,
    orderItems,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentResult,
  } = req.body;

  // create a new category
  const order = await Order.create({
    orderID: generateUniqueId({
      length: 6,
      useLetters: false,
    }),
    customer,
    customerId,
    orderItems,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentResult,
  });

  if (order) {
    res.status(201).json({
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Something was wrong!");
  }
});

/**
 * @route   Get /api/v1/order?sort=1&page=1&size=4
 * @desc    Get all orders with filter
 * @access  Public/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  // using reuseable class for filter, sort, paginate and search
  const features = new ApiFeatures(
    Order.find(),
    req.query,
    Order.countDocuments()
  )
    .search()
    .sort()
    .paginate()
    .filter();

  const counts = await features.countsQuery;
  const orders = await features.query;

  if (orders) {
    res.status(200).json({ counts, orders });
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

/**
 * @route   Get /api/v1/order?sort=1&page=1&size=4
 * @desc    Get order by user id
 * @access  Public/Admin
 */
const getOrder = asyncHandler(async (req, res) => {
  const counts = await Order.countDocuments({ customerId: req.user.id });
  const orders = await Order.find({ customerId: req.user.id });

  if (orders) {
    res.status(200).json({ counts, orders });
  } else {
    res.status(404);
    throw new Error("Orders not found");
  }
});

/**
 * @route   Post /api/v1/order/:orderId
 * @desc    Update order (payment status, shipping status)
 * @access  Private/Admin
 */
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  if (order) {
    order.deliveryStatus = req.body.deliveryStatus || order.deliveryStatus;
  }

  // update order
  const updateOrder = await order.save();

  if (updateOrder) {
    res.status(201).json({
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Something was wrong!");
  }
});

/**
 * @route   Delete /api/v1/order/:orderId
 * @desc    Delete order
 * @access  Private/Admin
 */

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (order) {
    await order.remove();
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("Order is not found");
  }
});

// Export all controller function
module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
