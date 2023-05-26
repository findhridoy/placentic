import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../app/features/products/productApi";
import ProductTab from "../components/ProductTab";
import Rating from "../components/Rating";
import CustomAlert from "../components/controls/CustomAlert";
import CustomButton from "../components/controls/CustomButton";
import ButtonSkeleton from "../components/skeletons/ButtonSkeleton";
import ProductDetailsSkeleton from "../components/skeletons/ProductDetailsSkeleton";
import ProductImageSkeleton from "../components/skeletons/ProductImageSkeleton";
import Layout from "../layouts/Layout";

const Product = () => {
  // States
  const [quantity, setQuantity] = useState(1);

  // react router
  const { prodId } = useParams();

  // Redux toolkit element
  const { isLoading, isError, error, data: product } = useGetProductQuery(
    prodId
  );

  // const dispatch = useDispatch();
  // const { loading, error, product } = useSelector((state) => state.getProduct);
  // const { review: reviews } = useSelector((state) => state.deleteProductReview);
  // const { review } = useSelector((state) => state.createProductReview);
  // const { review: arrpoveReviews } = useSelector(
  //   (state) => state.permissionProductReview
  // );
  // const { wishlistItems } = useSelector((state) => state.wishlist);

  useEffect(
    () => {
      // dispatch(getProduct(id));

      return () => {
        // dispatch(getProductReset());
      };
    },
    [
      // dispatch,
      // id,
      // reviews?.success,
      // review?.success,
      // arrpoveReviews?.success,
    ]
  );

  // useEffect(() => {
  //   if (error) {
  //     cogoToast.error(error);
  //     dispatch(getProductReset());
  //   }
  //   if (product?.message) {
  //     cogoToast.error("Something was wrong!");
  //     dispatch(getProductReset());
  //   }
  // }, [error, product, dispatch]);

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
    // dispatch(addToCart(product, quantity));
  };

  // const exisWishlisttItem = wishlistItems?.find((x) => product?._id === x._id);

  // Add to wishlist functionality
  const handleAddToWishlist = () => {
    // dispatch(addToWishlist(product));
  };
  return (
    <Layout>
      <section className="product__section section">
        <div className="container">
          {isError ? (
            <CustomAlert severity="error" message={error?.data?.message} />
          ) : product?.message ? (
            <CustomAlert severity="warning" message={product?.message} />
          ) : (
            <>
              <div className="product__content">
                <div className="product__image">
                  {isLoading ? (
                    <ProductImageSkeleton />
                  ) : (
                    <img src={product?.image} alt={product?.title} />
                  )}
                </div>

                <div className="product__details">
                  {isLoading ? (
                    <ProductDetailsSkeleton />
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
                    {isLoading ? (
                      <>
                        <ButtonSkeleton height={49} width="100%" />
                        <ButtonSkeleton height={49} width="100%" />
                      </>
                    ) : (
                      <>
                        <CustomButton
                          className="product__btn btn btn__dark"
                          text="ADD TO CART"
                          endIcon={<ShoppingCartIcon />}
                          onClick={handleAddToCart}
                        />

                        <CustomButton
                          className="product__btn btn btn__white"
                          text="Add to wish list"
                          endIcon={<FavoriteBorderIcon />}
                          onClick={handleAddToWishlist}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Product tab section */}
          <div className="product__tab">
            <ProductTab product={product} loading={isLoading} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Product;
