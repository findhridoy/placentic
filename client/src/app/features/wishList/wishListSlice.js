import { createSlice } from "@reduxjs/toolkit";
import cogoToast from "cogo-toast";

// cart items from storage
const wishlistItems = JSON.parse(localStorage.getItem("wishlist"))
  ? JSON.parse(localStorage.getItem("wishlist"))
  : [];

// wishlist slice
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { wishlistItems },
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlistItems.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
      cogoToast.success(`${action.payload?.title} is added your wish list.`);
    },

    removeFromWishlist: (state, action) => {
      const newWishlistItems = state.wishlistItems?.filter(
        (x) => x._id !== action.payload?._id
      );

      state.wishlistItems = newWishlistItems;
      localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
      cogoToast.success(`${action.payload?.title} is removed.`);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
