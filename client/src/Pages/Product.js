import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Button,
  CircularProgress,
  IconButton,
  Skeleton,
  Stack,
} from "@mui/material";
import cogoToast from "cogo-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ProductTab from "../Components/ProductTab";
import Rating from "../Components/Rating";
import Layout from "../Layouts/Layout";
import { addToCart } from "../Redux/actions/cartActions";
import { getProduct, getProductReset } from "../Redux/actions/productActions";
import { addToWishlist } from "../Redux/actions/wishlistActions";

const Product = () => {
  // States
  const [quantity, setQuantity] = useState(1);

  // react router
  const { id } = useParams();

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.getProduct);
  const { review: reviews } = useSelector((state) => state.deleteProductReview);
  const { review } = useSelector((state) => state.createProductReview);
  const { review: arrpoveReviews } = useSelector(
    (state) => state.permissionProductReview
  );
  const { wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getProduct(id));

    return () => {
      dispatch(getProductReset());
    };
  }, [
    dispatch,
    id,
    reviews?.success,
    review?.success,
    arrpoveReviews?.success,
  ]);

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(getProductReset());
    }
    if (product?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(getProductReset());
    }
  }, [error, product, dispatch]);

  // Product quantity setup
  const handleQuantity = (action) => {
    if (action === "add") {
      setQuantity((preValue) => preValue + 1);
    }
    if (action === "remove") {
      setQuantity((preValue) => preValue - 1);
    }
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    dispatch(addToCart(product, quantity));
  };

  const exisWishlisttItem = wishlistItems?.find((x) => product?._id === x._id);

  // Add to wishlist functionality
  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };
  return (
    <Layout>
      <section className="product__section section">
        <div className="container">
          <div className="product__content">
            <div className="product__image">
              {loading ? (
                <Skeleton
                  height={450}
                  width="100%"
                  animation="wave"
                  variant="rectangular"
                />
              ) : (
                <img src={product?.image} alt={product?.title} />
              )}
            </div>
            <div className="product__details">
              {loading ? (
                <Stack>
                  <Skeleton width={160} animation="wave" height={35} />
                  <Skeleton width="100%" animation="wave" height={65} />
                  <Skeleton width={40} animation="wave" height={40} />

                  {[1, 2, 3, 4, 5].map((index) => (
                    <Skeleton
                      width="100%"
                      animation="wave"
                      height={20}
                      key={index}
                    />
                  ))}

                  <Stack marginTop="10px">
                    <Skeleton width={115} animation="wave" height={30} />
                  </Stack>
                  <Stack margin="12px 0">
                    <Skeleton width={70} animation="wave" height={22} />
                    <Skeleton
                      height={45}
                      width="23%"
                      animation="wave"
                      variant="rectangular"
                    />
                  </Stack>
                </Stack>
              ) : (
                <>
                  <div className="product__rating">
                    <Rating ratings={product?.ratings} />
                    <span className="product__review--text">
                      ({product?.countReviews} reviews)
                    </span>
                  </div>

                  <h1 className="product__title">{product?.title}</h1>
                  <span className="product__price">${product?.price}</span>
                  <span className="product__description">
                    {product?.description}
                  </span>

                  <span className="product__category">
                    Category:{" "}
                    <Link className="product__category--link" to="/">
                      {product?.category}
                    </Link>
                  </span>

                  <span className="product__countInStock">
                    {product?.countInStock > 0 ? (
                      "In Stock"
                    ) : (
                      <span className="product__countOutStock">
                        Out Of Stock
                      </span>
                    )}
                  </span>

                  <div className="product__count">
                    <IconButton
                      onClick={() => handleQuantity("remove")}
                      disabled={quantity < 2}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <input type="text" disabled value={quantity} />
                    <IconButton
                      onClick={() => handleQuantity("add")}
                      disabled={
                        quantity === product?.countInStock ||
                        product?.countInStock < 1
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </>
              )}

              <div className="product__button">
                {loading ? (
                  <>
                    <Skeleton
                      height={49}
                      width="100%"
                      animation="wave"
                      variant="rectangular"
                    />
                    <Skeleton
                      height={49}
                      width="100%"
                      animation="wave"
                      variant="rectangular"
                    />
                  </>
                ) : (
                  <>
                    <div className="product__btn btn btn__dark">
                      <Button
                        type="button"
                        disabled={product?.countInStock < 1}
                        onClick={handleAddToCart}
                      >
                        {false ? (
                          <CircularProgress
                            color="inherit"
                            size={30}
                            thickness={3}
                          />
                        ) : (
                          <>
                            <span className="btn__text">ADD TO CART</span>
                            <ShoppingCartIcon />
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="product__btn btn btn__white">
                      <Button
                        type="button"
                        onClick={handleAddToWishlist}
                        disabled={exisWishlisttItem}
                      >
                        {false ? (
                          <CircularProgress
                            color="inherit"
                            size={30}
                            thickness={3}
                          />
                        ) : (
                          <>
                            <span className="btn__text">Add to wish list</span>
                            <FavoriteBorderIcon />
                          </>
                        )}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Product others section */}
          <div className="product__tab">
            <ProductTab product={product} loading={loading} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Product;
