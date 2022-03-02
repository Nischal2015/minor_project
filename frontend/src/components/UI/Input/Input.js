import React from "react";

import styles from "./Input.module.scss";

const Input = ({ type, placeholder, id, variant, ariaRequired, required }) => {
  return (
    <input
      className={styles.input__text}
      id={id}
      type={type || "text"}
      placeholder={placeholder || null}
      data-variant={variant || null}
      aria-required={ariaRequired || "false"}
      required={required || false}
    />
  );
};

export default React.memo(Input);
