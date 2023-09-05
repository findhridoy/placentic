import { Skeleton } from "@mui/material";
import React from "react";
import { useGetCategoriesQuery } from "../app/features/categories/categoryApi";
import collectionImage from "../assets/banners/collection11.jpg";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";
import Layout from "../layouts/Layout";
import CustomAlert from "./../components/controls/CustomAlert";

const CategoryItem = ({ category }) => {
  return (
    <div className="categories__item">
      <div className="categories__img">
        <img src={category?.image} alt="Category Img" />
      </div>

      {/* <CustomButton
        className="categories__btn btn small__btn btn__white"
        text={category?.message}
      /> */}
    </div>
  );
};

const Categories = () => {
  const page = 0;
  const size = 6;

  // Redux toolkit element
  const {
    isLoading,
    isError,
    error,
    data: categoryData,
  } = useGetCategoriesQuery(
    `category?page=${page}&size=${size}&sort=-createdAt`
  );
  return (
    <Layout>
      <CustomBreadcrumbs title="Category" image={collectionImage} />

      <section className="categories__section">
        <div className="container">
          <div className="categories__content">
            {isLoading ? (
              [...Array(4).keys()].map((index) => (
                <Skeleton variant="rectangular" key={index} />
              ))
            ) : isError ? (
              <CustomAlert severity="error" message={error?.data?.message} />
            ) : categoryData?.categories?.length < 1 ? (
              <CustomAlert severity="info" message="No categories are found!" />
            ) : (
              <div className="categories__data">
                {categoryData?.categories?.map((category) => (
                  <CategoryItem category={category} key={category?._id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
