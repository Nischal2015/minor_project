import React from "react";
import Input from "../UI/Input/Input";

import styles from "./Price.module.scss";

const Price = () => {
  return (
    <div className={styles.filter__price}>
      <h4 className={styles.filter__price__heading}>Price</h4>
      <div className={styles.filter__price__group}>
        <div className={styles.filter__pricing}>
          <label htmlFor='min'>min</label>
          <Input type='text' id='min' variant='small'></Input>
        </div>

        <div className={styles.filter__pricing}>
          <label htmlFor='max'>max</label>
          <Input type='text' id='max' variant='small'></Input>
        </div>
      </div>
    </div>
  );
};

export default Price;
