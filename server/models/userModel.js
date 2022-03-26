// External Imports
const { Schema, model } = require("mongoose");

// User Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dvrlnpthq/image/upload/v1647251256/t8n9gplfb58a2nha4dfo.png",
    },
    avatar_id: {
      type: String,
      default: "abcdefdh",
    },
  },
  { timestamps: true }
);

// Export user model
const User = model("User", UserSchema);
module.exports = User;
