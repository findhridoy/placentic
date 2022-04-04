// External Imports
const Validator = require("validator");

// Internal Imports
const { isEmpty } = require("./isEmpty");

// Validation function
const validateRegInput = (data) => {
  // errors message
  let errors = {};

  // check the name field
  if (isEmpty(data.name)) {
    errors.name = "Name field can not be empty";
  } else if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters long";
  }

  // check the username field
  if (isEmpty(data.username)) {
    errors.username = "Username field can not be empty";
  } else if (!Validator.isLength(data.username, { min: 5, max: 12 })) {
    errors.username = "Username must be between 5 and 12 characters long";
  }

  // check the email field
  if (isEmpty(data.email)) {
    errors.email = "Email field can not be empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid, please provide a valid email";
  }

  // check the password field
  if (isEmpty(data.password)) {
    errors.password = "Password field can not be empty";
  } else if (!Validator.isLength(data.password, { min: 6, max: 120 })) {
    errors.password = "Password must be between 6 and 120 characters long";
  }

  // check the confirm password field
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field can not be empty";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password and Confirm Password fields must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = { validateRegInput };
