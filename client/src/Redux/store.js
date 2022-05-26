import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  categoryListReducer,
  createCategoryReducer,
  deleteCategoryReducer,
  updateCategoryReducer,
} from "./reducers/categoryReducers";
import {
  deleteUserReducer,
  getUserListReducer,
  getUserProfileReducer,
  makeAdminUserReducer,
  updateUserProfileReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";

// reducers
const reducers = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userProfile: getUserProfileReducer,
  updateUserProfile: updateUserProfileReducer,
  createCategory: createCategoryReducer,
  categoryList: categoryListReducer,
  updateCategory: updateCategoryReducer,
  deleteCategory: deleteCategoryReducer,
  userList: getUserListReducer,
  updateUser: makeAdminUserReducer,
  deleteUser: deleteUserReducer,
});

// Get data from localStorage
const userInfoFromStorage = JSON.parse(localStorage.getItem("userInfo"))
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initial state
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
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
