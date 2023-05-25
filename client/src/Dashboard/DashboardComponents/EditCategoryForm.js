import CloseIcon from "@mui/icons-material/Close";
import { Button, CircularProgress, IconButton } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryUpdateErrorReset,
  updateCategory,
} from "../../App/actions/categoryActions";
import FormImageControl from "./FormImageControl";

const EditCategoryForm = ({ setOpen, row }) => {
  // States
  const [title, setTitle] = useState(row.values.title);
  const [message, setMessage] = useState(row.values.message);
  const [image, setImage] = useState(null);
  const [formErrors, setFromErrors] = useState({});

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, category } = useSelector(
    (state) => state.updateCategory
  );

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

      // send data to backend
      dispatch(updateCategory(row.values._id, formData));
    }
  };

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(categoryUpdateErrorReset());
    }
    if (category?.error_code === 11000 && category?.error_pattern.title) {
      cogoToast.error("Category title is already exist.");
      dispatch(categoryUpdateErrorReset());
    }
    if (category?.error_code === 11000 && category?.error_pattern.message) {
      cogoToast.error("Category message is already exist.");
      dispatch(categoryUpdateErrorReset());
    }
    if (category?.message && !category?.error_code) {
      cogoToast.error("Something was wrong!");
      dispatch(categoryUpdateErrorReset());
    }
    if (category?.success) {
      cogoToast.success("Updated successfully.");
      setOpen(false);
      dispatch(categoryUpdateErrorReset());
    }
  }, [error, category, dispatch, setOpen]);

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

export default EditCategoryForm;
