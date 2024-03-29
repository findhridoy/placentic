// External Imports
require("dotenv").config();

// Environment Setup
module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  MDB_URI: process.env.MDB_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API: process.env.CLOUDINARY_API,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
};
