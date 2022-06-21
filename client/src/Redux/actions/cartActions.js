import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

// Add to cart action
export const addToCart = (data, quantity) => async (dispatch, getState) => {
  const productItem = {
    product: data?._id,
    title: data?.title,
    price: data?.price,
    image: data?.image,
    countInStock: data?.countInStock,
    quantity,
  };

  dispatch({
    type: CART_ADD_ITEM,
    payload: productItem,
  });

  // get cart data from state
  const {
    cart: { cartItems },
  } = getState();

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Remove from cart action
export const removeFromCart = (productID) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productID,
  });

  // get cart data from state
  const {
    cart: { cartItems },
  } = getState();

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
