import { createSlice } from "@reduxjs/toolkit";
import cogoToast from "cogo-toast";

// cart items from storage
const wishListItems = JSON.parse(localStorage.getItem("wishList"))
  ? JSON.parse(localStorage.getItem("wishList"))
  : [];

// wishList slice
const wishListSlice = createSlice({
  name: "wishList",
  initialState: { wishListItems },
  reducers: {
    addToWishList: (state, action) => {
      state.wishListItems.push(action.payload);
      localStorage.setItem("wishList", JSON.stringify(state.wishListItems));
      cogoToast.success(`${action.payload?.title} is added your wish list.`);
    },

    removeFromWishList: (state, action) => {
      const newWishListItems = state.wishListItems?.filter(
        (x) => x._id !== action.payload?._id
      );

      state.wishListItems = newWishListItems;
      localStorage.setItem("wishList", JSON.stringify(state.wishListItems));
      cogoToast.success(`${action.payload?.title} is removed.`);
    },
  },
});

export const { addToWishList, removeFromWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
