// External Imports
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

// Internal Imports
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");
const { cloudinary } = require("../config/cloudinary");

/**
 * @route   Post /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
const userRegister = asyncHandler(async (req, res) => {
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
    avatar_id,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      email: user.email,
      avatar: user.avatar,
      isAdmin: user.isAdmin,
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
  // check the username and email from the database
  const user = await User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.username }],
  });
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // check the hash password
  const isMatch = await bcrypt.compare(req.body.password, user.password);

  if (user && isMatch) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username/email or password");
  }
});

/**
 * @route   Get /api/users/profile
 * @desc    Get user profile
 * @access  Private/Loggedin user
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @route   Put /api/users/update
 * @desc    Update user profile
 * @access  Private/Loggedin user
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  // find user by id
  let user = await User.findById(req.user._id);

  // with file
  if (user && req.file) {
    await cloudinary.uploader.destroy(user.avatar_id);
    const result = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "placentic_users",
    });

    const updatedUser = {
      name: req.body.name || user.name,
      username: req.body.username || user.username,
      email: req.body.email || user.email,
      phone: req.body.phone || user.phone,
      country: req.body.country || user.country,
      avatar: result.secure_url || user.avatar,
      avatar_id: result.public_id || user.avatar_id,
      address: req.body.address || user.address,
      city: req.body.city || user.city,
      zip_code: req.body.zip_code || user.zip_code,
    };

    user = await User.findByIdAndUpdate(req.user._id, updatedUser, {
      new: true,
    });

    res.status(200).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  }

  // without file
  if (user && !req.file) {
    const updatedUser = {
      name: req.body.name || user.name,
      username: req.body.username || user.username,
      email: req.body.email || user.email,
      phone: req.body.phone || user.phone,
      country: req.body.country || user.country,
      address: req.body.address || user.address,
      city: req.body.city || user.city,
      zip_code: req.body.zip_code || user.zip_code,
    };

    user = await User.findByIdAndUpdate(req.user._id, updatedUser, {
      new: true,
    });

    res.status(200).json({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @route   Delete /api/users/delete/:id
 * @desc    Delete a user
 * @access  Private/Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  // find user by id
  const user = await User.findById(req.params.id);
  if (user) {
    // remove avatar in cloudinary
    await cloudinary.uploader.destroy(user.avatar_id);

    // remove user from database
    await user.remove();

    res.status(200).json({
      success: true,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @route   Get /api/users
 * @desc    Get all users
 * @access  Private/Admin
 */
const getUsers = asyncHandler(async (req, res) => {
  // find all user as an admin
  const users = await User.find({}).select("-password");
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

/**
 * @route   Put /api/users/updateAdmin/:id
 * @desc    Make a admin
 * @access  Private/Admin
 */
const updateToAdmin = asyncHandler(async (req, res) => {
  // find user by id
  const user = await User.findById(req.params.id).select("-password");

  // check user and update to admin
  if (user) {
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Export all controller function
module.exports = {
  userRegister,
  userLogin,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getUsers,
  updateToAdmin,
};
