import { Button, CircularProgress, IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import placentic from "../Assets/logo/placentic.png";
import { loginUser } from "../Redux/actions/userActions";

const Login = () => {
  // Password hide/show state
  const [showPass, setShowPass] = useState(false);

  // Redux
  const dispatch = useDispatch();
  const { loading, userInfo, errors } = useSelector((state) => state.userLogin);

  // React hook form own state
  const { handleSubmit, register } = useForm();

  // React hook form data submit
  const onSubmit = async (data) => {
    dispatch(loginUser(data));
  };

  const location = useLocation();
  const navigate = useNavigate();

  let { from } = location.state || { from: { pathname: "/" } };

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
    if (userInfo) {
      navigate(from, { replace: true });
    }
  }, [errors, enqueueSnackbar, navigate, from, userInfo]);
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
              <label className="form__label">Username</label>
              <input
                className="form__control"
                type="text"
                placeholder="Type your email or username"
                {...register("username")}
              />
              {errors?.username && (
                <span className="form__error">{errors?.username}</span>
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

            <div className="sl__btn btn btn__dark">
              <Button type="submit">
                {loading ? (
                  <CircularProgress color="inherit" size={30} />
                ) : (
                  "Login"
                )}
              </Button>
            </div>

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
