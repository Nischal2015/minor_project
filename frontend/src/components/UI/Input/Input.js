import React, { useState } from "react";

import styles from "./Input.module.scss";

const Input = ({
  type,
  reference,
  placeholder,
  id,
  variant,
  ariaRequired,
  required,
}) => {
  const [value, setValue] = useState("");

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      className={styles.input__text}
      ref={reference}
      id={id}
      type={type || "text"}
      placeholder={placeholder || null}
      value={value}
      onChange={inputChangeHandler}
      data-variant={variant || null}
      aria-required={ariaRequired || "false"}
      required={required}
    />
  );
};

export default Input;
