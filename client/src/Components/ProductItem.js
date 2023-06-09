import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../app/features/cart/cartSlice";
import { addToWishList } from "../app/features/wishList/wishListSlice";
import Rating from "./Rating";

const ProductItem = ({ product }) => {
  // react router
  const navigate = useNavigate();

  // Redux elements
  const dispatch = useDispatch();
  const existCartItem = useSelector((state) =>
    state.cart?.cartItems?.some((x) => product?._id === x?._id)
  );
  const existWishListItem = useSelector((state) =>
    state.wishList?.wishListItems?.some((x) => product?._id === x._id)
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
    dispatch(addToWishList(productData));
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={product?.image} alt={product?.title} />

        <div className="product__action">
          <Stack direction="row" justifyContent="center" spacing={0.5}>
            <IconButton onClick={handleAddToCart} disabled={existCartItem}>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              onClick={handleAddToWishlist}
              disabled={existWishListItem}
            >
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`/product/${product?._id}`)}>
              <SearchIcon />
            </IconButton>
          </Stack>
        </div>
      </div>

      <Stack marginTop={1}>
        <Link to={`/product/${product?._id}`}>
          <h3 className="product__title">{product?.title}</h3>
        </Link>
        <Stack justifyContent="space-between" direction="row">
          <span className="product__price">${product?.price}</span>
          <span className="product__rating">
            <Rating ratings={product?.ratings} />
          </span>
        </Stack>
      </Stack>
    </div>
  );
};

export default ProductItem;
