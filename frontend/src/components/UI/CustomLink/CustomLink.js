import React from "react";

import { NavLink, Link } from "react-router-dom";

import styles from "../Button/Button.module.scss";

const CustomNavLink = ({
  to,
  variant,
  children,
  ariaLabel,
  style,
  className,
}) => {
  return (
    <NavLink
      to={to}
      className={`${styles.btn} ${className ? className : null}`}
      data-variant={variant}
      aria-label={ariaLabel}
      style={() => style}
    >
      {children}
    </NavLink>
  );
};

const CustomLink = ({ to, variant, children, ariaLabel }) => {
  return (
    <Link
      to={to}
      className={styles.btn}
      data-variant={variant}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

export { CustomLink, CustomNavLink };
