import { Badge, MenuItem, MenuList } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategoryQuery } from "../app/features/categories/categoryApi";
import { useGetCategoriesByProductQuery } from "../app/features/products/productApi";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";
import Layout from "../layouts/Layout";
import ProductLayout from "../layouts/ProductLayout";

const FilterMenu = ({ categoryData, cate_title }) => {
  // react router navigate
  const navigate = useNavigate();

  return (
    <MenuList>
      {categoryData?.categories?.map((category) => (
        <MenuItem
          onClick={() =>
            navigate(`/category/${category?.title?.toLowerCase()}`)
          }
          key={category?.title}
          divider={true}
          selected={
            cate_title === category?.title?.toLowerCase() ? true : false
          }
        >
          {category?.title}
          <Badge badgeContent={category?.productCount} />
        </MenuItem>
      ))}
    </MenuList>
  );
};

const CategoryProduct = () => {
  // stirng lowercase to capitalize
  const toCapitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // react router
  const { cate_title } = useParams();

  // Redux toolkit element
  const { isLoading, data: category } = useGetCategoryQuery(
    `category/${cate_title}`
  );
  const { data: categoryData } =
    useGetCategoriesByProductQuery(`product/categories`);

  return (
    <Layout>
      <CustomBreadcrumbs title={category?.message} image={category?.image} />
      <ProductLayout
        FilterMenuComponent={
          <FilterMenu categoryData={categoryData} cate_title={cate_title} />
        }
        categories={[
          category?.title ? category?.title : toCapitalize(cate_title),
        ]}
      />
    </Layout>
  );
};

export default CategoryProduct;
