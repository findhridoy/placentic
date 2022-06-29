import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { countryData } from "../Assets/json/countryData";
import { shippingSchema } from "../Helpers/Validation/ValidationSchema";

const ShippingForm = () => {
  // States

  // Redux element
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categoryList);

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
    console.log(data);
    if (data) {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("countInStock", data.stock);

      // send data to backend
      // dispatch(createProduct(formData));
    }
  };

  // useEffect(() => {
  //   if (error) {
  //     cogoToast.error(error);
  //     dispatch(productCreateReset());
  //   }
  //   if (product?.message) {
  //     cogoToast.error("Something was wrong!");
  //     dispatch(productCreateReset());
  //   }
  //   if (product?.success) {
  //     cogoToast.success("Product has been created.");
  //     dispatch(productCreateReset());
  //   }
  // }, [error, dispatch, product]);

  return (
    <div className="shippingForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <span className="form__group">
          <label className="form__label">Country/Region</label>
          <select className="form__select" {...register("country")}>
            <option className="form__option" value="">
              Select your country
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

        <div className="form__grid">
          <span className="form__group">
            <label className="form__label">Name</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter your full name"
              {...register("name")}
            />
            {errors?.name && (
              <span className="form__error">{errors?.name.message}</span>
            )}
          </span>

          <span className="form__group">
            <label className="form__label">Phone Number</label>
            <input
              className="form__control"
              type="text"
              placeholder="Enter your phone number"
              {...register("phone_number")}
            />
            {errors?.phone_number && (
              <span className="form__error">
                {errors?.phone_number.message}
              </span>
            )}
          </span>
        </div>

        <span className="form__group">
          <label className="form__label">Address</label>
          <textarea
            className="form__textarea"
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
              placeholder="Enter your ZIP code"
              {...register("zip_code")}
            />
            {errors?.zip_code && (
              <span className="form__error">{errors?.zip_code.message}</span>
            )}
          </span>
        </div>

        <div className="shippingForm__btn btn small__btn btn__dark">
          <Button type="submit">
            {false ? (
              <CircularProgress color="inherit" size={30} thickness={3} />
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
