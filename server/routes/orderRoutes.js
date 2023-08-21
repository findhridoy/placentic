// External Imports
const router = require("express").Router();

// Internal Imports
const {
  orderPayment,
  createOrder,
  getOrders,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Category routes
router.post("/payment", protect, orderPayment);
router.post("/", protect, createOrder);
router.get("/", protect, getOrders);

// Export router
module.exports = router;
