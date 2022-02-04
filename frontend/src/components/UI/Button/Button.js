import React from "react";
import styles from "./Button.module.scss";

const Button = ({ type, children, variant }) => {
  return (
    <button
      type={type || "button"}
      className={styles.btn}
      data-variant={variant}
    >
      {children}
    </button>
  );
};

export default Button;
