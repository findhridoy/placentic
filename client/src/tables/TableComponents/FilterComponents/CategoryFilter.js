import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import FilterLayout from "../../TableLayout/FilterLayout";

const CategoryFilter = ({ categories, setCategories, categoryData }) => {
  const handleCheckBox = (event) => {
    const category = event.target.value;
    if (categories?.includes(category)) {
      setCategories((preValue) => preValue?.filter((x) => x !== category));
    } else {
      setCategories((preValue) => [...preValue, category]);
    }
  };

  return (
    <FilterLayout title="Category">
      <FormGroup>
        {categoryData?.categories?.map((category) => (
          <FormControlLabel
            key={category?._id}
            control={
              <Checkbox
                size="small"
                onChange={handleCheckBox}
                checked={categories?.includes(category?.title) ? true : false}
                value={category?.title}
              />
            }
            label={category?.title}
          />
        ))}
      </FormGroup>
    </FilterLayout>
  );
};

export default CategoryFilter;
