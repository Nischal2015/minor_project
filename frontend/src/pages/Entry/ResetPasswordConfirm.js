import React, { useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import { Navigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { resetPasswordConfirm } from "../../store/auth-actions";

import styles from "./Login.module.scss";
import PasswordInput from "../../components/UI/Input/PasswordInput";
import { alertActions } from "../../store/alert-slice";

const ResetPasswordConfirm = () => {
  const validationSchema = Yup.object().shape({
    new_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    re_new_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm(formOptions);

  const dispatch = useDispatch();
  const { uid, token } = useParams();

  // This is used to reset the form on succesful submission
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, isSubmitSuccessful]);

  if (isSubmitSuccessful) {
    return <Navigate to='/login' />;
  }

  // Return Statement
  return (
    <form
      onSubmit={handleSubmit((data) => {
        dispatch(alertActions.clear());
        const formData = { uid, token, ...data };
        dispatch(resetPasswordConfirm(formData));
      })}
    >
      <Card className={styles.login} role='group' ariaLabelledBy='reset'>
        <div className={styles.login__header}>
          <h2 className='heading--secondary' id='reset'>
            Confirm Password
          </h2>
        </div>
        <div className={styles.login__description}>
          {/* Enter Password */}
          <PasswordInput
            name='new_password'
            placeholder='Enter password'
            register={register}
            errors={errors}
          />

          {/* Verify Password */}
          <PasswordInput
            name='re_new_password'
            placeholder='Verify password'
            register={register}
            errors={errors}
          />
        </div>
        <div className={styles.login__footer}>
          <Button type='submit'>Reset Password</Button>
        </div>
      </Card>
    </form>
  );
};

export default ResetPasswordConfirm;
