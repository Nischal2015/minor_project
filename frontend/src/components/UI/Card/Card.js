import React from "react";
import PropTypes from "prop-types";

import styles from "./Card.module.scss";

const Card = ({
  children,
  className,
  variant,
  ariaLabelledBy,
  role,
  style,
}) => {
  return (
    <div
      style={style}
      className={`${styles.card} ${className ? className : ""}`}
      data-variant={variant}
      role={role || null}
      aria-labelledby={ariaLabelledBy || null}
    >
      {children}
    </div>
  );
};

export default Card;

Card.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  ariaLabellebBy: PropTypes.string,
  role: PropTypes.string,
};
