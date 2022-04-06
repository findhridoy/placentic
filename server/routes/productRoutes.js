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
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../utils/avatarUpload");

// User routes
router.post("/add", protect, admin, upload.single("image"), addProduct);
router.put(
  "/update/:id",
  protect,
  admin,
  upload.single("image"),
  updateProduct
);
router.delete("/delete/:id", protect, admin, deleteProduct);
router.get("/products", protect, admin, getAllProducts);
router.get("/product/:id", protect, admin, getProduct);
router.get("/review/:id", protect, createProductReview);

// Export router
module.exports = router;
