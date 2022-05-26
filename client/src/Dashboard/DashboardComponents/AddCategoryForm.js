import CloseIcon from "@mui/icons-material/Close";
import { Button, CircularProgress, IconButton } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryCreateReset,
  createCategory
} from "../../Redux/actions/categoryActions";
import FormImageControl from "./FormImageControl";

const AddCategoryForm = ({ setOpen }) => {
  // States
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [formErrors, setFromErrors] = useState({});

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, category } = useSelector(
    (state) => state.createCategory
  );

  // Form data submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validate = (title, image) => {
      let errors = {};
      if (!title) {
        errors.title = "Title field is required.";
      }
      if (!image) {
        errors.image = "Image field is required.";
      }
      return errors;
    };

    setFromErrors(validate(title, image));

    if (title && image) {
      const slug = title.split(" ").join("-").toLowerCase();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("image", image);

      // send data to backend
      dispatch(createCategory(formData));
    }
  };

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(categoryCreateReset());
    }
    if (category?.message) {
      cogoToast.error("Something was wrong!");
      dispatch(categoryCreateReset());
    }
    if (category?.title) {
      cogoToast.success("Category has been created.");
      dispatch(categoryCreateReset());
      setOpen(false);
    }
  }, [error, category, dispatch, setOpen]);

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
            <label className="form__label">Slug</label>
            <input
              className="form__control"
              type="text"
              placeholder="Auto generate slug"
              value={title.split(" ").join("-").toLowerCase()}
              disabled
            />
          </span>

          <FormImageControl setImage={setImage} errors={formErrors} />

          <div className="addProducts__btn btn btn__dark">
            <Button type="submit">
              {loading ? (
                <CircularProgress color="inherit" size={30} thickness={3} />
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
