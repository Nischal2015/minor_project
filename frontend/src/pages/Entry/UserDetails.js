import React, { useState, useEffect, useMemo } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import usePassword from "../../hooks/usePassword";

// import axios from "axios";

import { useForm } from "react-hook-form";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./Login.module.scss";
import styles2 from "../../components/UI/Input/Input.module.scss";

const UserDetails = () => {
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

  // This is used to reset the form on succesful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        password: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

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
        </div>
        <div className={styles.login__description}>
          {/* Firstname */}
          <div className={styles["form-control"]}>
            <input
              className={styles2.input__text}
              type='text'
              name='firstname'
              placeholder='Firstname'
              aria-required='true'
              {...register("firstname", { required: true })}
            />

            {errors.firstname && (
              <p className={styles["login__description--error"]}>
                This field is required
              </p>
            )}
          </div>

          {/* Middlename */}
          <div className={styles["form-control"]}>
            <input
              className={styles2.input__text}
              type='text'
              name='middlename'
              placeholder='Middlename'
              aria-required='true'
            />
          </div>

          {/* Lastname */}
          <div className={styles["form-control"]}>
            <input
              className={styles2.input__text}
              type='text'
              name='lastname'
              placeholder='Lastname'
              aria-required='true'
              {...register("lastname", { required: true })}
            />

            {errors.lastname && (
              <p className={styles["login__description--error"]}>
                This field is required
              </p>
            )}
          </div>

          <div className={styles.login__constraints}>
            <span>
              <input
                type='checkbox'
                id='agree'
                name='agree'
                {...register("agree", { required: true })}
              />
              <label htmlFor='agree'>Agree with terms and conditions</label>
            </span>
          </div>
        </div>
        <div className={styles.login__footer}>
          <Button type='submit'>Register</Button>
        </div>
      </Card>
    </form>
  );
};

export default UserDetails;
