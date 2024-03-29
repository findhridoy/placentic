// External Imports
const router = require("express").Router();

// Internal Imports
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../utils/avatarUpload");

// Category routes
router.post("/", protect, admin, upload.single("image"), createCategory);
router.get("/", getCategories);
router.get("/:cat_title", getCategory);
router.put("/:catId", protect, admin, upload.single("image"), updateCategory);
router.delete("/:catId", protect, admin, deleteCategory);

// Export router
module.exports = router;
