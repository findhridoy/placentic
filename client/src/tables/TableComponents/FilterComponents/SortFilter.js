import { FormControlLabel, FormGroup, Radio, RadioGroup } from "@mui/material";
import React from "react";
import FilterLayout from "../../TableLayout/FilterLayout";

const SortFilter = ({ sort, setSort }) => {
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  // sorting options
  const sortOptions = [
    // { label: "Default", value: "" },
    { label: "Name", value: "title" },
    { label: "Newest First", value: "-createdAt" },
    { label: "Modification Time", value: "updatedAt" },
    { label: "Price: Low to High", value: "price" },
    { label: "Price: High to Low", value: "-price" },
  ];

  return (
    <FilterLayout title="Sort">
      <FormGroup>
        <RadioGroup value={sort} onChange={handleChange}>
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
    </FilterLayout>
  );
};

export default SortFilter;
