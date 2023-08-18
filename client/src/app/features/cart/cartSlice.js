import { createSlice } from "@reduxjs/toolkit";
import cogoToast from "cogo-toast";

// cart items from storage
const cartItems = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// cart amounts from storage
const cartAmounts = JSON.parse(localStorage.getItem("amount"))
  ? JSON.parse(localStorage.getItem("amount"))
  : {};

// cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems, cartAmounts },
  reducers: {
    addToCart: (state, action) => {
      const existCartItem = state.cartItems?.find(
        (x) => x._id === action.payload?._id
      );

      if (existCartItem) {
        state.cartItems = state?.cartItems?.map((x) =>
          existCartItem?._id === x?._id ? action.payload : x
        );
        cogoToast.success(`Cart item is updated.`);
      } else {
        state.cartItems.push(action.payload);
        cogoToast.success(`${action.payload?.title} is added.`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    updateCartItem: (state, action) => {
      const existCartItem = state.cartItems?.find(
        (x) => x._id === action.payload?._id
      );
      if (existCartItem && action.payload.key === "increase") {
        existCartItem.quantity += 1;
        existCartItem.totalPrice = existCartItem.price * existCartItem.quantity;
        cogoToast.info(`Cart item is increased.`);
      }
      if (existCartItem && action.payload.key === "decrease") {
        existCartItem.quantity -= 1;
        existCartItem.totalPrice = existCartItem.price * existCartItem.quantity;
        cogoToast.warn(`Cart item is decreased.`);
      }
    },

    removeFromCart: (state, action) => {
      const newCartItems = state.cartItems?.filter(
        (x) => x._id !== action.payload?._id
      );

      state.cartItems = newCartItems;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      cogoToast.warn(`Cart item is removed.`);
    },

    setCartAmount: (state, action) => {
      state.cartAmounts = action.payload;
      localStorage.setItem("amount", JSON.stringify(state.cartAmounts));
    },
  },
});

export const { addToCart, updateCartItem, removeFromCart, setCartAmount } =
  cartSlice.actions;
export default cartSlice.reducer;
