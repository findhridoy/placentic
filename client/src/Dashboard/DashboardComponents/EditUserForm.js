import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Checkbox, CircularProgress, IconButton } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  userMakeAdmin,
  userMakeAdminReset,
} from "../../App/actions/userActions";
import { userUpdateSchema } from "../../Helpers/Validation/ValidationSchema";

const EditUserForm = ({ setOpen, row }) => {
  // Redux element
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.updateUser);

  // React hook form own state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userUpdateSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    // send data to backend
    dispatch(userMakeAdmin(row.values._id, data));
  };

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(userMakeAdminReset());
    }
    if (user?.error_code === 11000 && user?.error_pattern.username) {
      cogoToast.error("Username is already exist.");
      dispatch(userMakeAdminReset());
    }
    if (user?.error_code === 11000 && user?.error_pattern.email) {
      cogoToast.error("Email is already exist.");
      dispatch(userMakeAdminReset());
    }
    if (user?.message && !user?.error_code) {
      cogoToast.error("Something was wrong!");
      dispatch(userMakeAdminReset());
    }
    if (user?.email) {
      cogoToast.success("Updated successfully.");
      setOpen(false);
      dispatch(userMakeAdminReset());
    }
  }, [error, user, setOpen, dispatch]);
  return (
    <div className="addProducts">
      <div className="addProducts__form">
        <h2 className="form__title">Update User</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="form__group">
            <label className="form__label">Name</label>
            <input
              className="form__control"
              type="text"
              defaultValue={row?.values.name}
              placeholder="Type your fullname"
              {...register("name")}
            />
            {errors?.name && (
              <span className="form__error">{errors?.name.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Username</label>
            <input
              className="form__control"
              type="text"
              defaultValue={row?.values.username}
              placeholder="Type your username"
              {...register("username")}
            />
            {errors?.username && (
              <span className="form__error">{errors?.username.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Email</label>
            <input
              className="form__control"
              type="email"
              defaultValue={row?.values.email}
              placeholder="Type your email"
              {...register("email")}
            />
            {errors?.email && (
              <span className="form__error">{errors?.email.message}</span>
            )}
          </span>

          <div className="form__flex">
            <Checkbox
              size="small"
              color="success"
              id="makeAdmin"
              defaultChecked={row?.values.isAdmin}
              {...register("isAdmin")}
            />
            <label className="checkbox__label" htmlFor="makeAdmin">
              Make Admin
            </label>
          </div>

          <div className="addProducts__btn btn btn__dark">
            <Button type="submit">
              {loading ? (
                <CircularProgress color="inherit" size={30} />
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

export default EditUserForm;
