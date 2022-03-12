import React from "react";
import Input from "../UI/Input/Input";

import styles from "./Price.module.scss";

const Price = ({ max, min, onChange }) => {
  return (
    <div className={styles.filter__price}>
      <h4 className={styles.filter__price__heading}>Price</h4>
      <div className={styles.filter__price__group}>
        <div className={styles.filter__pricing}>
          <label htmlFor='min'>min</label>
          <Input
            onChange={onChange?.min}
            value={min}
            type='number'
            id='min'
            variant='small'
          />
        </div>

        <div className={styles.filter__pricing}>
          <label htmlFor='max'>max</label>
          <Input
            onChange={onChange?.max}
            value={max}
            type='number'
            id='max'
            variant='small'
          />
        </div>
      </div>
    </div>
  );
};

export default Price;
