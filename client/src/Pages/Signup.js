import { Button, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Watch } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import placentic from "../Assets/logo/placentic.png";
import { registerUser } from "../Redux/actions/userActions";

const Signup = () => {
  // Password hide/show state
  const [showPass, setShowPass] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const { loading, errors } = useSelector((state) => state.userRegister);

  // React hook form own state
  const { handleSubmit, register } = useForm();

  // React hook form data submit
  const onSubmit = async (data) => {
    dispatch(registerUser(data));
  };

  // notistack toast
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (errors?.message) {
      enqueueSnackbar(errors?.message, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  }, [errors, enqueueSnackbar]);

  return (
    <section className="sl__section signup__section main__bg">
      <div className="sl__container">
        <div className="sl__form">
          <h2 className="form__title">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="form__group">
              <label className="form__label">Name</label>
              <input
                className="form__control"
                type="text"
                placeholder="Type your fullname"
                {...register("name")}
              />
              {errors?.name && (
                <span className="form__error">{errors?.name}</span>
              )}
            </span>

            <span className="form__group">
              <label className="form__label">Username</label>
              <input
                className="form__control"
                type="text"
                placeholder="Type your username"
                {...register("username")}
              />
              {errors?.username && (
                <span className="form__error">{errors?.username}</span>
              )}
            </span>

            <span className="form__group">
              <label className="form__label">Email</label>
              <input
                className="form__control"
                type="email"
                placeholder="Type your email"
                {...register("email")}
              />
              {errors?.email && (
                <span className="form__error">{errors?.email}</span>
              )}
            </span>

            <span className="form__group">
              <label className="form__label">Password</label>
              <input
                className="form__control"
                type={showPass ? "text" : "password"}
                placeholder="Type your password"
                {...register("password")}
              />
              {errors?.password && (
                <span className="form__error">{errors?.password}</span>
              )}
            </span>

            <span className="form__group">
              <label className="form__label">Confirm Password</label>
              <input
                className="form__control"
                type={showPass ? "text" : "password"}
                placeholder="Type your confirm password"
                {...register("confirmPassword")}
              />
              {errors?.confirmPassword && (
                <span className="form__error">{errors?.confirmPassword}</span>
              )}
            </span>

            <div className="form__flex">
              <span className="checkbox__group">
                <IconButton
                  size="small"
                  aria-label="checkbox"
                  onClick={() => setShowPass(!showPass)}
                >
                  <input
                    type="checkbox"
                    id="showPassword"
                    defaultChecked={showPass}
                  />
                </IconButton>
                <label className="checkbox__label" htmlFor="showPassword">
                  {showPass ? "Hide password" : "Show password"}
                </label>
              </span>
            </div>

            <div className="sl__btn btn btn__dark">
              <Button type="submit">
                {loading ? (
                  <Watch color="#fff" height={30} width={265} />
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>

            <div className="form__footer">
              <span className="form__footer--text">
                Already have an account?{" "}
                <Link className="form__footer--link" to="/login">
                  Login.
                </Link>
              </span>
            </div>
          </form>
        </div>

        <div className="sl__content">
          <h3 className="sl__title">Welcome to</h3>
          <div className="sl__logo">
            <Link to="/">
              <img className="logo" src={placentic} alt="brand-logo" />
            </Link>
          </div>
          <p className="sl__description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde, ut
            excepturi iusto temporibus natus rerum nam?
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
