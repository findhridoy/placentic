// External Imports
const router = require("express").Router();

// Internal Imports
const {
  userRegister,
  userLogin,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUsers,
  updateToAdmin,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const { upload } = require("../utils/avatarUpload");

// User routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/profile", protect, getUserProfile);
router.put("/update", protect, upload.single("avatar"), updateUserProfile);
router.delete("/delete/:id", protect, admin, deleteUser);
router.get("/", protect, admin, getUsers);
router.put("/updateAdmin/:id", protect, admin, updateToAdmin);

// Export router
module.exports = router;
