import { Badge, MenuItem, MenuList } from "@mui/material";
import { useState } from "react";
import { useGetCategoriesByProductQuery } from "../app/features/products/productApi";
import collectionImage from "../assets/banners/collection2.jpg";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";
import Layout from "../layouts/Layout";
import ProductLayout from "../layouts/ProductLayout";

const FilterMenu = ({ categories, setCategories, categoryData }) => {
  // category filter handler
  const handleCategoryFilter = (category) => {
    if (categories?.includes(category)) {
      setCategories((preValue) => preValue.filter((x) => x !== category));
    } else {
      setCategories((preValue) => [...preValue, category]);
    }
  };

  return (
    <MenuList>
      {categoryData?.categories?.map((category) => (
        <MenuItem
          onClick={() => handleCategoryFilter(category?.title)}
          key={category?.title}
          divider={true}
          selected={categories?.includes(category?.title) ? true : false}
        >
          {category?.title}
          <Badge badgeContent={category?.productCount} />
        </MenuItem>
      ))}
    </MenuList>
  );
};

const Collection = () => {
  const [categories, setCategories] = useState([]);

  // Redux toolkit element
  const { isLoading, data: categoryData } =
    useGetCategoriesByProductQuery(`product/categories`);
  return (
    <Layout>
      <CustomBreadcrumbs title="New arrivals" image={collectionImage} />
      <ProductLayout
        FilterMenuComponent={
          <FilterMenu
            categories={categories}
            setCategories={setCategories}
            categoryData={categoryData}
          />
        }
        categories={categories}
        categoryData={categoryData}
      />
    </Layout>
  );
};

export default Collection;
