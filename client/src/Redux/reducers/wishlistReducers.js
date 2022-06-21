import {
  WISHLIST_ADD_ITEM,
  WISHLIST_REMOVE_ITEM,
} from "../constants/wishlistConstant";

// Wishlist reducers
export const wishlistReducer = (state = { wishlistItems: [] }, action) => {
  switch (action.type) {
    case WISHLIST_ADD_ITEM:
      return {
        ...state,
        wishlistItems: [...state.wishlistItems, action.payload],
      };

    case WISHLIST_REMOVE_ITEM:
      return {
        ...state,
        wishlistItems: state.wishlistItems?.filter(
          (x) => action.payload !== x._id
        ),
      };

    default:
      return state;
  }
};
