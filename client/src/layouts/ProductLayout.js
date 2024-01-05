import AddIcon from "@mui/icons-material/Add";
// import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
import { useGetProductsQuery } from "../app/features/products/productApi";
import ProductItem from "../components/ProductItem";
import ProductLayoutFilter from "../components/ProductLayoutFilter";
import ProductLayoutFilterMenu from "../components/ProductLayoutFilterMenu";
import ProductListItem from "../components/ProductListItem";
import CustomAlert from "../components/controls/CustomAlert";
import CustomButton from "../components/controls/CustomButton";
import CustomViewer from "../components/controls/CustomViewer";
import ButtonSkeleton from "../components/skeletons/ButtonSkeleton";
import ProductItemSkeleton from "../components/skeletons/ProductItemSkeleton";
import CustomDropdown from "./../components/controls/CustomDropdown";

const ProductLayout = ({ categories, FilterMenuComponent }) => {
  // States
  const [size, setSize] = useState(6);
  const [sort, setSort] = useState("");
  const [price, setPrice] = useState([0, 100]);
  const [rating, setRating] = useState(0);
  const [viewer, setViewer] = useState("grid");

  // sorting options
  const sortOptions = [
    { label: "Default", value: "" },
    { label: "Newest First", value: "updatedAt" },
    { label: "Oldest First", value: "-createdAt" },
    { label: "Price: Low to High", value: "price" },
    { label: "Price: High to Low", value: "-price" },
  ];

  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: productsData,
  } = useGetProductsQuery(
    `product?size=${size}&category=${categories}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}&sort=${sort}`
  );

  // loadmore handler
  const handleLoadmore = () => {
    setSize((preValue) => preValue + 3);
  };

  return (
    <section className="productLayout">
      <div className="container">
        <div className="productLayout__container">
          <div className="productLayoutMenu">
            <ProductLayoutFilter
              FilterMenuComponent={FilterMenuComponent}
              price={price}
              setPrice={setPrice}
              rating={rating}
              setRating={setRating}
              sort={sort}
              setSort={setSort}
              sortOptions={sortOptions}
            />
          </div>

          <div className="productLayout__content">
            <div className="productLayout__header">
              {isError ? (
                <span className="productLayout__foundsTitle">
                  No products are found!
                </span>
              ) : (
                <span className="productLayout__foundsTitle">
                  We found{" "}
                  <span className="active__founds">
                    {productsData?.counts} products
                  </span>{" "}
                  available for you
                </span>
              )}

              <div className="productLayout__right">
                <div className="productLayout__sort--dropdown">
                  <CustomDropdown
                    options={sortOptions}
                    selectedStates={sort}
                    updateStates={setSort}
                  />
                </div>

                <div className="productLayoutFilterMenu">
                  <ProductLayoutFilterMenu>
                    <ProductLayoutFilter
                      FilterMenuComponent={FilterMenuComponent}
                      price={price}
                      setPrice={setPrice}
                      rating={rating}
                      setRating={setRating}
                      sort={sort}
                      setSort={setSort}
                      sortOptions={sortOptions}
                    />
                  </ProductLayoutFilterMenu>
                </div>

                {/* <CustomButton
                  className="productLayout__filter--btn btn small__btn btn__dark"
                  text="Filter"
                  endIcon={<FilterListIcon />}
                /> */}

                <CustomViewer viewer={viewer} setViewer={setViewer} />
              </div>
            </div>

            {isError ? (
              <CustomAlert severity="error" message={error?.data?.message} />
            ) : (
              productsData?.products?.length < 1 && (
                <CustomAlert severity="info" message="No products are found!" />
              )
            )}

            {viewer === "grid" && (
              <div className="productLayout__grid">
                {isLoading
                  ? [...Array(6).keys()].map((index) => (
                      <ProductItemSkeleton key={index} />
                    ))
                  : productsData?.products?.map((product) => (
                      <ProductItem product={product} key={product?._id} />
                    ))}
              </div>
            )}

            {viewer === "list" && (
              <div className="productLayout__list">
                {isLoading
                  ? [...Array(6).keys()].map((index) => (
                      <ProductItemSkeleton key={index} />
                    ))
                  : productsData?.products?.map((product) => (
                      <ProductListItem product={product} key={product?._id} />
                    ))}
              </div>
            )}

            {productsData?.counts === productsData?.products?.length ||
            productsData?.products?.length === 0 ? null : (
              <>
                {isLoading ? (
                  <ButtonSkeleton height={40} width="100%" marginTop={5} />
                ) : (
                  <CustomButton
                    className="productLayout__btn btn small__btn btn__dark"
                    text="Load More"
                    endIcon={<AddIcon />}
                    onClick={handleLoadmore}
                    loading={isFetching}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductLayout;
