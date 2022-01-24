import React, { useState } from "react";

import styles from "./Input.module.scss";

const Input = ({ type, placeholder }) => {
  const [value, setValue] = useState("");

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={inputChangeHandler}
    />
  );
};

export default Input;
