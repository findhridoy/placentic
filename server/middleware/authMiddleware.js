// External Imports
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// Internal Imports
const User = require("../models/userModel");
const { SECRET_KEY } = require("../config");

// Protect route wtih token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token
      token = req.headers.authorization.split(" ")[1];

      // Varify token
      const decode = jwt.verify(token, SECRET_KEY);

      // Find the user and set the user
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error(error);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Check admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

module.exports = { protect, admin };
