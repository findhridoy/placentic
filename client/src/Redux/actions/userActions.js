import axios from "axios";
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

// Register action
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/users/register", userData, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // store userInfo in localStorage
    if (!data?.message) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Login action
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    // config
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/users/login", userData, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    // store userInfo in localStorage
    if (!data?.message) {
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Error reset action
export const userErrorReset = () => async (dispatch) => {
  dispatch({
    type: USER_ERROR_RESET,
  });
};

// Logout action
export const logoutUser = () => async (dispatch) => {
  // remove userInfo in localStorage
  localStorage.removeItem("userInfo");

  dispatch({
    type: USER_LOGOUT,
  });
};

// Get user profile action
export const getUserProfile = (path) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
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

    const { data } = await axios.get(`/api/users/${path}`, config);

    dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User profile error reset action
export const userProfileErrorReset = () => async (dispatch) => {
  dispatch({
    type: USER_PROFILE_RESET,
  });
};

// Update user profile action
export const updateUserProfile = (updateData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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

    const { data } = await axios.put("/api/users/update", updateData, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });

    // store userInfo in localStorage
    if (!data?.message) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User profile error reset action
export const userUpdateErrorReset = () => async (dispatch) => {
  dispatch({
    type: USER_UPDATE_RESET,
  });
};

// User list action
export const getUseryList = (path) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
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

    const { data } = await axios.get(`/api/${path}`, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User list reset
export const userListReset = () => async (dispatch) => {
  dispatch({
    type: USER_LIST_RESET,
  });
};

// Make admin action
export const userMakeAdmin = (id, updateData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_MAKEADMIN_REQUEST,
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
      `/api/users/updateAdmin/${id}`,
      updateData,
      config
    );

    dispatch({
      type: USER_MAKEADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_MAKEADMIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Category update error reset action
export const userMakeAdminReset = () => async (dispatch) => {
  dispatch({
    type: USER_MAKEADMIN_RESET,
  });
};

// Delete user action
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
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

    const { data } = await axios.delete(`/api/users/delete/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// User delete error reset action
export const userDeleteErrorReset = () => async (dispatch) => {
  dispatch({
    type: USER_DELETE_RESET,
  });
};
