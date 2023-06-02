import { createSlice } from "@reduxjs/toolkit";

// userInfo from storage
const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: { userInfo },
  reducers: {
    userLoggedIn: (state, actions) => {
      state.userInfo = actions.payload;
    },
    userLoggedOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
