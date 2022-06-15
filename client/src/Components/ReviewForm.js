import { Button, CircularProgress } from "@mui/material";
import cogoToast from "cogo-toast";
// import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  createProductReview,
  createProductReviewReset,
} from "../Redux/actions/productActions";
import ReviewRating from "./ReviewRating";

const ReviewForm = ({ product }) => {
  // States
  const [ratingValue, setRatingValue] = useState(0);
  const [formErrors, setFromErrors] = useState({});

  // Redux element
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, review } = useSelector(
    (state) => state.createProductReview
  );

  // React hook form own state
  const { handleSubmit, register } = useForm();

  // React hook form data submit
  const onSubmit = async (data) => {
    const validate = (rating, comment) => {
      let errors = {};
      if (!rating) {
        errors.rating = "Rating is required.";
      }
      if (!comment) {
        errors.comment = "Comment field is required.";
      }
      return errors;
    };

    setFromErrors(validate(ratingValue, data?.comment));

    if (data?.comment && ratingValue) {
      const formData = {
        rating: ratingValue,
        comment: data.comment,
      };
      // send data to backend
      dispatch(createProductReview(product?._id, formData));
    }
  };

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(createProductReviewReset());
    }
    if (review?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(createProductReviewReset());
    }
    if (review?.success) {
      cogoToast.success(review?.message);
      dispatch(createProductReviewReset());
    }
  }, [error, dispatch, review]);

  return (
    <>
      <div className="reviewForm">
        <h3 className="form__title">Write a review</h3>

        {userInfo?.email ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form__group">
              <label className="form__label">
                Your rating <span className="form__required">*</span>
              </label>
              <ReviewRating
                value={ratingValue}
                setValue={setRatingValue}
                errors={formErrors}
              />
            </div>

            <span className="form__group">
              <label className="form__label">
                Your comment <span className="form__required">*</span>
              </label>
              <textarea
                className={
                  formErrors?.comment
                    ? "form__textarea textarea"
                    : "form__textarea"
                }
                placeholder="Type your comment..."
                {...register("comment")}
              />
            </span>

            <div className="reviewForm__btn btn small__btn btn__dark">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <CircularProgress color="inherit" size={25} thickness={3} />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        ) : (
          <span className="reviewForm__logged">
            You must be{" "}
            <Link className="logged__link" to="/login">
              logged in
            </Link>{" "}
            to post a review.
          </span>
        )}
      </div>
    </>
  );
};

export default ReviewForm;
