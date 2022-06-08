import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
// import cogoToast from "cogo-toast";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addProductSchema } from "../Helpers/Validation/ValidationSchema";
import ReviewRating from "./ReviewRating";

const ReviewForm = () => {
  // Redux element
  const dispatch = useDispatch();

  // React hook form own state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addProductSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    if (data) {
      const formData = new FormData();

      formData.append("price", data.price);
      formData.append("countInStock", data.stock);

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="form__group">
            <label className="form__label">
              Your rating <span className="form__required">*</span>
            </label>
            <ReviewRating />
          </span>

          <span className="form__group">
            <label className="form__label">
              Your comment <span className="form__required">*</span>
            </label>
            <textarea
              className="form__textarea"
              placeholder="Type your comment..."
              {...register("comment")}
            ></textarea>
            {errors?.description && (
              <span className="form__error">{errors?.description.message}</span>
            )}
          </span>

          <div className="reviewForm__btn btn btn__dark">
            <Button type="submit">
              {false ? (
                <CircularProgress color="inherit" size={30} thickness={3} />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
