import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import { Checkbox, IconButton } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../app/features/users/userApi";
import CustomButton from "../../components/controls/CustomButton";
import { userUpdateSchema } from "../../helpers/Validation/ValidationSchema";

const EditUserForm = ({ setOpen, row }) => {
  // Redux element
  const [updateUser, { isLoading, isError, error, data: user }] =
    useUpdateUserMutation();

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
    const updateData = {
      userId: row?.original._id,
      data,
    };

    // send data to backend
    updateUser(updateData);
  };

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (user?.error_code === 11000 && user?.error_pattern.username) {
      cogoToast.error("Username is already exist.");
    }
    if (user?.error_code === 11000 && user?.error_pattern.email) {
      cogoToast.error("Email is already exist.");
    }
    if (user?.message && !user?.error_code) {
      cogoToast.error("Something was wrong!");
    }
    if (user?.email) {
      cogoToast.success("Updated successfully.");
      setOpen(false);
    }
  }, [isError, error, user, setOpen]);
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
              defaultValue={row?.original?.name}
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
              defaultValue={row?.original?.username}
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
              defaultValue={row?.original?.email}
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
              defaultChecked={row?.original?.isAdmin}
              {...register("isAdmin")}
            />
            <label className="checkbox__label" htmlFor="makeAdmin">
              Make Admin
            </label>
          </div>

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

export default EditUserForm;
