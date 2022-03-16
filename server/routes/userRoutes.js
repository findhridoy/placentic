// External Imports
const router = require("express").Router();

// Internal Imports
const {
  userRegister,
  userLogin,
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("../utils/avatarUpload");

// User routes
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/profile", protect, getUserProfile);
router.put("/update", protect, upload.single("avatar"), updateUserProfile);
router.post("/upload", upload.single("avatar"), uploadAvatar);

// Export router
module.exports = router;
