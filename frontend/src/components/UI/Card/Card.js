import React from "react";
import styles from "./Card.module.scss";

const Card = ({ children, className, variant, ariaLabelledBy, role }) => {
  return (
    <div
      className={`${styles.card} ${className ? className : ""}`}
      data-variant={variant}
      role={role || null}
      aria-labelledby={ariaLabelledBy || null}
    >
      {children}
    </div>
  );
};

export default Card;
