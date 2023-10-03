// External Imports
const router = require("express").Router();

// Internal Imports
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

// Category routes
router.post("/", protect, createOrder);
router.get("/", protect, getOrders);
router.get("/user", protect, getOrder);
router.put("/:orderId", protect, updateOrder);
router.delete("/:orderId", protect, deleteOrder);

// Export router
module.exports = router;
