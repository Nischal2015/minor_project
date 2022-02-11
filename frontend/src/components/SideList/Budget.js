import React from "react";

import styles from "./Budget.module.scss";

const Budget = ({ budget }) => {
  return (
    <p className={styles.budget}>{`$${budget.replace("-", " - ")} USD`}</p>
  );
};

export default Budget;
