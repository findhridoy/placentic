import AddIcon from "@mui/icons-material/Add";
import { Button, CircularProgress, Skeleton, Stack } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  queryProduct,
  queryProductReset,
} from "../Redux/actions/productActions";
import CustomAlert from "./CustomAlert";
import ProductItem from "./ProductItem";

const Products = () => {
  // States
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(8);
  const [loader, setLoader] = useState();

  // Redux element
  const dispatch = useDispatch();
  const {
    loading,
    error,
    products,
    product: storeProducts,
    counts,
  } = useSelector((state) => state.queryProduct);

  useEffect(() => {
    dispatch(queryProduct(keyword, limit));
  }, [dispatch, keyword, limit]);

  useEffect(() => {
    if (loading && !storeProducts) {
      setLoader(true);
    }
    if (storeProducts) {
      setLoader(false);
    }
    if (error) {
      cogoToast.error(error);
      dispatch(queryProductReset());
    }
    if (products?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(queryProductReset());
    }
  }, [error, products, dispatch, loading, storeProducts]);

  // load more functionality
  const handleClick = () => {
    setLimit((preValue) => preValue + 4);
  };
  return (
    <section className="products__section section">
      <div className="container">
        <div className="products__content">
          <h2 className="products__title section__title">Our Products</h2>
          <div className="products__data">
            {loader ? (
              [0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                <div className="products__loader" key={index}>
                  <Skeleton
                    height={260}
                    animation="wave"
                    variant="rectangular"
                  />
                  <Stack marginTop={1}>
                    <Skeleton width="100%" animation="wave" height={35} />
                    <Stack justifyContent="space-between" direction="row">
                      <Skeleton width={70} animation="wave" height={20} />
                      <Skeleton width={110} animation="wave" height={20} />
                    </Stack>
                  </Stack>
                </div>
              ))
            ) : storeProducts?.length === 0 ? (
              <CustomAlert severity="info" message="No products are found!" />
            ) : (
              storeProducts?.map((product) => (
                <ProductItem product={product} key={product?._id} />
              ))
            )}
          </div>

          {counts === products?.length || storeProducts?.length === 0 ? (
            " "
          ) : (
            <div className="product__btn btn small__btn btn__dark">
              <Button type="button" onClick={handleClick}>
                {loading ? (
                  <CircularProgress color="inherit" size={30} thickness={3} />
                ) : (
                  <>
                    <span className="btn__text">Load More</span>
                    <AddIcon />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
