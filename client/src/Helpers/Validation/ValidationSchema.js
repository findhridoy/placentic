import * as Yup from "yup";

// Signup schema
const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Name field can not be empty.")
    .matches(/[a-zA-Z]+\s[a-zA-Z-]/, "Please type your full name."),
  email: Yup.string()
    .required("Email field can not be empty.")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Please type a valid email address."
    ),
  username: Yup.string()
    .required("Username field can not be empty.")
    .min(5, "Username must contain at least 5 characters.")
    .matches(
      /[0-9]/,
      "Only characters are not allowed at least one number should be there"
    )
    .max(10, "Username must be between 5 and 10 characters."),
  password: Yup.string()
    .required("Password field can not be empty")
    .min(6, "Password must contain at least 6 characters."),
  confirmPassword: Yup.string()
    .required("Confirm Password field can not be empty.")
    .oneOf(
      [Yup.ref("password"), null],
      "Password and Confirm Password fields must match."
    ),
});

// Login schema
const loginSchema = Yup.object({
  username: Yup.string().required("Username or email field can not be empty."),
  password: Yup.string()
    .required("Password field can not be empty.")
    .min(6, "Password must contain at least 6 characters."),
});

// Category schema
const categorySchema = Yup.object({
  title: Yup.string().required("Category title is required."),
  slug: Yup.string().required("Category slug is required."),
});

// Product schema
const addProductSchema = Yup.object({
  title: Yup.string().required("Product title is required."),
  description: Yup.string().required("Product description is required."),
  category: Yup.string().required("Product category is required."),
  price: Yup.string().required("Product price is required."),
  stock: Yup.string().required("Product stock is required."),
});

// Signup schema
const userUpdateSchema = Yup.object({
  name: Yup.string()
    .required("Name field can not be empty.")
    .matches(/[a-zA-Z]+\s[a-zA-Z-]/, "Please type your full name."),
  email: Yup.string()
    .required("Email field can not be empty.")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Please type a valid email address."
    ),
  username: Yup.string()
    .required("Username field can not be empty.")
    .min(5, "Username must contain at least 5 characters.")
    .matches(
      /[0-9]/,
      "Only characters are not allowed at least one number should be there"
    )
    .max(10, "Username must be between 5 and 10 characters."),
});

// Shipping Address Schema
const shippingSchema = Yup.object({
  name: Yup.string()
    .required("Name field can not be empty.")
    .matches(/[a-zA-Z]+\s[a-zA-Z-]/, "Please type your full name."),
  country: Yup.string().required("Country field can not be empty."),
  phone_number: Yup.string().required("Phone number field can not be empty."),
  address: Yup.string().required("Address field can not be empty."),
  city: Yup.string().required("City field can not be empty."),
  zip_code: Yup.string().required("ZIP code field can not be empty."),
});

export {
  signUpSchema,
  loginSchema,
  categorySchema,
  addProductSchema,
  userUpdateSchema,
  shippingSchema,
};
