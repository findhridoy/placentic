import axios from "axios";
import {
  CATEGORY_CREATE_FAILURE,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_RESET,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_LIST_FAILURE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_RESET,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_UPDATE_FAILURE,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_RESET,
  CATEGORY_UPDATE_SUCCESS,
} from "../constants/categoryConstants";

// create category action
export const createCategory = (categories) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
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
      "/api/category/create",
      categories,
      config
    );

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Category create reset
export const categoryCreateReset = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_CREATE_RESET,
  });
};

// category list action
export const categoryList = (path) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/category/${path}`, config);

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Category create reset
export const categoryListReset = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_LIST_RESET,
  });
};

// Update category action
export const updateCategory = (id, updateData) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
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
      `/api/category/update/${id}`,
      updateData,
      config
    );

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User profile error reset action
export const categoryUpdateErrorReset = () => async (dispatch) => {
  dispatch({
    type: CATEGORY_UPDATE_RESET,
  });
};
