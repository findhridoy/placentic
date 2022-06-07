import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { IconButton, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";

const ProductItem = ({ product }) => {
  // react router
  const navigate = useNavigate();

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={product?.image} alt={product?.title} />

        <div className="product__action">
          <Stack direction="row" justifyContent="center" spacing={0.5}>
            <IconButton>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton
              onClick={() => navigate(`/product/details/${product?._id}`)}
            >
              <SearchIcon />
            </IconButton>
          </Stack>
        </div>
      </div>

      <Stack marginTop={1}>
        <h3 className="product__title">{product?.title}</h3>
        <Stack justifyContent="space-between" direction="row">
          <span className="product__price">${product?.price}</span>
          <span className="product__rating">
            <Rating ratings={product?.ratings} />
          </span>
        </Stack>
      </Stack>
    </div>
  );
};

export default ProductItem;
