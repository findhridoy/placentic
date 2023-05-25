import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../App/actions/cartActions";

const CartItem = ({ cartItem }) => {
  // Redux element
  const dispatch = useDispatch();

  // Product quantity setup
  const handleQuantity = (action) => {
    if (action === "add") {
      let qty = cartItem?.quantity + 1;
      dispatch(addToCart(cartItem, qty));
    }
    if (action === "remove") {
      let qty = cartItem?.quantity - 1;
      dispatch(addToCart(cartItem, qty));
    }
  };

  // Remove from cart
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(cartItem?.product));
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

          <span className="cartItem__totalPrice">
            ${cartItem?.price * cartItem?.quantity}
          </span>
        </div>

        <div className="cartItem__action">
          <div className="cartItem__count">
            <IconButton
              onClick={() => handleQuantity("remove")}
              disabled={cartItem?.quantity < 2}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <input type="text" disabled value={cartItem?.quantity} />
            <IconButton
              onClick={() => handleQuantity("add")}
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
            <span className="cartItem__btn">
              <FavoriteIcon fontSize="small" />
              <span className="btn__text">Save</span>
            </span>
            <span className="cartItem__btn" onClick={handleRemoveFromCart}>
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
