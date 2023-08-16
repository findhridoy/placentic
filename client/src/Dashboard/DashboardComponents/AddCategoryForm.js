import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useCreateCategoryMutation } from "../../app/features/categories/categoryApi";
import CustomButton from "../../components/controls/CustomButton";
import FormImageControl from "./FormImageControl";

const AddCategoryForm = ({ setOpen }) => {
  // States
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [formErrors, setFromErrors] = useState({});

  // Redux element
  const [createCategory, { isLoading, isError, error, data: category }] =
    useCreateCategoryMutation();

  // Form data submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validate = (title, message, image) => {
      let errors = {};
      if (!title) {
        errors.title = "Title field is required.";
      }
      if (!message) {
        errors.message = "Message field is required.";
      }
      if (!image) {
        errors.image = "Image field is required.";
      }
      return errors;
    };

    setFromErrors(validate(title, message, image));

    if (title && message && image) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("message", message);
      formData.append("image", image);

      // send data to backend
      await createCategory(formData);
    }
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (category?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (category?.success) {
      cogoToast.success("Category has been created.");
      setOpen(false);
    }
  }, [isError, error, category, setOpen]);

  return (
    <div className="addProducts">
      <div className="addProducts__form">
        <h2 className="form__title">Add Category</h2>
        <form onSubmit={handleSubmit}>
          <span className="form__group">
            <label className="form__label">Title</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter category title"
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
              onChange={(e) => setMessage(e.target.value)}
            />
            {formErrors.message && (
              <span className="form__error">{formErrors.message}</span>
            )}
          </span>

          <FormImageControl setImage={setImage} errors={formErrors} />

          <CustomButton
            className="addProducts__btn btn small__btn btn__dark"
            text="Add Category"
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

export default AddCategoryForm;
