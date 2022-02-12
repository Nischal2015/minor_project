import React, { useState } from "react";
import usePassword from "../../../hooks/usePassword";
import ShowPasswordIcon from "./ShowPasswordIcon";

import styles from "./PasswordInput.module.scss";
import styles2 from "./Input.module.scss";

const PasswordInput = ({ name, placeholder, errors, register }) => {
  const [focus, setFocus] = useState(false);
  const [hidePassword, setHidePassword] = usePassword(true);

  return (
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
          type={hidePassword ? "password" : "text"}
          name={name}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          aria-required='true'
          {...register(name, {
            onBlur: () => setFocus(false),
            required: { value: true, message: "This field is required" },
            minLength: {
              value: 7,
              message: "Password must be greater than 6 characters",
            },
          })}
        />

        <ShowPasswordIcon
          hidePassword={hidePassword}
          setHidePassword={setHidePassword}
        />
      </div>
      {errors[name] && <p className={styles.error}>{errors[name].message}</p>}
    </div>
  );
};

export default PasswordInput;
