// External Imports
const asyncHandler = require("express-async-handler");

// Internal Imports
const Order = require("../models/orderModel");
const { STRIPE_SECRET } = require("../config");
const stripe = require("stripe")(STRIPE_SECRET);
const Apifeatures = require("../utils/Apifeatures");

/**
 * @route   Post /api/v1/payment
 * @desc    Payment using stripe
 * @access  Private
 */

const price = () => {
  return 20;
};

const orderPayment = asyncHandler(async (req, res) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price(),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntent,
  });
});

/**
 * @route   Post /api/v1/order
 * @desc    Create a new order
 * @access  Private/Users
 */
const createOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    paymentResult,
    isPaid,
    paidAt,
  } = req.body;

  // create a new category
  const order = await Order.create({
    userID: req.user._id,
    orderItems,
    shippingAddress,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    paymentResult,
    isPaid,
    paidAt,
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
  const features = new Apifeatures(
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

// Export all controller function
module.exports = {
  orderPayment,
  createOrder,
  getOrders,
};
