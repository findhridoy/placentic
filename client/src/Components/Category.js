import { Button, Skeleton } from "@mui/material";
import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryLimitList,
  categoryLimitListReset,
} from "../App/actions/categoryActions";
import CustomAlert from "./CustomAlert";

const CategoryItem = ({ category }) => {
  return (
    <div className="category__item">
      <div className="category__img">
        <img src={category?.image} alt="Category Img" />
      </div>
      <div className="category__btn btn small__btn btn__white">
        <Button>{category?.message}</Button>
      </div>
    </div>
  );
};

const Category = () => {
  // Redux element
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.categoryLimitList
  );

  useEffect(() => {
    dispatch(categoryLimitList("category"));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(categoryLimitListReset());
    }
    if (categories?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(categoryLimitListReset());
    }
  }, [error, categories, dispatch]);
  return (
    <section className="category__section section">
      <div className="container">
        <h2 className="category__title section__title">Top Category</h2>
        <div className="category__content">
          <div className="category__data">
            {loading ? (
              [0, 1, 2, 3].map((index) => (
                <Skeleton variant="rectangular" key={index} />
              ))
            ) : categories?.length === 0 ? (
              <CustomAlert severity="info" message="No categories are found!" />
            ) : (
              categories?.map((category) => (
                <CategoryItem category={category} key={category?._id} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
