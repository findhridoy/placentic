import { Skeleton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { queryProduct } from "../Redux/actions/productActions";
import CustomAlert from "./CustomAlert";

const ProductItem = ({ product }) => {
  return (
    <div className="category__item">
      <div className="category__img">
        <img src={product?.image} alt={product?.title} />
      </div>
      <Stack>
        <h3 className="product__title">{product?.title}</h3>
        <Stack justifyContent="space-between" direction="row">
          <span className="product__price">$ {product?.price}</span>
          <span className="product__price">{product?.rating}</span>
        </Stack>
      </Stack>
    </div>
  );
};

const Products = () => {
  // States
  const [keyword, setKeyword] = useState("");
  const [limit, setLimit] = useState(4);
  const [skip, setSkip] = useState(0);

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, products, counts } = useSelector(
    (state) => state.queryProduct
  );
  console.log(products);
  console.log(counts);

  useEffect(() => {
    dispatch(queryProduct(keyword, limit, skip));
  }, [dispatch, keyword, limit, skip]);

  useEffect(() => {
    if (error) {
      // cogoToast.error(error);
      // dispatch(categoryLimitListReset());
    }
    if (products?.message) {
      // cogoToast.error("Something was wrong!");
      // dispatch(categoryLimitListReset());
    }
  }, [error, products, dispatch]);
  return (
    <section className="products__section section">
      <div className="container">
        <div className="products__content">
          <h2 className="products__title section__title">Our Products</h2>
          <div className="products__data">
            {loading ? (
              [0, 1, 2, 3].map((index) => (
                <div className="products__loader" key={index}>
                  <Skeleton
                    height={280}
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
            ) : products?.length === 0 ? (
              <CustomAlert severity="info" message="No products are found!" />
            ) : (
              products?.map((product) => (
                <ProductItem product={product} key={product?._id} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
