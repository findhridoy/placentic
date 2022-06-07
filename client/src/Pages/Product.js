import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button, CircularProgress, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ProductTab from "../Components/ProductTab";
import Rating from "../Components/Rating";
import Layout from "../Layouts/Layout";
import { getProduct } from "../Redux/actions/productActions";

const Product = () => {
  // react router
  const { id } = useParams();

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.getProduct);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      // cogoToast.error(error);
      //   dispatch(categoryLimitListReset());
    }
    if (product?.message) {
      // cogoToast.error("Something was wrong!");
      //   dispatch(categoryLimitListReset());
    }
  }, [error, product, dispatch]);
  return (
    <Layout>
      <section className="product__section section">
        <div className="container">
          <div className="product__content">
            <div className="product__image">
              <img src={product?.image} alt={product?.title} />
            </div>
            <div className="product__details">
              <div className="product__rating">
                <Rating ratings={product?.ratings} />
                <span className="product__review--text">
                  {product?.reviews?.length} reviews
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

              <div className="product__count">
                <IconButton>
                  <RemoveIcon />
                </IconButton>
                <input type="text" disabled value={5} />
                <IconButton>
                  <AddIcon />
                </IconButton>
              </div>

              <div className="product__button">
                <div className="product__btn btn btn__dark">
                  <Button type="button">
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
                  <Button type="button">
                    {loading ? (
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
              </div>
            </div>
          </div>

          {/* Product others section */}
          <div className="product__tab">
            <ProductTab product={product} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Product;
