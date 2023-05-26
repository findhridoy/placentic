import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Button, Skeleton, Typography } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "../app/features/auth/authApi";
import CustomBreadcrumbs from "../components/CustomBreadcrumbs";
import ProfileInfo from "../components/ProfileInfo";
import UserAvatar from "../components/UserAvatar";
import CustomButton from "../components/controls/CustomButton";
import Layout from "../layouts/Layout";
import Orders from "./Orders";

const Profile = () => {
  // States
  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatar] = useState(null);

  // navigate
  const navigate = useNavigate();

  // Redux element
  const dispatch = useDispatch();
  const { isLoading, isError, error, data: user } = useGetProfileQuery();

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
      navigate("/");
    }
    if (user?.message) {
      cogoToast.error("Something was wrong!");
    }
  }, [isError, error, navigate, user]);

  // const {
  //   loading: updateLoading,
  //   error: updateError,
  //   user: updateUser,
  // } = useSelector((state) => state.updateUserProfile);

  // useEffect(() => {
  //   dispatch(getUserProfile("profile"));
  // }, [dispatch, updateUser]);

  // useEffect(() => {
  //   if (error) {
  //     cogoToast.error(error);
  //     dispatch(userProfileErrorReset());
  //     navigate("/");
  //   }
  //   if (user?.message) {
  //     cogoToast.error("Something was wrong!");
  //     dispatch(userProfileErrorReset());
  //     navigate("/");
  //   }
  // }, [dispatch, error, navigate, user]);

  // React hook form own state
  const { handleSubmit, register } = useForm();

  // React hook form data
  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("phone", data.phone);
    formData.append("country", data.country);
    // dispatch(updateUserProfile(formData));
  };

  // useEffect(() => {
  //   if (updateError) {
  //     cogoToast.error(updateError);
  //     dispatch(userUpdateErrorReset());
  //   }
  //   if (
  //     updateUser?.error_code === 11000 &&
  //     updateUser?.error_pattern.username
  //   ) {
  //     cogoToast.error("Username is already exist.");
  //     dispatch(userUpdateErrorReset());
  //   }
  //   if (updateUser?.error_code === 11000 && updateUser?.error_pattern.email) {
  //     cogoToast.error("Email is already exist.");
  //     dispatch(userUpdateErrorReset());
  //   }
  //   if (updateUser?.email) {
  //     cogoToast.success("Updated successfully.");
  //     dispatch(userUpdateErrorReset());
  //     setIsEdit(false);
  //   }
  // }, [updateError, updateUser, dispatch]);
  return (
    <Layout>
      <CustomBreadcrumbs title="Profile" />
      <section className="profile section">
        <div className="container">
          <div className="profile__content">
            <div className="profile__info">
              <form onSubmit={handleSubmit(onSubmit)}>
                {isEdit ? (
                  <UserAvatar setAvatar={setAvatar} user={user} />
                ) : isLoading ? (
                  <Skeleton variant="circular" width={150} height={150} />
                ) : (
                  <Avatar
                    sx={{ width: 150, height: 150 }}
                    alt={user?.name}
                    src={user?.avatar}
                  />
                )}
                {isLoading ? (
                  <Skeleton width="94%">
                    <Typography variant="h2">.</Typography>
                  </Skeleton>
                ) : (
                  <h2 className="profile__name">Hello! {user?.name}</h2>
                )}

                <ProfileInfo
                  register={register}
                  isEdit={isEdit}
                  user={user}
                  loading={isLoading}
                />

                {isEdit &&
                  (isLoading ? (
                    ""
                  ) : (
                    <div className="button__group">
                      <CustomButton
                        className="profile__btn btn btn__dark"
                        text="Update Profile"
                        loading={false}
                        type="submit"
                      />
                      <CustomButton
                        className="profile__btn btn btn__dark"
                        text="Cancel"
                        loading={false}
                        type="submit"
                        onClick={() => setIsEdit(!isEdit)}
                        startIcon={<CloseIcon />}
                      />
                    </div>
                  ))}
              </form>
              {isLoading ? (
                <Skeleton variant="rectangular" width="94%" height={48} />
              ) : (
                <div className="profile__btn btn btn__dark">
                  {!isEdit && user && (
                    <Button type="button" onClick={() => setIsEdit(!isEdit)}>
                      Edit Profile
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="profile__others">
              <div className="profile__orders">
                <h3 className="orders__title">Orders</h3>
                <Orders profile={true} />
              </div>
              <div className="profile__address">
                <h3 className="address__title">Address</h3>
                <Orders profile={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
