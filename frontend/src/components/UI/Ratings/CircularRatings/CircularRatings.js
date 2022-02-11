import React from "react";

import styles from "./CircularRatings.module.scss";

const CircularRatings = ({ children }) => {
  const colorSelector = (value) => {
    if (value < 33) return "rgb(240, 40, 28)";
    else if (value < 66) return "rgb(241, 196, 15)";
    return "rgb(39, 174, 96)";
  };

  const color = colorSelector(children);
  return (
    <div
      className={styles.circular}
      style={{
        color: `${color}`,
        background: `conic-gradient(${color} ${children}%, transparent ${children}%)`,
      }}
    >
      <span>{children}</span>
    </div>
  );
};

export default CircularRatings;
