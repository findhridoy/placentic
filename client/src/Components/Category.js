import { Skeleton } from "@mui/material";
import { useGetCategoriesQuery } from "../app/features/categories/categoryApi";
import CustomAlert from "./controls/CustomAlert";
import CustomButton from "./controls/CustomButton";

const CategoryItem = ({ category }) => {
  return (
    <div
      className="category__item"
      style={{ backgroundImage: `url(${category?.image})` }}
    >
      <div className="category__img">
        <img src={category?.image} alt="Category Img" />
      </div>

      <CustomButton
        className="category__btn btn small__btn btn__white"
        text={category?.title}
      />
    </div>
  );
};

const Category = () => {
  const page = 0;
  const size = 5;

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
    <section className="category__section section">
      <div className="container">
        <h2 className="category__title section__title">Top Category</h2>
        <div className="category__content">
          {isLoading ? (
            <div className="category__skeleton">
              {[...Array(5).keys()].map((index) => (
                <Skeleton variant="rectangular" key={index} />
              ))}
            </div>
          ) : isError ? (
            <CustomAlert
              severity="error"
              message={error?.data?.message}
              mt={25}
            />
          ) : categoryData?.categories?.length < 1 ? (
            <CustomAlert
              severity="info"
              message="No categories are found!"
              mt={25}
            />
          ) : (
            <div className="category__data">
              {categoryData?.categories?.map((category) => (
                <CategoryItem category={category} key={category?._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Category;
