// External Imports
const router = require("express").Router();

// Internal Imports
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  limitCategories,
} = require("../controllers/categoryController");
const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../utils/avatarUpload");

// Category routes
router.post("/create", protect, admin, upload.single("image"), createCategory);
router.get("/", getCategories);
router.put(
  "/update/:id",
  protect,
  admin,
  upload.single("image"),
  updateCategory
);
router.delete("/delete/:id", protect, admin, deleteCategory);

// Unauthrized routes
router.get("/category", limitCategories);

// Export router
module.exports = router;
