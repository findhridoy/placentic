import AddIcon from "@mui/icons-material/Add";
import { Skeleton, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useState } from "react";
import { useGetCategoriesQuery } from "../app/features/categories/categoryApi";
import { useGetProductsQuery } from "../app/features/products/productApi";
import ProductItem from "../components/ProductItem";
import CustomAlert from "../components/controls/CustomAlert";
import CustomButton from "../components/controls/CustomButton";
import ButtonSkeleton from "../components/skeletons/ButtonSkeleton";
import Layout from "./Layout";

const ProductLayout = ({ children }) => {
  // States
  const [queries, setQueries] = useState("");
  const [size, setSize] = useState(6);
  // const [keyword, setKeyword] = useState("");

  // Redux toolkit element
  const { isLoading, data: categories } = useGetCategoriesQuery();
  const {
    isLoading: productLoading,
    isFetching,
    data: productsData,
  } = useGetProductsQuery(`product?size=${size}&categories=${queries}`);

  const handleFilter = (category) => {
    setQueries(category);
  };

  // load more functionality
  const handleLoadMore = () => {
    setSize((preValue) => preValue + 3);
  };
  return (
    <Layout>
      <section className="productLayout">
        <div className="container">
          <div className="productLayout__container">
            <div className="productLayout__menu">
              {isLoading && <h4>Loading.....</h4>}
              <h4 className="menu__title">
                Categories <AddIcon />
              </h4>
              <MenuList>
                <MenuItem onClick={() => handleFilter("")}>All</MenuItem>
                {categories?.map((category) => (
                  <MenuItem
                    onClick={() => handleFilter(category?.title)}
                    key={category?._id}
                  >
                    {category?.title}
                  </MenuItem>
                ))}
              </MenuList>

              <h4 className="menu__title">
                Filter By <AddIcon />
              </h4>

              <h4 className="menu__title">
                Other <AddIcon />
              </h4>
            </div>
            <div className="productLayout__content">
              <div className="productLayout__data">
                {productLoading ? (
                  [0, 1, 2, 3, 4, 5].map((index) => (
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
                ) : productsData?.products?.length ? (
                  productsData?.products?.map((product) => (
                    <ProductItem product={product} key={product?._id} />
                  ))
                ) : (
                  <CustomAlert
                    severity="info"
                    message="No products are found!"
                  />
                )}
              </div>

              {productsData?.counts === productsData?.products?.length ||
              productsData?.products?.length === 0 ? (
                " "
              ) : (
                <>
                  {productLoading ? (
                    <ButtonSkeleton height={40} width="100%" marginTop={5} />
                  ) : (
                    <CustomButton
                      className="productLayout__btn btn small__btn btn__dark"
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
        </div>
      </section>
    </Layout>
  );
};

export default ProductLayout;
