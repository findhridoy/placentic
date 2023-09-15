// External Imports
const router = require("express").Router();

// Internal Imports
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getCategoriesByProduct,
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
router.get("/categories", getCategoriesByProduct);
router.get("/:prodId", getProduct);
router.post("/review/:prodId", protect, createProductReview);
router.get("/review/approve/:prodId", protect, admin, approveProductReview);
router.get("/review/delete", protect, admin, deleteProductReview);

// Export router
module.exports = router;
