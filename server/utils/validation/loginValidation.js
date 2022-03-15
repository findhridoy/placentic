// External Imports
const Validator = require("validator");

// Internal Imports
const { isEmpty } = require("./isEmpty");

// Validation function
const validateLoginInput = (data) => {
  // errors message
  let errors = {};

  // check the username field
  if (isEmpty(data.emailOrUsername)) {
    errors.emailOrUsername = "This field can not be empty";
  } else if (
    !Validator.isEmail(data.emailOrUsername) ||
    !Validator.isLength(data.emailOrUsername, { min: 5, max: 12 })
  ) {
    errors.emailOrUsername = "Invalid username or email";
  }

  // // check the username field
  // if (!isEmpty(data.email) && isEmpty(data.username)) {
  //   errors.username = "Username field can not be empty";
  // } else if (
  !Validator.isEmail(data.username) &&
    !Validator.isLength(data.username, { min: 5, max: 12 });
  // ) {
  //   errors.username = "Username must be between 5 and 12 characters long";
  // }

  // // check the email field
  // if (!isEmpty(data.username) && isEmpty(data.email)) {
  //   errors.email = "Email field can not be empty";
  // } else if (!Validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid, please provide a valid email";
  // }

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
