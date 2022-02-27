import React from "react";
import { IoCloseOutline, IoAlertCircleOutline } from "react-icons/io5";

import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../../../store/alert-slice";

import styles from "./Alert.module.scss";

const Alert = () => {
  const message = useSelector((state) => state.alert.message);
  const alertType = useSelector((state) => state.alert.alertType);
  const dispatch = useDispatch();
  const closeAlertHandler = () => {
    dispatch(alertActions.clear());
  };
  return (
    <div className={`${styles.alert} ${alertType && styles[alertType]}`}>
      <IoAlertCircleOutline className={styles.alert__icon} />
      <p>{message}</p>
      <IoCloseOutline
        className={styles.alert__close}
        onClick={closeAlertHandler}
      />
    </div>
  );
};

export default Alert;
