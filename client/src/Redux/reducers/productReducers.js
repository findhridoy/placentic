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

// Get product initial state
const productState = {
  loading: true,
  product: {},
};

// Get product reducer
export const getProductReducer = (state = productState, action) => {
  switch (action.type) {
    case PRODUCT_GET_REQUEST:
      return { ...state, loading: true };
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
