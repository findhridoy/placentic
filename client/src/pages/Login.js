import { yupResolver } from "@hookform/resolvers/yup";
import { IconButton } from "@mui/material";
import cogoToast from "cogo-toast";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../app/features/auth/authApi";
import placentic from "../assets/logo/placentic.png";
import CustomButton from "../components/controls/CustomButton";
import { loginSchema } from "../helpers/Validation/ValidationSchema";

const Login = () => {
  // Password hide/show state
  const [showPass, setShowPass] = useState(false);

  // Redux toolkit element
  const [
    login,
    { isLoading, isError, error, isSuccess, data },
  ] = useLoginMutation();

  // React hook form own state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    await login(data);
  };

  const location = useLocation();
  const navigate = useNavigate();

  // redirect
  let from = location?.state?.from || "/";

  useEffect(() => {
    if (isError) {
      cogoToast.error(error?.data?.message);
    }
    if (data?.message) {
      cogoToast.error("Something was wrong!");
    }
    if (isSuccess && data) {
      navigate(from, { replace: true });
    }
  }, [error, navigate, from, isError, data, isSuccess]);
  return (
    <section className="sl__section main__bg">
      <div className="sl__container">
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
        <div className="sl__form">
          <h2 className="form__title">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="form__group">
              <label className="form__label">Username or Email</label>
              <input
                className="form__control"
                type="text"
                placeholder="Type your email or username"
                {...register("username")}
              />
              {errors?.username && (
                <span className="form__error">{errors?.username.message}</span>
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
                <span className="form__error">{errors?.password.message}</span>
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
              <Link className="form__forget" to="/forgot-password">
                Forgotten password?
              </Link>
            </div>

            <CustomButton
              className="sl__btn btn btn__dark"
              text="Login"
              loading={isLoading}
              type="submit"
            />

            <div className="form__footer">
              <span className="form__footer--text">
                Don't have an account?{" "}
                <Link className="form__footer--link" to="/signup">
                  Create a new account.
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
