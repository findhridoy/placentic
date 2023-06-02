import { createSlice } from "@reduxjs/toolkit";

// cart from storage
const cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: { cart },
  reducers: {
    addToCart: (state, action) => {},
    removeFromCart: (state, action) => {},
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
