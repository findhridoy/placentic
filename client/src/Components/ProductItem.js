import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";

const ProductItem = ({ product }) => {
  // react router
  const navigate = useNavigate();

  // Redux element
  // const dispatch = useDispatch();
  // const { cartItems } = useSelector((state) => state.cart);
  // const { wishlistItems } = useSelector((state) => state.wishlist);

  const cartItems = [];
  const wishlistItems = [];

  const exisCarttItem = cartItems?.find((x) => product?._id === x.product);
  const exisWishlisttItem = wishlistItems?.find((x) => product?._id === x._id);

  // Add to cart functionality
  const handleAddToCart = () => {
    // dispatch(addToCart(product, 1));
  };

  // Add to wishlist functionality
  const handleAddToWishlist = () => {
    // dispatch(addToWishlist(product));
  };

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={product?.image} alt={product?.title} />

        <div className="product__action">
          <Stack direction="row" justifyContent="center" spacing={0.5}>
            <IconButton
              onClick={handleAddToCart}
              disabled={exisCarttItem && true}
            >
              <ShoppingCartIcon />
            </IconButton>
            <IconButton
              onClick={handleAddToWishlist}
              disabled={exisWishlisttItem && true}
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
