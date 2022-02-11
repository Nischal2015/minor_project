import React from "react";

import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles.loader}>
      <span className={styles.loader__circle}></span>
      <span className={styles.loader__circle}></span>
      <span className={styles.loader__circle}></span>
    </div>
  );
};

export default LoadingSpinner;
