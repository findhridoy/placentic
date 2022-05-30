import {
  CATEGORY_CREATE_FAILURE,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE_FAILURE,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_RESET,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_LIST_FAILURE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAILURE,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_RESET,
  CATEGORY_UPDATE_SUCCESS,
} from "../constants/categoryConstants";

// Create category reducer
export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    case CATEGORY_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// Category list initial state
const categoryState = {
  loading: true,
  categories: [],
};

// Category list reducer
export const categoryListReducer = (state = categoryState, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_LIST_FAILURE:
      return { loading: false, error: action.payload };
    case CATEGORY_LIST_RESET:
      return {};

    default:
      return state;
  }
};

// Update category reducer
export const updateCategoryReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    case CATEGORY_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// Delete category reducer
export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, category: action.payload };
    case CATEGORY_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    case CATEGORY_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
