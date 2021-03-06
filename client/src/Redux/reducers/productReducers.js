import {
  PRODUCT_CREATE_FAILURE,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_GET_FAILURE,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_RESET,
  PRODUCT_GET_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_QUERY_FAILURE,
  PRODUCT_QUERY_REQUEST,
  PRODUCT_QUERY_RESET,
  PRODUCT_QUERY_SUCCESS,
  PRODUCT_REVIEW_CREATE_FAILURE,
  PRODUCT_REVIEW_CREATE_REQUEST,
  PRODUCT_REVIEW_CREATE_RESET,
  PRODUCT_REVIEW_CREATE_SUCCESS,
  PRODUCT_REVIEW_DELETE_FAILURE,
  PRODUCT_REVIEW_DELETE_REQUEST,
  PRODUCT_REVIEW_DELETE_RESET,
  PRODUCT_REVIEW_DELETE_SUCCESS,
  PRODUCT_REVIEW_PERMISSION_FAILURE,
  PRODUCT_REVIEW_PERMISSION_REQUEST,
  PRODUCT_REVIEW_PERMISSION_RESET,
  PRODUCT_REVIEW_PERMISSION_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

// Create product reducer
export const createProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// Product list initial state
const productListState = {
  loading: true,
  products: [],
};

// Product list reducer
export const productListReducer = (state = productListState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_RESET:
      return {};

    default:
      return state;
  }
};

// Update product reducer
export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// Delete product reducer
export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// Get product reducer
export const getProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_GET_REQUEST:
      return { ...state, loading: true, product: {} };
    case PRODUCT_GET_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_GET_FAILURE:
      return { loading: false, error: action.payload };
    case PRODUCT_GET_RESET:
      return {};
    default:
      return state;
  }
};

// Query all products
export const queryProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_QUERY_REQUEST:
      return { ...state, loading: true, products: [] };
    case PRODUCT_QUERY_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        counts: action.payload.counts,
        product: [...action.payload.products],
      };
    case PRODUCT_QUERY_FAILURE:
      return { loading: false, error: action.payload };
    case PRODUCT_QUERY_RESET:
      return {};
    default:
      return state;
  }
};

// Create product review
export const createProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_CREATE_SUCCESS:
      return { loading: false, review: action.payload };
    case PRODUCT_REVIEW_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// Create product review
export const permissionProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_PERMISSION_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_PERMISSION_SUCCESS:
      return { loading: false, review: action.payload };
    case PRODUCT_REVIEW_PERMISSION_FAILURE:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_PERMISSION_RESET:
      return {};
    default:
      return state;
  }
};

// Delete product review
export const deleteProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_DELETE_SUCCESS:
      return { loading: false, review: action.payload };
    case PRODUCT_REVIEW_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    case PRODUCT_REVIEW_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
