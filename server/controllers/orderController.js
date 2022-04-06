// External Imports
const asyncHandler = require("express-async-handler");

// Internal Imports
const Order = require("../models/orderModel");

/**
 * @route   Post /api/order/create
 * @desc    Create a new order
 * @access  Private
 */
