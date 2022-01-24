import React from "react";
import styles from "./Button.module.scss";

const Button = ({ type, children, className }) => {
  return (
    <button
      type={type || "button"}
      className={`${styles.btn} ${className ? styles[className] : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
