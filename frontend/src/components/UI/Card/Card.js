import React from "react";
import styles from "./Card.module.scss";

const Card = ({ children, className }) => {
  return (
    <div className={`${styles.card} ${className ? className : ""}`}>
      {children}
    </div>
  );
};

export default Card;
