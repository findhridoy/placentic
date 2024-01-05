import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateCartItem } from "../app/features/cart/cartSlice";
import { addToWishlist } from "../app/features/wishlist/wishlistSlice";

const CartItem = ({ cartItem }) => {
  // Redux element
  const dispatch = useDispatch();
  const existWishlistItem = useSelector((state) =>
    state.wishlist?.wishlistItems?.some((x) => cartItem?._id === x._id)
  );

  // Product quantity setup
  const handleQuantity = (action) => {
    const cartData = {
      _id: cartItem?._id,
      key: action,
    };

    dispatch(updateCartItem(cartData));
  };

  // Remove from cart
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  // Add to wishlist functionality
  const handleAddToWishlist = (cartItem) => {
    dispatch(addToWishlist(cartItem));
  };
  return (
    <div className="cartItem">
      <div className="cartItem__image">
        <img src={cartItem?.image} alt={cartItem?.title} />
      </div>
      <div className="cartItem__content">
        <div className="cartItem__data">
          <div className="cartItem__details">
            <Link to="/">
              <h3 className="cartItem__title">{cartItem?.title}</h3>
            </Link>

            <span className="cartItem__price">${cartItem?.price}</span>
            <span className="cartItem__stock">
              {cartItem?.countInStock > 0 ? (
                "In Stock"
              ) : (
                <span className="cartItem__countOutStock">Out Of Stock</span>
              )}
            </span>
          </div>

          <span className="cartItem__totalPrice">${cartItem?.totalPrice}</span>
        </div>

        <div className="cartItem__action">
          <div className="cartItem__count">
            <IconButton
              onClick={() => handleQuantity("decrease")}
              disabled={cartItem?.quantity < 2}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <input type="text" disabled value={cartItem?.quantity} />
            <IconButton
              onClick={() => handleQuantity("increase")}
              disabled={
                cartItem?.quantity === cartItem?.countInStock ||
                cartItem?.countInStock === 0
              }
              size="small"
            >
              <AddIcon />
            </IconButton>
          </div>

          <div className="cartItem__button--group">
            {existWishlistItem ? (
              <span className="cartItem__btn active__btn">
                <FavoriteIcon fontSize="small" />
                <span className="btn__text">Saved</span>
              </span>
            ) : (
              <span
                className="cartItem__btn"
                onClick={() => handleAddToWishlist(cartItem)}
              >
                <FavoriteIcon fontSize="small" />
                <span className="btn__text">Save</span>
              </span>
            )}

            <span
              className="cartItem__btn"
              onClick={() => handleRemoveFromCart(cartItem)}
            >
              <DeleteIcon fontSize="small" />
              <span className="btn__text">Remove</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
