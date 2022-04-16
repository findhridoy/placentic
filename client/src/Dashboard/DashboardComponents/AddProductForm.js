import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton } from "@mui/material";
import React from "react";
import Dropdown from "react-dropdown";
import { useForm } from "react-hook-form";
import { Watch } from "react-loader-spinner";

const AddProductForm = ({ setOpen }) => {
  // React hook form own state
  const { handleSubmit, register } = useForm();

  let errors = { username: "username", password: "password" };

  // React hook form data submit
  const onSubmit = async (data) => {
    console.log(data);
  };
  const options = ["All", "two", "three"];
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
            {errors.username && (
              <span className="form__error">{errors.username.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Category</label>
            <Dropdown
              className="form__dropdown"
              controlClassName="form__dropdownControl"
              menuClassName="form__dropdownMenu"
              options={options}
              onChange={this?._onSelect}
              value={options[0]}
              placeholder="Select an option"
            />
            {errors.username && (
              <span className="form__error">{errors.username.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Description</label>
            <textarea
              className="form__textarea"
              placeholder="Enter product description"
              {...register("description")}
            ></textarea>
            {errors.username && (
              <span className="form__error">{errors.username.message}</span>
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
              {errors.password && (
                <span className="form__error">{errors.password.message}</span>
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
              {errors.password && (
                <span className="form__error">{errors.password.message}</span>
              )}
            </span>
          </div>

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
                "Add Product"
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

export default AddProductForm;
