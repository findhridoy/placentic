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

// Category routes
router.post("/create", protect, admin, createCategory);
router.get("/categories", protect, admin, getCategories);
router.put("/update/:id", protect, admin, updateCategory);
router.delete("/delete/:id", protect, admin, deleteCategory);

// Export router
module.exports = router;
