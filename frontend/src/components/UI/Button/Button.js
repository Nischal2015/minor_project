import React from "react";
import styles from "./Button.module.scss";

const Button = ({ type, children, className, variant }) => {
  return (
    <button
      type={type || "button"}
      className={`${styles.btn} ${className ? styles[className] : ""}`}
      data-variant={variant}
    >
      {children}
    </button>
  );
};

export default Button;
