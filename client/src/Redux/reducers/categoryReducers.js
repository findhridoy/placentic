import {
  CATEGORY_CREATE_FAILURE,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_FAILURE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_SUCCESS,
} from "../constants/categoryConstants";

// Create category reducer
export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORY_CREATE_FAILURE:
      return { loading: false, success: false, error: action.payload };
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

// Create category reducer
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
