import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryList,
  categoryListReset,
} from "../Redux/actions/categoryActions";

const Category = () => {
  // Redux element
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector(
    (state) => state.categoryList
  );

  useEffect(() => {
    dispatch(categoryList("categories"));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      // cogoToast.error(error);
      dispatch(categoryListReset());
    }
    if (categories?.message) {
      // cogoToast.error("Something was wrong!");
      dispatch(categoryListReset());
    }
  }, [error, categories, dispatch]);
  return (
    <section className="category__section section">
      <div className="container">
        <h2 className="category__title section__title">Top Category</h2>
        <div className="category__content">
          <div className="category__data">
            {true &&
              [0, 1, 2, 3, 4].map((index) => (
                <Skeleton variant="rectangular" />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
