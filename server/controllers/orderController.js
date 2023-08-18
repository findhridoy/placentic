// External Imports
const asyncHandler = require("express-async-handler");

// Internal Imports
const Order = require("../models/orderModel");
const { STRIPE_SECRET } = require("../config");
const stripe = require("stripe")(STRIPE_SECRET);

/**
 * @route   Post /api/v1/payment
 * @desc    Payment using stripe
 * @access  Private
 */
const orderPayment = asyncHandler(async (req, res) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.total,
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

// Export all controller function
module.exports = {
  orderPayment,
};
