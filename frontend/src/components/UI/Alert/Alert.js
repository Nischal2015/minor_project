import React from "react";
import { IoAlertCircleOutline } from "react-icons/io5";

import { useSelector } from "react-redux";

import styles from "./Alert.module.scss";

const Alert = () => {
  const message = useSelector((state) => state.alert.message);
  const alertType = useSelector((state) => state.alert.alertType);

  return (
    <div className={`${styles.alert} ${alertType && styles[alertType]}`}>
      <IoAlertCircleOutline className={styles.alert__icon} />
      <p>{message}</p>
    </div>
  );
};

export default Alert;
