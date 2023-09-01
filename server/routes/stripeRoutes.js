// External Imports
const router = require("express").Router();

// Internal Imports
const { createPaymentIntent } = require("../controllers/stripeController");
const { protect } = require("../middleware/authMiddleware");

router.post("/payment-intent", createPaymentIntent);

// Export router
module.exports = router;
