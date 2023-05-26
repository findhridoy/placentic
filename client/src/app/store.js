import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";

// store congure
export const store = configureStore({
  // reducers
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    auth: authSlice,
  },

  // middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  // devtools hide in production mode
  devTools: process.env.NODE_ENV !== "production",
});
