import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import FilterLayout from "../../TableLayout/FilterLayout";

const PriceFilter = ({ price, setPrice }) => {
  const handleChange = (event) => {
    setPrice({
      gte: event.target.value,
      lte: event.target.name,
    });
  };

  const priceData = [
    {
      gte: 5,
      lte: 10,
    },
    {
      gte: 10,
      lte: 20,
    },
    {
      gte: 20,
      lte: 30,
    },
    {
      gte: 30,
      lte: 40,
    },
    {
      gte: 40,
      lte: 50,
    },
    {
      gte: 50,
      lte: 60,
    },
  ];

  return (
    <FilterLayout title="Price">
      <FormControl>
        <RadioGroup value={price?.gte} onChange={handleChange}>
          {priceData?.map((data, index) => (
            <FormControlLabel
              key={index}
              value={data?.gte}
              name={String(data?.lte)}
              control={<Radio size="small" />}
              label={`$${data?.gte} - $${data?.lte}`}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </FilterLayout>
  );
};

export default PriceFilter;
