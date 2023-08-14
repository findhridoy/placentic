import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCreateProductMutation } from "../../app/features/products/productApi";
import CustomButton from "../../components/controls/CustomButton";
import { addProductSchema } from "../../helpers/Validation/ValidationSchema";
import FormImageControl from "./FormImageControl";

const AddProductForm = ({
  setOpen,
  categoryData,
  categoryIsError,
  categoryError,
}) => {
  // States
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState({});

  // Redux element
  const dispatch = useDispatch();
  const [createProduct, { isLoading, isError, error, data: product }] =
    useCreateProductMutation();

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
    const validate = (image) => {
      let errors = {};
      if (!image) {
        errors.image = "Product image field is required.";
      }
      return errors;
    };
    setImageError(validate(image));

    if (data && image) {
      const formData = new FormData();

      formData.append("image", image);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("countInStock", data.stock);

      // send data to backend
      dispatch(createProduct(formData));
    }
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (product?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (product?.success) {
      cogoToast.success("Product has been created.");
      setOpen(false);
    }
  }, [isError, error, product, setOpen]);

  return (
    <div className="addProducts">
      <div className="addProducts__form">
        <h2 className="form__title">Add Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="form__group">
            <label className="form__label">Title</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter product title"
              {...register("title")}
            />
            {errors?.title && (
              <span className="form__error">{errors?.title.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Category</label>
            <select className="form__select" {...register("category")}>
              <option className="form__option" value="">
                {categoryIsError
                  ? categoryIsError?.data?.message
                  : categoryData?.categories?.length === 0
                  ? "Category not found!"
                  : "Select a category"}
              </option>

              {categoryData?.categories?.map((category, index) => (
                <option
                  className="form__option"
                  value={category?.title}
                  key={index}
                >
                  {category?.title}
                </option>
              ))}
            </select>
            {errors?.category && (
              <span className="form__error">{errors?.category.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Description</label>
            <textarea
              className="form__textarea"
              placeholder="Enter product description"
              {...register("description")}
            ></textarea>
            {errors?.description && (
              <span className="form__error">{errors?.description.message}</span>
            )}
          </span>

          <div className="form__grid">
            <span className="form__group">
              <label className="form__label">Price</label>
              <input
                className="form__control"
                type="text"
                placeholder="Enter product price"
                {...register("price")}
              />
              {errors?.price && (
                <span className="form__error">{errors?.price.message}</span>
              )}
            </span>

            <span className="form__group">
              <label className="form__label">Stock</label>
              <input
                className="form__control"
                type="text"
                placeholder="Enter product stock"
                {...register("stock")}
              />
              {errors?.stock && (
                <span className="form__error">{errors?.stock.message}</span>
              )}
            </span>
          </div>

          <FormImageControl setImage={setImage} errors={imageError} />

          <CustomButton
            className="addProducts__btn btn small__btn btn__dark"
            text="Add Product"
            loading={isLoading}
            type="submit"
          />
        </form>
        <div className="addProducts__close">
          <IconButton aria-label="close" onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
