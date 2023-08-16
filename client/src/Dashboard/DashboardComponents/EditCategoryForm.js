import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../app/features/categories/categoryApi";
import CustomButton from "../../components/controls/CustomButton";
import FormImageControl from "./FormImageControl";

const EditCategoryForm = ({ setOpen, row }) => {
  // States
  const [title, setTitle] = useState(row?.original?.title);
  const [message, setMessage] = useState(row?.original?.message);
  const [image, setImage] = useState(null);
  const [formErrors, setFromErrors] = useState({});

  // Redux element
  const [updateCategory, { isLoading, isError, error, data: category }] =
    useUpdateCategoryMutation();

  // Form data submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = (title, message) => {
      let errors = {};
      if (!title) {
        errors.title = "Title field is required.";
      }
      if (!message) {
        errors.message = "Message field is required.";
      }
      return errors;
    };

    setFromErrors(validate(title, message));

    if (title && message) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("message", message);
      formData.append("image", image);

      const updateData = {
        catId: row?.original._id,
        data: formData,
      };

      // send data to backend
      updateCategory(updateData);
    }
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (category?.error_code === 11000 && category?.error_pattern.title) {
      cogoToast.error("Category title is already exist.");
    }
    if (category?.error_code === 11000 && category?.error_pattern.message) {
      cogoToast.error("Category message is already exist.");
    }
    if (category?.message && !category?.error_code) {
      cogoToast.error("Something was wrong!");
    }
    if (category?.success) {
      cogoToast.success("Updated successfully.");
      setOpen(false);
    }
  }, [isError, error, category, setOpen]);

  return (
    <div className="addProducts">
      <div className="addProducts__form">
        <h2 className="form__title">Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <span className="form__group">
            <label className="form__label">Title</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter category title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {formErrors.title && (
              <span className="form__error">{formErrors.title}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Message</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter category message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {formErrors.message && (
              <span className="form__error">{formErrors.message}</span>
            )}
          </span>

          <FormImageControl setImage={setImage} />

          <CustomButton
            className="addProducts__btn btn small__btn btn__dark"
            text="Update"
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

export default EditCategoryForm;
