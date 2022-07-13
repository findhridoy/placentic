import axios from "axios";
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

// create product action
export const createProduct = (products) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    // get user data from state
    const {
      userLogin: { userInfo },
    } = getState();

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.post("/api/product/add", products, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Product create reset
export const productCreateReset = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CREATE_RESET,
  });
};

// product list action
export const productList = (path, keyword = "") => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    // get user data from state
    const {
      userLogin: { userInfo },
    } = getState();

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/product/${path}?keyword=${keyword}`,
      config
    );

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Product list reset
export const productListReset = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_RESET,
  });
};

// Update product action
export const updateProduct = (id, updateData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
    });

    // get user data from state
    const {
      userLogin: { userInfo },
    } = getState();

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/product/update/${id}`,
      updateData,
      config
    );

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Product update reset action
export const productUpdateReset = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_UPDATE_RESET,
  });
};

// Delete product action
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    // get user data from state
    const {
      userLogin: { userInfo },
    } = getState();

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/product/delete/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Product delete reset action
export const productDeleteReset = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_DELETE_RESET,
  });
};

// Get product action
export const getProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_GET_REQUEST,
    });

    // get user data from state
    const {
      userLogin: { userInfo },
    } = getState();

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(`/api/product/product/${id}`, config);

    dispatch({
      type: PRODUCT_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_GET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get product reset
export const getProductReset = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_GET_RESET,
  });
};

// query product list action
export const queryProduct = (limit) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_QUERY_REQUEST,
    });

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`/api/product?limit=${limit}`, config);

    dispatch({
      type: PRODUCT_QUERY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_QUERY_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Query product reset
export const queryProductReset = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_QUERY_RESET,
  });
};

// create product review action
export const createProductReview = (id, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_REVIEW_CREATE_REQUEST,
    });

    // get user data from state
    const {
      userLogin: { userInfo },
    } = getState();

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.post(
      `/api/product/review/${id}`,
      review,
      config
    );

    dispatch({
      type: PRODUCT_REVIEW_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Create product review reset
export const createProductReviewReset = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_REVIEW_CREATE_RESET,
  });
};

// Permission product review action
export const permissionProductReview = (productID, reviewID, request) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_REVIEW_PERMISSION_REQUEST,
    });

    // get user data from state
    const {
      userLogin: { userInfo },
    } = getState();

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/product/review/approve/${productID}?reviewID=${reviewID}&request=${request}`,
      config
    );

    dispatch({
      type: PRODUCT_REVIEW_PERMISSION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_PERMISSION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Permission product review reset
export const permissionProductReviewReset = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_REVIEW_PERMISSION_RESET,
  });
};

// Delete product review action
export const deleteProductReview = (productID, reviewID) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: PRODUCT_REVIEW_DELETE_REQUEST,
    });

    // get user data from state
    const {
      userLogin: { userInfo },
    } = getState();

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/product/review?productID=${productID}&reviewID=${reviewID}`,
      config
    );

    dispatch({
      type: PRODUCT_REVIEW_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_REVIEW_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Delete product review reset
export const deleteProductReviewReset = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_REVIEW_DELETE_RESET,
  });
};
