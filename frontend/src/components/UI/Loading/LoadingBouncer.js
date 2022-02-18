import React from "react";

import styles from "./LoadingSpinner.module.scss";

const LoadingBouncer = () => {
  return (
    <div className={styles.loader1}>
      <span className={styles.loader1__circle}></span>
      <span className={styles.loader1__circle}></span>
      <span className={styles.loader1__circle}></span>
    </div>
  );
};

export default LoadingBouncer;
