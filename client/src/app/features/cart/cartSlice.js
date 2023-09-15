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

// payment from storage
const paymentInfo = JSON.parse(localStorage.getItem("paymentInfo"))
  ? JSON.parse(localStorage.getItem("paymentInfo"))
  : {};

// cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems, cartAmounts, paymentInfo },
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
    setPaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
      localStorage.setItem("paymentInfo", JSON.stringify(state.paymentInfo));
    },

    resetCart: (state, action) => {
      state.cartItems = [];
      state.cartAmounts = {};
      state.paymentInfo = {};
      localStorage.removeItem("cart");
      localStorage.removeItem("amount");
      localStorage.removeItem("paymentInfo");
    },
  },
});

export const {
  addToCart,
  updateCartItem,
  removeFromCart,
  setCartAmount,
  setPaymentInfo,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
