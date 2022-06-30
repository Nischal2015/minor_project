import React from "react";
import PropTypes from "prop-types";

import styles from "./Container.module.scss";

const Container = ({ children, className }) => {
  return (
    <div className={`${styles.container} ${className || ""}`}>{children}</div>
  );
};

export default Container;

Container.propTypes = {
  className: PropTypes.string,
};
