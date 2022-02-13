import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import LoginInput from "../../components/UI/Input/LoginInput";
import PasswordInput from "../../components/UI/Input/PasswordInput";

// import axios from "axios";

import { useForm } from "react-hook-form";

import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./Login.module.scss";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      repassword: "",
    },
  });

  // const registerUser = async (formData) => {
  //   try {
  //     const response = await axios.post("/register/", formData);
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [containsSignup, setContainsSignup] = useState(false);

  let location = useLocation();
  const navigate = useNavigate();

  const locationPath = location.pathname;

  // This is used to reset the form on succesful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  useEffect(() => {
    setContainsSignup(locationPath.includes("signup"));
  }, [locationPath]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        // Later will be handled for fetching data from database
      })}
    >
      <Card className={styles.login} role='group' ariaLabelledBy='kamao'>
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
              name='repassword'
              placeholder='Retype Password'
              errors={errors}
              register={register}
            />
          )}

          <div className={styles.login__constraints}>
            <span>
              <input type='checkbox' id='remember' />
              <label htmlFor='remember'>Remember me</label>
            </span>
            <span>Forgot Password?</span>
          </div>
        </div>
        <div className={styles.login__footer}>
          {containsSignup ? (
            <Button
              onClick={() => {
                navigate("username");
              }}
            >
              Signup
            </Button>
          ) : (
            <Button type='submit'>Login</Button>
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
