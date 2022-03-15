// External Imports
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// Internal Imports
const { validateRegInput } = require("../utils/validation/registerValidation");
const { validateLoginInput } = require("../utils/validation/loginValidation");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

/**
 * @route   Post /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
const userRegister = asyncHandler(async (req, res) => {
  // field error handler
  const { errors, isValid } = validateRegInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // distructure the value
  const { name, username, email, avatar, avatar_id } = req.body;

  // email exist
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    res.status(400);
    throw new Error("Email is already registered");
  }

  // username exist
  const existUsername = await User.findOne({ username });
  if (existUsername) {
    res.status(400);
    throw new Error("Username is already taken");
  }

  // Get the hash password
  const hashPassword = await bcrypt.hash(req.body.password, 12);

  // Create a new user
  const user = await User.create({
    name,
    username,
    email,
    password: hashPassword,
    avatar,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      avatar_id,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @route   Post /api/users/login
 * @desc    Get token & login
 * @access  Public
 */
const userLogin = asyncHandler(async (req, res) => {
  // field error handler
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // distructure the value
  const { username, email, password } = req.body;

  // check the username and email from the database
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // check the hash password
  const isMatch = await bcrypt.compare(password, user.password);

  if (user && isMatch) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      avatar_id: user.avatar_id,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username/email or password");
  }
});

/**
 * @route   Post /api/users/profile
 * @desc    Get user profile
 * @access  Private/Loggedin user
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @route   Post /api/users/update/:id
 * @desc    Update user profile
 * @access  Private/Loggedin user
 */
const updateUserProfile = asyncHandler(async (req, res) => {});

/**
 * @route   Post /api/users/delete/:id
 * @desc    Delete a user
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {});

/**
 * @route   Post /api/users
 * @desc    Get all users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {});

/**
 * @route   Post /api/user/updateAdmin/:id
 * @desc    Make a admin
 * @access  Private/Admin
 */
const updateToAdmin = asyncHandler(async (req, res) => {});

// Export all controller function
module.exports = {
  userRegister,
  userLogin,
  getUserProfile,
  updateUserProfile,
  deleteUser,
};
