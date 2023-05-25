import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

// store congure
export const store = configureStore({
  // reducers
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  // middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  // devtools hide in production mode
  devTools: process.env.NODE_ENV !== "production",
});
