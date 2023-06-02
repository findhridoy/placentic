import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice, { userLoggedOut } from "./features/auth/authSlice";
import cartSlice from "./features/cart/cartSlice";

// reducers
const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authSlice,
  cart: cartSlice,
});

// store congure
export const store = configureStore({
  reducer: (state, action) => {
    if (userLoggedOut.match(action)) {
      state = undefined;
    }
    return reducers(state, action);
  },

  // middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  // devtools hide in production mode
  devTools: process.env.NODE_ENV !== "production",
});
