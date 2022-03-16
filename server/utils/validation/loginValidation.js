// External Imports
const Validator = require("validator");

// Internal Imports
const { isEmpty } = require("./isEmpty");

// Validation function
const validateLoginInput = (data) => {
  // errors message
  let errors = {};

  // check the username field
  if (isEmpty(data.userName)) {
    errors.userName = "This field can not be empty";
  }

  // check the password field
  if (isEmpty(data.password)) {
    errors.password = "Password field can not be empty";
  } else if (!Validator.isLength(data.password, { min: 6, max: 120 })) {
    errors.password = "Password must be between 6 and 120 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = { validateLoginInput };
