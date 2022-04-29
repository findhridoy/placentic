// External Imports
const router = require("express").Router();

// Internal Imports
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../utils/avatarUpload");

// Category routes
router.post("/create", protect, admin, upload.single("image"), createCategory);
router.get("/categories", protect, getCategories);
router.put(
  "/update/:id",
  protect,
  admin,
  upload.single("image"),
  updateCategory
);
router.delete("/delete/:id", protect, admin, deleteCategory);

// Export router
module.exports = router;
