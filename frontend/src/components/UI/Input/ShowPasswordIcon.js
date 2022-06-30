import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import styles from "./ShowPasswordIcon.module.scss";

const ShowPasswordIcon = ({ hidePassword, setHidePassword }) => {
  return (
    <div role="button" className={styles.password} onClick={setHidePassword}>
      {!hidePassword ? (
        <FaEye aria-label="Hides password" />
      ) : (
        <FaEyeSlash aria-label="Shows password" />
      )}
    </div>
  );
};

export default ShowPasswordIcon;
