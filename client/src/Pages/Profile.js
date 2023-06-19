import CloseIcon from "@mui/icons-material/Close";
import { Avatar } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../app/features/auth/authApi";
import profileImage from "../assets/banners/profile1.jpg";
import ProfileInfo from "../components/ProfileInfo";
import UserAvatar from "../components/UserAvatar";
import CustomBreadcrumbs from "../components/controls/CustomBreadcrumbs";
import CustomButton from "../components/controls/CustomButton";
import ProfileInfoSkeleton from "../components/skeletons/ProfileInfoSkeleton";
import Layout from "../layouts/Layout";
import Orders from "./Orders";

const Profile = () => {
  // States
  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatar] = useState(null);

  // navigate
  const navigate = useNavigate();

  // Redux toolkit elements
  const { isLoading, isError, error, data: user } = useGetProfileQuery();
  const [
    updateProfile,
    {
      isLoading: updateLoading,
      isError: updateIsError,
      error: updateError,
      data,
    },
  ] = useUpdateProfileMutation();

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
      navigate("/");
    }
    if (user?.message) {
      cogoToast.error("Something was wrong!");
    }
  }, [isError, error, navigate, user]);

  // React hook form own state
  const { handleSubmit, register, reset } = useForm();

  // React hook form data
  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("phone", data.phone);
    formData.append("country", data.country);

    // dispatch data
    await updateProfile(formData);
  };

  useEffect(() => {
    if (updateIsError) {
      cogoToast.error(updateError?.data?.message);
    }
    if (data?.error_code === 11000 && data?.error_pattern?.username) {
      cogoToast.error("Username is already exist.");
    }
    if (data?.error_code === 11000 && data?.error_pattern?.email) {
      cogoToast.error("Email is already exist.");
    }
    if (data?.email) {
      cogoToast.success("Updated successfully.");
      setIsEdit(false);
    }
  }, [updateError, updateIsError, data]);

  // Cancel edit and reset field
  const handleCancel = () => {
    setIsEdit(!isEdit);
    reset();
  };
  return (
    <Layout>
      <CustomBreadcrumbs title="Profile" image={profileImage} />
      <section className="profile section">
        <div className="container">
          <div className="profile__content">
            <div className="profile__info">
              {isLoading ? (
                <ProfileInfoSkeleton />
              ) : (
                <>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {isEdit ? (
                      <UserAvatar setAvatar={setAvatar} user={user} />
                    ) : (
                      <Avatar
                        sx={{ width: 150, height: 150 }}
                        alt={user?.name}
                        src={user?.avatar}
                      />
                    )}

                    <h2 className="profile__name">Hello! {user?.name}</h2>

                    <ProfileInfo
                      register={register}
                      isEdit={isEdit}
                      user={user}
                    />

                    {isEdit && (
                      <div className="button__group">
                        <CustomButton
                          className="profile__btn btn small__btn btn__dark"
                          text="Update Profile"
                          loading={updateLoading}
                          type="submit"
                        />
                        <CustomButton
                          className="profile__btn btn small__btn btn__dark"
                          text="Cancel"
                          type="submit"
                          onClick={handleCancel}
                          startIcon={<CloseIcon />}
                        />
                      </div>
                    )}
                  </form>

                  {!isEdit && user && (
                    <CustomButton
                      className="profile__btn btn small__btn btn__dark"
                      text="Edit Profile"
                      type="button"
                      onClick={() => setIsEdit(!isEdit)}
                    />
                  )}
                </>
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
