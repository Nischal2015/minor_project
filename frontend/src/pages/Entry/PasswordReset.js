import React, { useEffect } from "react";
import LoginInput from "../../components/UI/Input/LoginInput";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/auth-actions";

import styles from "./Login.module.scss";
import { alertActions } from "../../store/alert-slice";

const PasswordReset = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm(formOptions);

  const dispatch = useDispatch();

  // This is used to reset the form on succesful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  // Return Statement
  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(alertActions.clear());
        dispatch(resetPassword(data));
      })}
    >
      <Card className={styles.login} role='group' ariaLabelledBy='reset'>
        <div className={styles.login__header}>
          <h2 className='heading--secondary' id='reset'>
            Reset Password
          </h2>
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
        </div>
        <div className={styles.login__footer}>
          <Button type='submit'>Submit</Button>
        </div>
      </Card>
    </form>
  );
};

export default PasswordReset;
