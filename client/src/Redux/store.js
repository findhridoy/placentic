import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  categoryLimitListReducer,
  categoryListReducer,
  createCategoryReducer,
  deleteCategoryReducer,
  updateCategoryReducer,
} from "./reducers/categoryReducers";
import {
  createProductReducer,
  createProductReviewReducer,
  deleteProductReducer,
  deleteProductReviewReducer,
  getProductReducer,
  permissionProductReviewReducer,
  productListReducer,
  queryProductReducer,
  updateProductReducer,
} from "./reducers/productReducers";
import {
  deleteUserReducer,
  getUserListReducer,
  getUserProfileReducer,
  makeAdminUserReducer,
  updateUserProfileReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import { wishlistReducer } from "./reducers/wishlistReducers";

// reducers
const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: getUserProfileReducer,
  updateUserProfile: updateUserProfileReducer,
  createCategory: createCategoryReducer,
  categoryList: categoryListReducer,
  categoryLimitList: categoryLimitListReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  userList: getUserListReducer,
  updateUser: makeAdminUserReducer,
  deleteUser: deleteUserReducer,
  createProduct: createProductReducer,
  productList: productListReducer,
  queryProduct: queryProductReducer,
  updateProduct: updateProductReducer,
  deleteProduct: deleteProductReducer,
  getProduct: getProductReducer,
  createProductReview: createProductReviewReducer,
  permissionProductReview: permissionProductReviewReducer,
  deleteProductReview: deleteProductReviewReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

// Get user data from localStorage
const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"))
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Get cart data from localStorage
const cartFromStorage = JSON.parse(localStorage.getItem("cartItems"))
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// Get wishlist data from localStorage
const wishlistFromStorage = JSON.parse(localStorage.getItem("wishlistItems"))
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [];

// initial state
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  cart: { cartItems: cartFromStorage },
  wishlist: { wishlistItems: wishlistFromStorage },
};

// middleware
const middleware = [thunk];

// create store
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
