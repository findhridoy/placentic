import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import FilterLayout from "../../DashboardLayout/FilterLayout";

const CategoryFilter = ({ categories, setCategories, categoryData }) => {
  const handleCheckBox = (event) => {
    const category = event.target.value;
    if (categories?.includes(category)) {
      setCategories((preValue) => preValue?.filter((x) => x !== category));
    } else {
      setCategories((preValue) => [...preValue, category]);
    }
  };

  console.log(categories);

  return (
    <FilterLayout title="Category">
      <FormGroup>
        {/* <FormControlLabel
          control={
            <Checkbox
              size="small"
              defaultChecked
              onChange={handleCheckBox}
              value=""
            />
          }
          label="All"
        /> */}
        {categoryData?.categories?.map((category) => (
          <FormControlLabel
            key={category?.title}
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
