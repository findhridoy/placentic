import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

// Cart reducers
export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      //  check exist item
      const existItem = state.cartItems?.find(
        (x) => item?.product === x?.product
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems?.map((x) =>
            existItem?.product === x?.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems?.filter((x) => action.payload !== x.product),
      };

    default:
      return state;
  }
};
