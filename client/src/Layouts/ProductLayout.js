import AddIcon from "@mui/icons-material/Add";
import { Skeleton, Stack } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  categoryListReset,
} from "../App/actions/categoryActions";
import { productList, productListReset } from "../App/actions/productActions";
import CustomAlert from "../Components/CustomAlert";
import ProductItem from "../Components/ProductItem";
import Layout from "./Layout";

const ProductLayout = ({ children }) => {
  // States
  const [filterProduct, setFilterProduct] = useState([]);
  // const [keyword, setKeyword] = useState("");

  // Redux element
  const dispatch = useDispatch();
  const { loading: catLoading, error: catError, categories } = useSelector(
    (state) => state.categoryList
  );
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  // Get categories
  useEffect(() => {
    dispatch(categoryList("categories"));

    return () => {
      dispatch(categoryListReset());
    };
  }, [dispatch]);

  // Get products
  useEffect(() => {
    dispatch(productList("products"));

    return () => {
      dispatch(productListReset());
    };
  }, [dispatch]);

  useEffect(() => {
    setFilterProduct(products);
  }, [setFilterProduct, products]);

  // Handle filter
  const handleFilter = (key) => {
    const filterd = products?.filter((x) => x.category === key);

    if (filterd) {
      setFilterProduct(filterd);
    } else {
      setFilterProduct([]);
    }
  };
  // load more functionality
  const handleClick = () => {
    // setLimit((preValue) => preValue + 3);
  };
  return (
    <Layout>
      <section className="productLayout">
        <div className="container">
          <div className="productLayout__container">
            <div className="productLayout__menu">
              {catLoading && <h4>Loading.....</h4>}
              <h4 className="menu__title">
                Categories <AddIcon />
              </h4>
              <MenuList>
                <MenuItem onClick={() => setFilterProduct(products)}>
                  All
                </MenuItem>
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
                Ratings <AddIcon />
              </h4>
            </div>
            <div className="productLayout__content">
              <div className="productLayout__data">
                {loading ? (
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
                ) : filterProduct?.length ? (
                  filterProduct?.map((product) => (
                    <ProductItem product={product} key={product?._id} />
                  ))
                ) : (
                  <CustomAlert
                    severity="info"
                    message="No products are found!"
                  />
                )}
              </div>
            </div>

            {/* {counts === products?.length || storeProducts?.length === 0 ? (
              " "
            ) : (
              <div className="product__btn btn small__btn btn__dark">
                {false ? (
                  <Skeleton
                    height={42}
                    width={150}
                    animation="wave"
                    variant="rectangular"
                  />
                ) : (
                  <Button type="button" onClick={handleClick}>
                    {loading ? (
                      <CircularProgress
                        color="inherit"
                        size={20}
                        thickness={3}
                      />
                    ) : (
                      <>
                        <span className="btn__text">Load More</span>
                        <AddIcon />
                      </>
                    )}
                  </Button>
                )}
              </div>
            )} */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductLayout;
