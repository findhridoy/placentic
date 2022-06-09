import { Button, CircularProgress } from "@mui/material";
// import cogoToast from "cogo-toast";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReviewRating from "./ReviewRating";

const ReviewForm = () => {
  // States
  const [ratingValue, setRatingValue] = useState(0);
  const [formErrors, setFromErrors] = useState({});

  // Redux element
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

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
      const formData = new FormData();

      formData.append("rating", ratingValue);
      formData.append("comment", data?.comment);

      // send data to backend
      //   dispatch(createProduct(formData));
    }
  };

  //   useEffect(() => {
  //     if (error) {
  //       cogoToast.error(error);
  //       dispatch(productCreateReset());
  //     }
  //     if (product?.message) {
  //       cogoToast.error("Something was wrong!");
  //       dispatch(productCreateReset());
  //     }
  //     if (product?.success) {
  //       cogoToast.success("Product has been created.");
  //       dispatch(productCreateReset());
  //     }
  //   }, [error, dispatch, product, setOpen]);

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
              <Button type="submit">
                {false ? (
                  <CircularProgress color="inherit" size={30} thickness={3} />
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
