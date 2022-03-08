import React from "react";

import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({
  type,
  children,
  variant,
  style,
  onClick = () => {},
  disabled,
}) => {
  return (
    <button
      type={type || "button"}
      className={styles.btn}
      data-variant={variant}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default React.memo(Button);

Button.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.string,
  style: PropTypes.object,
};
