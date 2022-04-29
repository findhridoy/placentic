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
  subCategory: Yup.string().required("Product sub category is required."),
  price: Yup.string().required("Product price is required."),
  // file: Yup.mixed().required('Product image is required.'),
  // .test('fileSize', 'The image is too large', (value) => value && value[0].size <= 2048)
  // .test('type', 'Only jpeg file support', (value) => value && value[0].type === 'image/jpeg'),
});

export { signUpSchema, loginSchema, categorySchema, addProductSchema };
