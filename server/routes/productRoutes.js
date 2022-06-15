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
router.get("/", getProducts);
router.get("/product/:id", getProduct);
router.post("/review/:id", protect, createProductReview);
router.get("/review/approve/:id", protect, admin, approveProductReview);
router.get("/review", protect, admin, deleteProductReview);

// Export router
module.exports = router;
