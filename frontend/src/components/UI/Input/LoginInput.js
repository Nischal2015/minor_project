import React from "react";
import styles from "./Input.module.scss";

const LoginInput = ({ type, name, placeholder, register, errors }) => {
  return (
    <div className={styles["form-control"]}>
      <input
        className={styles.input__text}
        type={type}
        name={name}
        placeholder={placeholder}
        aria-required='true'
        {...register(name, { required: true })}
      />

      {errors[name] && <p className={styles.error}>This field is required</p>}
    </div>
  );
};

export default LoginInput;
