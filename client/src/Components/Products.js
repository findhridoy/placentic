import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useGetProductsQuery } from "../app/features/products/productApi";
import ProductItem from "./ProductItem";
import CustomAlert from "./controls/CustomAlert";
import CustomButton from "./controls/CustomButton";
import ButtonSkeleton from "./skeletons/ButtonSkeleton";
import ProductItemSkeleton from "./skeletons/ProductItemSkeleton";

const Products = () => {
  // States
  // const [keyword, setKeyword] = useState("");
  const [size, setSize] = useState(8);

  // Redux toolkit element
  const {
    isLoading,
    isError,
    error,
    isFetching,
    data: productData,
  } = useGetProductsQuery(size);

  // load more functionality
  const handleLoadMore = () => {
    setSize((preValue) => preValue + 4);
  };
  return (
    <section className="products__section section">
      <div className="container">
        <div className="products__content">
          <h2 className="products__title section__title">Our Products</h2>
          <div className="products__data">
            {isLoading ? (
              [...Array(8).keys()].map((index) => (
                <ProductItemSkeleton key={index} />
              ))
            ) : isError ? (
              <CustomAlert severity="error" message={error?.data?.message} />
            ) : productData?.products?.length < 1 ? (
              <CustomAlert severity="info" message="No products are found!" />
            ) : (
              productData?.products?.map((product) => (
                <ProductItem product={product} key={product?._id} />
              ))
            )}
          </div>

          {productData?.counts === productData?.products?.length ||
          productData?.products?.length === 0 ? (
            " "
          ) : (
            <>
              {isLoading ? (
                <ButtonSkeleton height={42} width={150} />
              ) : (
                <CustomButton
                  className="product__btn btn btn__dark small__btn"
                  text="Load More"
                  endIcon={<AddIcon />}
                  onClick={handleLoadMore}
                  loading={isFetching}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
