import React from "react";

import styles from "./Budget.module.scss";

const Budget = ({ budgetMin, budgetMax }) => {
  return (
    <p className={styles.budget}>{`$${Math.trunc(budgetMin)} - ${Math.trunc(
      budgetMax
    )} USD`}</p>
  );
};

export default Budget;
