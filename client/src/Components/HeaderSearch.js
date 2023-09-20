import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGetProductsBySearchQuery } from "../app/features/products/productApi";
import useDebounce from "../hooks/useDebounce";
import Rating from "./Rating";
import CustomSearchError from "./controls/CustomSearchError";
import HeaderSearchProductSkeleton from "./skeletons/HeaderSearchProductSkeleton";

const ProductData = ({ product }) => {
  return (
    <div className="productSearch__item">
      <div className="productSearch__img">
        <img src={product?.image} alt={product?.title} />
      </div>

      <div className="productSearch__text">
        <Link to={`/product/${product?._id}`}>
          <h1 className="productSearch__title">{product?.title}</h1>
        </Link>
        <span className="productSearch__price">${product?.price}</span>
      </div>

      <div className="productSearch__rating">
        <Rating ratings={product?.ratings} />
        <span className="productSearch__review--text">
          ({product?.countReviews} reviews)
        </span>
      </div>
    </div>
  );
};

const HeaderSearch = ({ onClick }) => {
  // States
  const [queryStr, setQueryStr] = useState("");
  const [keyword, setKeyword] = useState("");

  // Redux toolkit
  const { isLoading, isFetching, isError, error, data } =
    useGetProductsBySearchQuery(`product/search/${keyword}`);

  // search callback function
  const handleSearch = () => {
    if (!queryStr) {
      return;
    }

    setKeyword(queryStr);
  };

  // custom timeout hook
  useDebounce(queryStr, 800, handleSearch);

  return (
    <div className="headerSearch">
      <div className="headerSearch__searchBox">
        <span className="search__icon">
          <SearchIcon fontSize="small" />
        </span>
        <input
          type="text"
          placeholder="Search..."
          autoComplete="false"
          value={queryStr}
          onChange={(e) => setQueryStr(e.target.value)}
        />
        <IconButton aria-label="close" onClick={onClick}>
          <CloseIcon />
        </IconButton>
      </div>
      {queryStr && queryStr.trim() !== "" && (
        <div className="headerSearch__container">
          <div className="headerSearch__content">
            {isLoading || isFetching ? (
              <HeaderSearchProductSkeleton />
            ) : isError ? (
              <CustomSearchError
                errorTitle="Oops! somthing was wrong."
                subtitle={error?.data?.message}
              />
            ) : data?.products?.length < 1 ? (
              <CustomSearchError
                errorTitle="Item not found!"
                subtitle="We're sorry what you were looking for."
              />
            ) : (
              <div className="headerSearch__data">
                {data?.products?.map((product) => (
                  <ProductData product={product} key={product?._id} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSearch;
