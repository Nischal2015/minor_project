import React from "react";
import styles from "./Card.module.scss";

const Card = ({ children, className, variant }) => {
  return (
    <div
      className={`${styles.card} ${className ? className : ""}`}
      data-variant={variant}
    >
      {children}
    </div>
  );
};

export default Card;
