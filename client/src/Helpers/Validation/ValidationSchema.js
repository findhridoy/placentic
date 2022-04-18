import * as Yup from "yup";

const signUpSchema = Yup.object({
  fullName: Yup.string()
    .required("Please enter your name.")
    .matches(/[a-zA-Z]+\s[a-zA-Z-]/, "Please enter your full name."),
  email: Yup.string()
    .required("Please enter your email.")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Please enter a valid email address."
    ),
  username: Yup.string()
    .required("Please enter your username.")
    .min(5, "Username must contain at least 5 characters.")
    .matches(
      /[0-9]/,
      "Only characters are not allowed at least one number should be there"
    )
    .max(10, "Username must be between 5 and 10 characters."),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must contain at least 6 characters."),
  confirmPassword: Yup.string()
    .required("Please enter your confirm password")
    .oneOf([Yup.ref("password"), null], "Password do not match."),
});

const loginSchema = Yup.object({
  username: Yup.string()
    .required("Please enter your username.")
    .min(5, "Username must contain at least 5 characters.")
    .matches(
      /[0-9]/,
      "Only characters are not allowed at least one number should be there"
    )
    .max(10, "Username must be between 5 and 10 characters."),
  password: Yup.string()
    .required("Please enter your password")
    .min(6, "Password must contain at least 6 characters."),
});

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

export { signUpSchema, loginSchema, addProductSchema };
