import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import cogoToast from "cogo-toast";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import {
//   updateUserProfile,
//   userUpdateErrorReset,
// } from "../App/actions/userActions";
import { useUpdateProfileMutation } from "../app/features/auth/authApi";
import { countryData } from "../assets/json/countryData";
import { shippingSchema } from "../helpers/Validation/ValidationSchema";

const ShippingForm = ({ user, setExpanded }) => {
  // States

  // Redux element
  const dispatch = useDispatch();
  // const { loading, error, user: updateUser } = useSelector(
  //   (state) => state.updateUserProfile
  // );

  const [updateProfile, { isLoading, isError, error, data: updateUser }] =
    useUpdateProfileMutation();

  // console.log(updateUser);

  // React hook form own state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(shippingSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    if (data) {
      let formData = new FormData();
      formData.append("city", data.city);
      formData.append("address", data.address);
      formData.append("zip_code", data.zip_code);
      formData.append("phone", data.phone);
      formData.append("country", data.country);

      // send data to backend
      // dispatch(updateUserProfile(formData));
    }
  };

  useEffect(() => {
    if (error) {
      cogoToast.error(error);
      // dispatch(userUpdateErrorReset());
    }

    if (updateUser?.message) {
      cogoToast.success("Something was wrong! try again.");
      // dispatch(userUpdateErrorReset());
      return;
    }
    if (updateUser) {
      cogoToast.success("Shipping address was saved.");
      // dispatch(userUpdateErrorReset());
      setExpanded("panel3");
    }
  }, [error, updateUser, dispatch, setExpanded]);

  return (
    <div className="shippingForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="form__group">
          <label className="form__label">Country/Region</label>
          <select className="form__select" {...register("country")}>
            <option
              className="form__option"
              value={user?.country ? user?.country : ""}
            >
              {user?.country ? user?.country : "Select your country"}
            </option>

            {countryData?.map((country, index) => (
              <option
                className="form__option"
                value={country?.name}
                key={index}
              >
                {country?.name}
              </option>
            ))}
          </select>
          {errors?.country && (
            <span className="form__error">{errors?.country.message}</span>
          )}
        </span>

        <span className="form__group">
          <label className="form__label">Phone Number</label>
          <input
            className="form__control"
            type="text"
            defaultValue={user?.phone}
            placeholder="Enter your phone number"
            {...register("phone_number")}
          />
          {errors?.phone_number && (
            <span className="form__error">{errors?.phone_number.message}</span>
          )}
        </span>

        <span className="form__group">
          <label className="form__label">Address</label>
          <textarea
            className="form__textarea"
            defaultValue={user?.address}
            placeholder="Enter your address"
            {...register("address")}
          ></textarea>
          {errors?.address && (
            <span className="form__error">{errors?.address.message}</span>
          )}
        </span>

        <div className="form__grid">
          <span className="form__group">
            <label className="form__label">City</label>
            <input
              className="form__control"
              type="text"
              defaultValue={user?.city}
              placeholder="Enter your city"
              {...register("city")}
            />
            {errors?.city && (
              <span className="form__error">{errors?.city.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">ZIP Code</label>
            <input
              className="form__control"
              type="text"
              defaultValue={user?.zip_code}
              placeholder="Enter your ZIP code"
              {...register("zip_code")}
            />
            {errors?.zip_code && (
              <span className="form__error">{errors?.zip_code.message}</span>
            )}
          </span>
        </div>

        <div className="shippingForm__btn btn small__btn btn__dark">
          <Button type="submit" style={{ width: "100%", marginTop: "0.5rem" }}>
            {isLoading ? (
              <CircularProgress color="inherit" size={24} thickness={3} />
            ) : (
              "Save Address"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
