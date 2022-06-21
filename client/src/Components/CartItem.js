import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const CartItem = () => {
  // States
  const [quantity, setQuantity] = useState(1);

  // Product quantity setup
  const handleQuantity = (action) => {
    if (action === "add") {
      setQuantity((preValue) => preValue + 1);
    }
    if (action === "remove") {
      setQuantity((preValue) => preValue - 1);
    }
  };
  return (
    <div className="cartItem">
      <div className="cartItem__image">
        <img
          src="https://res.cloudinary.com/dvrlnpthq/image/upload/v1654558055/Placentic-Products/xxvshrm8b9q8d3yh3i0z.jpg"
          alt=""
        />
      </div>
      <div className="cartItem__content">
        <div className="cartItem__data">
          <div className="cartItem__details">
            <Link to="/">
              <h3 className="cartItem__title">
                Lorem ipsum dolor sit amet consectetur.
              </h3>
            </Link>
            <span className="cartItem__price">$12</span>
            <span className="cartItem__stock">In Stock</span>
          </div>

          <div className="cartItem__count">
            <IconButton
              onClick={() => handleQuantity("remove")}
              disabled={quantity < 2}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <input type="text" disabled value={quantity} />
            <IconButton onClick={() => handleQuantity("add")} size="small">
              <AddIcon />
            </IconButton>
          </div>

          <span className="cartItem__totalPrice">$12</span>
        </div>
        <div className="cartItem__action">
          <div className="cartItem__button--group">
            <span className="cartItem__btn">
              <FavoriteIcon fontSize="small" />
              <span className="btn__text">Save</span>
            </span>
            <span className="cartItem__btn">
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
