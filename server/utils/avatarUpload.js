// External Imports
const multer = require("multer");

// Internal Imports
const path = require("path");

// difine storage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileNmae =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileNmae + fileExt);
  },
});

// check image type
const fileType = ["image/jpeg", "image/jpg", "image/png"];

// prepare the final multer upload object
const upload = multer({
  storage,
  limits: 1000000, //1MB
  fileFilter: (req, file, cb) => {
    if (fileType.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg or .png format allowed"));
    }
  },
});

module.exports = { upload };
