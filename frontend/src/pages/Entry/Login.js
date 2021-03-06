import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import LoginInput from "../../components/UI/Input/LoginInput";
import PasswordInput from "../../components/UI/Input/PasswordInput";

// import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { createUser, login } from "../../store/auth-actions";

import styles from "./Login.module.scss";
import LoadingSlider from "../../components/UI/Loading/LoadingSlider";

const Login = () => {
  const [containsSignup, setContainsSignup] = useState(false);
  const validationSchema = Yup.object().shape(
    containsSignup
      ? {
          email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
          username: Yup.string().required("Username is required"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
          re_password: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
        }
      : {
          email: Yup.string()
            .required("Email is required")
            .email("Email is invalid"),
          password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        }
  );

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isProcessing = useSelector((state) => state.auth.isProcessing);
  const dispatch = useDispatch();

  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let navigate = useNavigate();

  const locationPath = location.pathname;

  useEffect(() => {
    setContainsSignup(locationPath.includes("signup"));
  }, [locationPath]);

  if (isAuthenticated) {
    return <Navigate to='/' replace={true} />;
  }

  // Return Statement
  return (
    <form
      onSubmit={handleSubmit((data) => {
        containsSignup && dispatch(createUser(data));
        !containsSignup &&
          dispatch(
            login(data, () => {
              navigate(from, { replace: true });
            })
          );
      })}
    >
      <Card className={styles.login} role='group' ariaLabelledBy='kamao'>
        {isProcessing && <LoadingSlider />}
        <div className={styles.login__header}>
          <h2 className='heading--secondary' id='kamao'>
            Kamao
          </h2>
          <span>Welcome to you</span>
        </div>
        <div className={styles.login__description}>
          {/* Email */}
          <LoginInput
            type='email'
            name='email'
            placeholder='Email address'
            register={register}
            errors={errors}
          />

          {/* Username */}
          {containsSignup && (
            <LoginInput
              type='text'
              name='username'
              placeholder='Username'
              register={register}
              errors={errors}
            />
          )}

          {/* Password */}
          <PasswordInput
            name='password'
            placeholder='Password'
            errors={errors}
            register={register}
          />

          {/* Retype password */}
          {containsSignup && (
            <PasswordInput
              name='re_password'
              placeholder='Confirm Password'
              errors={errors}
              register={register}
            />
          )}

          <div className={styles.login__constraints}>
            <span>
              <input type='checkbox' id='remember' />
              <label htmlFor='remember'>Remember me</label>
            </span>
            <Link
              to='/reset-password'
              className={styles["login__signup--link"]}
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className={styles.login__footer}>
          {containsSignup ? (
            <Button type='submit' disabled={isProcessing}>
              Signup
            </Button>
          ) : (
            <Button type='submit' disabled={isProcessing}>
              Login
            </Button>
          )}
          <div className={styles["login__footer--other"]}>
            <Button variant='tertiary'>Continue with Google</Button>
            <Button>Continue with Facebook</Button>
          </div>
        </div>
        <p className={styles.login__signup}>
          {containsSignup ? (
            <>
              Already have an account?{" "}
              <Link to='/login' className={styles["login__signup--link"]}>
                Login
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link to='/signup' className={styles["login__signup--link"]}>
                Signup
              </Link>
            </>
          )}
        </p>
      </Card>
    </form>
  );
};

export default Login;
