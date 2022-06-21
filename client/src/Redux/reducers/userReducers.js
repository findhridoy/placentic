import {
  USER_DELETE_FAILURE,
  USER_DELETE_REQUEST,
  USER_DELETE_RESET,
  USER_DELETE_SUCCESS,
  USER_ERROR_RESET,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_MAKEADMIN_FAILURE,
  USER_MAKEADMIN_REQUEST,
  USER_MAKEADMIN_RESET,
  USER_MAKEADMIN_SUCCESS,
  USER_PROFILE_FAILURE,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

// Register reducer
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload };
    case USER_ERROR_RESET:
      return {};
    default:
      return state;
  }
};

// Login reducer
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case USER_ERROR_RESET:
      return {};
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

// User profile initial state
const profileInitialState = {
  loading: true,
  user: {},
};

// Get profile reducer
export const getUserProfileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_PROFILE_FAILURE:
      return { loading: false, error: action.payload };
    case USER_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

// Update profile reducer
export const updateUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// User list initial state
const userListInitialState = {
  loading: true,
  users: [],
};

// Get user list reducer
export const getUserListReducer = (state = userListInitialState, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { ...state, loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAILURE:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return {};
    default:
      return state;
  }
};

//  User make admin reducer
export const makeAdminUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_MAKEADMIN_REQUEST:
      return { ...state, loading: true };
    case USER_MAKEADMIN_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_MAKEADMIN_FAILURE:
      return { loading: false, error: action.payload };
    case USER_MAKEADMIN_RESET:
      return {};
    default:
      return state;
  }
};

// Delete user reducer
export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
