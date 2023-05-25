// External Imports
const router = require("express").Router();

// Internal Imports
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  createProductReview,
  approveProductReview,
  deleteProductReview,
  getProducts,
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../utils/avatarUpload");

// Product routes
router.post("/", protect, admin, upload.single("image"), addProduct);
router.put("/:prodId", protect, admin, upload.single("image"), updateProduct);
router.delete("/:prodId", protect, admin, deleteProduct);
router.get("/", getProducts);
router.get("/products", getAllProducts);
router.get("/:prodId", getProduct);
router.post("/review/:revId", protect, createProductReview);
router.get("/review/approve/:revId", protect, admin, approveProductReview);
router.get("/review", protect, admin, deleteProductReview);

// Export router
module.exports = router;
