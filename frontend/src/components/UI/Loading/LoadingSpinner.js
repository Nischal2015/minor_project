import React from "react";

import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles.loader2}>
      <span className={styles.loader2__spinner}></span>
      <span className={styles.loader2__spinner}></span>
      <span className={styles.loader2__spinner}></span>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
