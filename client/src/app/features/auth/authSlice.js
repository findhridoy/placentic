import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
  },
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
