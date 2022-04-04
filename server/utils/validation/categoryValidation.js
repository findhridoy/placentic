// External Imports
const Validator = require("validator");

// Internal Imports
const { isEmpty } = require("./isEmpty");

// Validation function
const validateCategoryInput = (data) => {
  // errors message
  let errors = {};

  // check the title field
  if (isEmpty(data.title)) {
    errors.title = "Category title field can not be empty";
  } else if (!Validator.isLength(data.title, { min: 3, max: 12 })) {
    errors.title = "Category title must be between 3 and 12 characters long";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = { validateCategoryInput };
