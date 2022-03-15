// External Imports
const router = require("express").Router();

// Internal Imports
const { userRegister, userLogin } = require("../controllers/userController");

// User routes
router.post("/register", userRegister);
router.post("/login", userLogin);

// Export router
module.exports = router;
