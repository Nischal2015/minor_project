import React, { useState } from "react";

import styles from "./Input.module.scss";

const Input = ({ type, placeholder, id, variant }) => {
  const [value, setValue] = useState("");

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      className={styles.input__text}
      id={id}
      type={type || "text"}
      placeholder={placeholder}
      value={value}
      onChange={inputChangeHandler}
      data-variant={variant}
    />
  );
};

export default Input;
