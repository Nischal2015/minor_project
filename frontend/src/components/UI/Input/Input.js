import React from "react";

import styles from "./Input.module.scss";

const Input = ({
  type,
  placeholder,
  id,
  variant,
  ariaRequired,
  required,
  value,
  onChange,
}) => {
  return (
    <input
      className={styles.input__text}
      id={id}
      value={value}
      type={type || "text"}
      placeholder={placeholder || null}
      data-variant={variant || null}
      aria-required={ariaRequired || "false"}
      onChange={onChange}
      required={required || false}
    />
  );
};

export default React.memo(Input);
