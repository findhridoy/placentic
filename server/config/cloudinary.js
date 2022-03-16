const { CLOUDINARY_SECRET, CLOUDINARY_API, CLOUDINARY_NAME } = require(".");

// External Imports
const cloudinary = require("cloudinary").v2;

// Cloudinary config
cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API,
  api_secret: CLOUDINARY_SECRET,
});

module.exports = { cloudinary };
