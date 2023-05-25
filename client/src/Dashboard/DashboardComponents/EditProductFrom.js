import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Button, CircularProgress, IconButton } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { categoryList } from "../../App/actions/categoryActions";
import {
  productUpdateReset,
  updateProduct,
} from "../../App/actions/productActions";
import { addProductSchema } from "../../Helpers/Validation/ValidationSchema";
import FormImageControl from "./FormImageControl";

const EditProductForm = ({ setOpen, row }) => {
  // States
  const [image, setImage] = useState(null);

  // Redux element
  const dispatch = useDispatch();
  const { error: categoryError, categories } = useSelector(
    (state) => state.categoryList
  );
  const { loading, error, product } = useSelector(
    (state) => state.updateProduct
  );

  useEffect(() => {
    dispatch(categoryList("categories"));
  }, [dispatch]);

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

      formData.append("image", image);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("countInStock", data.stock);

      // send data to backend
      dispatch(updateProduct(row.values._id, formData));
    }
  };

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(productUpdateReset());
    }
    if (product?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(productUpdateReset());
    }
    if (product?.success) {
      cogoToast.success("Product has been updated.");
      dispatch(productUpdateReset());

      setOpen(false);
    }
  }, [error, dispatch, product, setOpen]);

  return (
    <div className="addProducts">
      <div className="addProducts__form">
        <h2 className="form__title">Update Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="form__group">
            <label className="form__label">Title</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter product title"
              {...register("title")}
              defaultValue={row ? row?.values.title : ""}
            />
            {errors?.title && (
              <span className="form__error">{errors?.title.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Category</label>
            <select className="form__select" {...register("category")}>
              <option
                className="form__option"
                value={row ? row.values.category : ""}
              >
                {categoryError
                  ? "Something was wrong!"
                  : categories?.length === 0
                  ? "Category not found!"
                  : row
                  ? row.values.category
                  : "Select a category"}
              </option>

              {categories?.map((category) => (
                <option
                  className="form__option"
                  value={category?.title}
                  key={category?._id}
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
              defaultValue={row ? row?.values.description : ""}
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
                defaultValue={row ? row?.values.price : ""}
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
                defaultValue={row ? row?.values.countInStock : ""}
              />
              {errors?.stock && (
                <span className="form__error">{errors?.stock.message}</span>
              )}
            </span>
          </div>

          <FormImageControl setImage={setImage} />

          <div className="addProducts__btn btn btn__dark">
            <Button type="submit">
              {loading ? (
                <CircularProgress color="inherit" size={30} thickness={3} />
              ) : (
                "Update"
              )}
            </Button>
          </div>
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

export default EditProductForm;
