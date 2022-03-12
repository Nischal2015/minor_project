import React from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSlider = () => {
  return (
    <div className={styles.loader3}>
      <div className={styles["loader3__slide-item"]}></div>
    </div>
  );
};

export default LoadingSlider;
