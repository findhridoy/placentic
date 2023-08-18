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
router.put("/", protect, upload.single("avatar"), updateUserProfile);
router.get("/", protect, admin, getUsers);
router.put("/:userId", protect, admin, updateToAdmin);
router.delete("/:userId", protect, admin, deleteUser);

// Export router
module.exports = router;
