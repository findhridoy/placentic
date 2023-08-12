import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../app/features/cart/cartSlice";
import { addToWishlist } from "../app/features/wishlist/wishlistSlice";
import Rating from "./Rating";
import CustomButton from "./controls/CustomButton";
import ButtonSkeleton from "./skeletons/ButtonSkeleton";

const ProductListItem = ({ product }) => {
  // react router
  const navigate = useNavigate();
  // Redux elements
  const dispatch = useDispatch();
  const existCartItem = useSelector((state) =>
    state.cart?.cartItems?.some((x) => product?._id === x?._id)
  );
  const existWishlistItem = useSelector((state) =>
    state.wishlist?.wishlistItems?.some((x) => product?._id === x._id)
  );

  const productData = {
    _id: product?._id,
    title: product?.title,
    price: product?.price,
    image: product?.image,
    countInStock: product?.countInStock,
    quantity: 1,
    totalPrice: product?.price * 1,
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    dispatch(addToCart(productData));
  };

  // Add to wishlist functionality
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(productData));
  };
  return (
    <div className="productListItem">
      <div className="productListItem__img">
        <img src={product?.image} alt={product?.title} />
      </div>

      <div className="productListItem__content">
        <div className="productListItem__header">
          <div>
            <Link to={`/product/${product?._id}`}>
              <h1 className="productListItem__title">{product?.title}</h1>
            </Link>
            <span className="productListItem__price">${product?.price}</span>
          </div>

          <div className="productListItem__rating">
            <Rating ratings={product?.ratings} />
            <span className="productListItem__review--text">
              ({product?.countReviews} reviews)
            </span>
          </div>
        </div>

        <span className="productListItem__description--large__screen">
          {product?.description?.slice(0, 303)}....
        </span>

        <span className="productListItem__description">
          {product?.description?.slice(0, 155)}....
        </span>

        <div className="productListItem__button">
          {false ? (
            <>
              <ButtonSkeleton height={49} width="100%" />
              <ButtonSkeleton height={49} width="100%" />
            </>
          ) : (
            <>
              <CustomButton
                className="productListItem__btn btn small__btn btn__dark"
                text={existCartItem ? "Item is added" : "ADD TO CART"}
                endIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                disabled={existCartItem}
              />

              <IconButton
                disabled={existWishlistItem}
                onClick={handleAddToWishlist}
              >
                {existWishlistItem ? (
                  <FavoriteIcon fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>

              <IconButton onClick={() => navigate(`/product/${product?._id}`)}>
                <SearchIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
