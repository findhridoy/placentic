import {
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Rating,
} from "@mui/material";
import React from "react";
import FilterLayout from "../../TableLayout/FilterLayout";

const RatingFilter = ({ rating, setRating }) => {
  const ratings = [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
  ];

  const handleChange = (event) => {
    setRating(event.target.value);
  };

  return (
    <FilterLayout title="Rating">
      <FormGroup>
        <RadioGroup value={rating} onChange={handleChange}>
          {ratings?.map((rating, index) => (
            <FormControlLabel
              key={index + rating}
              value={rating.value}
              control={<Radio size="small" />}
              label={<Rating name="read-only" value={rating.value} readOnly />}
            />
          ))}
        </RadioGroup>
      </FormGroup>
    </FilterLayout>
  );
};

export default RatingFilter;
