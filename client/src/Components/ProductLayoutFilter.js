import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Rating,
  Slider,
} from "@mui/material";
import React from "react";
import CustomAccordion from "./controls/CustomAccordion";

const ProductLayoutFilter = ({
  FilterMenuComponent,
  price,
  setPrice,
  rating,
  setRating,
  sort,
  setSort,
  sortOptions,
}) => {
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
  return (
    <div className="productLayoutFilter__menu">
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

      <div className="productLayoutFilter__sortBy">
        <CustomAccordion title="Sort By">
          <div className="productLayoutFilter__sort">
            <FormGroup>
              <RadioGroup
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                {sortOptions?.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option.value}
                    control={<Radio size="small" />}
                    label={option?.label}
                  />
                ))}
              </RadioGroup>
            </FormGroup>
          </div>
        </CustomAccordion>
      </div>

      <CustomAccordion title="Others" />
    </div>
  );
};

export default ProductLayoutFilter;
