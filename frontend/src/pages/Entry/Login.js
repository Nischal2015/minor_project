import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";

// import axios from "axios";

import { useForm } from "react-hook-form";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./Login.module.scss";
import styles2 from "../../components/UI/Input/Input.module.scss";

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

  const [focus, setFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [hiddenMode, setHiddenMode] = useState(true);

  // This is used to reset the form on succesful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  const showPasswordHandler = () => {
    setShowPassword((prevValue) => !prevValue);
    setHiddenMode((prevValue) => !prevValue);
  };

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
          <div className={styles["form-control"]}>
            <input
              className={styles2.input__text}
              type='email'
              name='email'
              placeholder='Email address'
              aria-required='true'
              {...register("email", { required: true })}
            />

            {errors.email && (
              <p className={styles["login__description--error"]}>
                This field is required
              </p>
            )}
          </div>
          <div className={styles["form-control"]}>
            <div
              className={
                focus
                  ? styles["form-control__select"]
                  : styles["form-control__select-none"]
              }
            >
              <input
                className={`${styles2.input__text} ${styles.password}`}
                type={hiddenMode ? "password" : "text"}
                name='password'
                placeholder='Password'
                onFocus={() => setFocus(true)}
                aria-required='true'
                {...register("password", {
                  onBlur: () => setFocus(false),
                  required: { value: true, message: "This field is required" },
                  minLength: {
                    value: 7,
                    message: "Password must be greater than 6 characters",
                  },
                })}
              />

              <div
                role='button'
                className={styles["login__description--password"]}
                onClick={showPasswordHandler}
              >
                {showPassword ? (
                  <FaEye aria-label='Hides password' />
                ) : (
                  <FaEyeSlash aria-label='Shows password' />
                )}
              </div>
            </div>
            {errors.password && (
              <p className={styles["login__description--error"]}>
                {errors.password.message}
              </p>
            )}
          </div>
          <div className={styles.login__constraints}>
            <span>
              <input type='checkbox' id='remember' />
              <label htmlFor='remember'>Remember me</label>
            </span>
            <span>Forgot Password?</span>
          </div>
        </div>
        <div className={styles.login__footer}>
          <Button type='submit'>Login</Button>

          <div className={styles["login__footer--other"]}>
            <Button>Continue with Google</Button>
            <Button variant='small secondary'>Continue with Facebook</Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default Login;
