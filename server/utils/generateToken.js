// External Imports
const jwt = require("jsonwebtoken");

// Internal Imports
const { SECRET_KEY } = require("../config");

// Generate token
const generateToken = (id) => jwt.sign({ id }, SECRET_KEY, { expiresIn: "3d" });

module.exports = { generateToken };
