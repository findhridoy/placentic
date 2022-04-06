// External Imports
const Validator = require("validator");

// Internal Imports
const { isEmpty } = require("./isEmpty");

// Validation function
const validateProductInput = (data) => {
  // errors message
  let errors = {};

  // check the title field
  if (isEmpty(data.title)) {
    errors.title = "Product title field can not be empty";
  } else if (!Validator.isLength(data.title, { min: 6, max: 30 })) {
    errors.title = "Product title must be between 6 and 30 characters long";
  }

  // check the description field
  if (isEmpty(data.description)) {
    errors.description = "Product description field can not be empty";
  } else if (!Validator.isLength(data.description, { min: 20, max: 320 })) {
    errors.description =
      "Product description must be between 20 and 320 characters long";
  }

  // check the category field
  if (isEmpty(data.category)) {
    errors.category = "Product category field can not be empty";
  } else if (!Validator.isLength(data.category, { min: 3, max: 12 })) {
    errors.category =
      "Product category must be between 3 and 12 characters long";
  }

  // check the price field
  if (isEmpty(data.price)) {
    errors.price = "Product price field can not be empty";
  }

  // check the count in product field
  if (isEmpty(data.countInStock)) {
    errors.countInStock = "Product quantity field can not be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = { validateProductInput };
