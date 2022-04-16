import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { Watch } from "react-loader-spinner";

const AddCategoryForm = ({ setOpen }) => {
  // React hook form own state
  const { handleSubmit, register } = useForm();

  let errors = { username: "username", password: "password" };

  // React hook form data submit
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="addProducts">
      <div className="addProducts__form">
        <h2 className="form__title">Add Category</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="form__group">
            <label className="form__label">Title</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter category title"
              {...register("title")}
            />
            {errors.username && (
              <span className="form__error">{errors.username.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Slug</label>
            <input
              className="form__control"
              type="text"
              placeholder="Auto generate slug"
              {...register("slug")}
            />
            {errors.username && (
              <span className="form__error">{errors.username.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Image</label>
            <input
              className="form__control"
              type="file"
              {...register("image")}
            />
            {errors.password && (
              <span className="form__error">{errors.password.message}</span>
            )}
          </span>

          <div className="addProducts__btn btn btn__dark">
            <Button type="submit">
              {false ? (
                <Watch color="#000" height={50} width={100} />
              ) : (
                "Add Category"
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

export default AddCategoryForm;
