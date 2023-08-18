// External Imports
const router = require("express").Router();

// Internal Imports
const { orderPayment } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Category routes
router.post("/payment", orderPayment);

// Export router
module.exports = router;
