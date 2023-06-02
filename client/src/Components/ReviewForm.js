import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useCreateReviewMutation } from "../app/features/products/productApi";
import ReviewRating from "./ReviewRating";
import CustomButton from "./controls/CustomButton";

const ReviewForm = ({ product }) => {
  // States
  const [ratingValue, setRatingValue] = useState(0);
  const [formErrors, setFromErrors] = useState({});

  // Redux elements
  const { userInfo } = useSelector((state) => state.auth);
  const [
    createReview,
    { isLoading, isError, error, data: review },
  ] = useCreateReviewMutation();

  // React hook form own state
  const { handleSubmit, register, reset } = useForm();

  // React hook form data submit
  const onSubmit = async (data) => {
    // form error handlaning
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

      const reviewData = {
        prodId: product?._id,
        data: formData,
      };

      // post review to backend
      await createReview(reviewData);
    }
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (review?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (review?.success) {
      cogoToast.success(review?.message);
      reset();
    }
  }, [isError, error, review, reset]);

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

            <CustomButton
              className="reviewForm__btn btn small__btn btn__dark"
              text="Submit"
              loading={isLoading}
              type="submit"
            />
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
