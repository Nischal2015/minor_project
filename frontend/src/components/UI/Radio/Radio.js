import React from "react";

import styles from "./Radio.module.scss";

const Radio = ({ text }) => {
  return (
    <div className={styles.radio}>
      <input type='radio' className={styles.radio__input} id='radio' />
      <label htmlFor='radio' className={styles.radio__label}>
        <span className={styles.radio__button}></span>
        <span className={styles.radio__text}>{text}</span>
      </label>
    </div>
  );
};

export default Radio;
