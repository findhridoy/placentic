import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM
} from "../constants/wishlistConstant";

// Add to wishlist action
export const addToWishlist = (product) => async (dispatch, getState) => {
  dispatch({
    type: WISHLIST_ADD_ITEM,
    payload: product,
  });

  // get cart data from state
  const {
    wishlist: { wishlistItems },
  } = getState();

  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
};

// Remove from wishlist action
export const removeFromWishlist = (productID) => async (dispatch, getState) => {
  dispatch({
    type: WISHLIST_REMOVE_ITEM,
    payload: productID,
  });

  // get cart data from state
  const {
    wishlist: { wishlistItems },
  } = getState();

  localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
};
