import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Button,
  CircularProgress,
  Skeleton,
  Typography,
} from "@mui/material";
import cogoToast from "cogo-toast";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CustomBreadcrumbs from "../Components/CustomBreadcrumbs";
import ProfileInfo from "../Components/ProfileInfo";
import UserAvatar from "../Components/UserAvatar";
import Layout from "../Layouts/Layout";
import {
  getUserProfile,
  updateUserProfile,
  userErrorReset,
} from "../Redux/actions/userActions";
import Orders from "./Orders";

const Profile = () => {
  // States
  const [isEdit, setIsEdit] = useState(false);
  const [avatar, setAvatar] = useState(null);

  // Redux element
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userProfile);
  const { loading: updateLoading, error: updateError, success } = useSelector(
    (state) => state.updateUserProfile
  );

  // notistack toast
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      dispatch(userErrorReset());
    } else {
      if (!user?.name) {
        dispatch(getUserProfile());
      }
    }
  }, [dispatch, error, enqueueSnackbar, user]);

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
    dispatch(updateUserProfile(formData));
  };

  useEffect(() => {
    if (updateError) {
      enqueueSnackbar(updateError, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else if (success) {
      enqueueSnackbar("Update successfully!", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      setIsEdit(false);
    }
  }, [updateError, enqueueSnackbar]);
  return loading ? (
    <h3>Loading....</h3>
  ) : (
    <Layout>
      <CustomBreadcrumbs title="Profile" />
      <section className="profile section">
        <div className="container">
          <div className="profile__content">
            <div className="profile__info">
              <form onSubmit={handleSubmit(onSubmit)}>
                {isEdit ? (
                  <UserAvatar setAvatar={setAvatar} userInfo={user} />
                ) : loading ? (
                  <Skeleton variant="circular" width={150} height={150} />
                ) : (
                  <Avatar
                    sx={{ width: 150, height: 150 }}
                    alt={user?.name}
                    src={user?.avatar}
                  />
                )}
                {loading ? (
                  <Skeleton width="94%">
                    <Typography variant="h2">.</Typography>
                  </Skeleton>
                ) : (
                  <h2 className="profile__name">Hello! {user?.name}</h2>
                )}

                <ProfileInfo
                  register={register}
                  isEdit={isEdit}
                  userInfo={user}
                  loading={loading}
                />

                {isEdit && (
                  <div className="button__group">
                    {loading ? (
                      <Skeleton variant="rectangular" width="94%" height={48} />
                    ) : (
                      <div className="profile__btn btn btn__dark">
                        <Button type="submit">
                          {updateLoading ? (
                            <CircularProgress color="inherit" size={30} />
                          ) : (
                            "Update Profile"
                          )}
                        </Button>
                      </div>
                    )}

                    {loading ? (
                      <Skeleton variant="rectangular" width="94%" height={48} />
                    ) : (
                      <div className="profile__btn btn btn__dark">
                        <Button
                          type="button"
                          onClick={() => setIsEdit(!isEdit)}
                          startIcon={<CloseIcon />}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </form>
              {loading ? (
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
