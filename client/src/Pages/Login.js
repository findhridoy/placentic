import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Watch } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Layout from "../Layouts/Layout";

const Login = () => {
  // Password hide/show state
  const [showPass, setShowPass] = useState(false);

  // React hook form own state
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // React hook form data submit
  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <section className="sl__section section">
        <h2 className="sl__title">Login</h2>
        <div className="sl__form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="form__group">
              <label className="form__label">Username</label>
              <input
                className="form__control"
                type="text"
                placeholder="Type your email or username"
                {...register("username")}
              />
              {errors.username && (
                <span className="form__error">{errors.username.message}</span>
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
              {errors.password && (
                <span className="form__error">{errors.password.message}</span>
              )}
            </span>

            <div className="form__flex">
              <span className="checkbox__group">
                <IconButton size="small" aria-label="checkbox">
                  <input
                    type="checkbox"
                    id="showPassword"
                    onClick={() => setShowPass(!showPass)}
                  />
                </IconButton>
                <label className="checkbox__label" htmlFor="showPassword">
                  Show password
                </label>
              </span>
              <Link className="form__forget" to="/forgot-password">
                Forgotten password?
              </Link>
            </div>

            <div className="sl__btn btn btn__dark">
              <Button type="submit">
                {false ? (
                  <Watch color="#000" height={50} width={100} />
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
      </section>
    </Layout>
  );
};

export default Login;
