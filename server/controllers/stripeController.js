// External Imports
const asyncHandler = require("express-async-handler");

// Internal Imports
const { STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY } = require("../config");
const stripe = require("stripe")(STRIPE_SECRET_KEY);

/**
 * @route   Post /api/v1/stripe/payment-intent
 * @desc    Stripe payment intent
 * @access  Private
 */

const createPaymentIntent = asyncHandler(async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(Number(req.body.amount) * 100),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    publicSecret: STRIPE_PUBLIC_KEY,
  });
});

// Export all controller function
module.exports = {
  createPaymentIntent,
};
