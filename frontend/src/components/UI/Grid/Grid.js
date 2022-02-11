import React from "react";

import styles from "./Grid.module.scss";

const Grid = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export default Grid;
