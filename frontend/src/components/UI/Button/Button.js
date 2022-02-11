import React from "react";

import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ type, children, variant, onClick }) => {
  return (
    <button
      type={type || "button"}
      className={styles.btn}
      data-variant={variant}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
};
