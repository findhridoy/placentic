import AddIcon from "@mui/icons-material/Add";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Rating, Slider } from "@mui/material";
import { useState } from "react";
import { useGetProductsQuery } from "../app/features/products/productApi";
import ProductItem from "../components/ProductItem";
import ProductListItem from "../components/ProductListItem";
import CustomAccordion from "../components/controls/CustomAccordion";
import CustomAlert from "../components/controls/CustomAlert";
import CustomButton from "../components/controls/CustomButton";
import CustomDropdown from "../components/controls/CustomDropdown";
import CustomViewer from "../components/controls/CustomViewer";
import ButtonSkeleton from "../components/skeletons/ButtonSkeleton";
import ProductItemSkeleton from "../components/skeletons/ProductItemSkeleton";

const ProductLayout = ({ categories, FilterMenuComponent }) => {
  // States
  const [size, setSize] = useState(6);
  const [sort, setSort] = useState("");
  const [price, setPrice] = useState([0, 100]);
  const [rating, setRating] = useState(0);
  const [viewer, setViewer] = useState("grid");

  // sorting options
  const options = [
    { label: "Default", value: "" },
    { label: "Newest First", value: "updatedAt" },
    { label: "Oldest First", value: "-createdAt" },
    { label: "Price: Low to High", value: "price" },
    { label: "Price: High to Low", value: "-price" },
  ];

  const {
    isLoading: productLoading,
    isFetching,
    isError,
    error,
    data: productsData,
  } = useGetProductsQuery(
    `product?size=${size}&category=${categories}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}&sort=${sort}`
  );

  // price filter handler
  const handlePriceFilter = (event, newValue) => {
    setPrice(newValue);
  };
  // rating filter handler
  const handleRatingFilter = (event, newValue) => {
    if (newValue === null) {
      setRating(0);
    } else {
      setRating(newValue);
    }
  };
  // loadmore handler
  const handleLoadmore = () => {
    setSize((preValue) => preValue + 3);
  };

  return (
    <section className="productLayout">
      <div className="container">
        <div className="productLayout__container">
          <div className="productLayout__menu">
            {false && <h4>Loading.....</h4>}

            <CustomAccordion title="Categories">
              {FilterMenuComponent}
            </CustomAccordion>

            <CustomAccordion title="Filter By">
              <div className="priceRange__slider">
                <h5 className="priceRange__title">Price Range</h5>

                <div className="slider">
                  <Slider
                    size="small"
                    value={price}
                    onChange={handlePriceFilter}
                    valueLabelDisplay="on"
                    valueLabelFormat={(e) => `$ ${e}`}
                    min={1}
                  />
                </div>
              </div>

              <div className="raitngs">
                <h5 className="raitngs__title">Ratings</h5>

                <div className="raitng">
                  <Rating
                    value={rating}
                    defaultValue={0}
                    precision={0.5}
                    onChange={handleRatingFilter}
                    emptyIcon={<StarBorderIcon />}
                  />
                </div>
              </div>
            </CustomAccordion>
            <CustomAccordion title="Other"></CustomAccordion>
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
                <CustomDropdown
                  options={options}
                  selectedStates={sort}
                  updateStates={setSort}
                />
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
                {productLoading
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
                {productLoading
                  ? [...Array(6).keys()].map((index) => (
                      <ProductItemSkeleton key={index} />
                    ))
                  : productsData?.products?.map((product) => (
                      <ProductListItem product={product} key={product?._id} />
                    ))}
              </div>
            )}

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
