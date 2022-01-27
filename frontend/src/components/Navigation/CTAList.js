import React from "react";
import styles from "./NavList.module.scss";

import { Link } from "react-router-dom";

const CTAList = () => {
  return (
    <React.Fragment>
      <li>
        <Link
          to='/login'
          className={`${styles["main-nav__link"]} ${styles.utility}`}
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          to='/login'
          className={`${styles["main-nav__link"]} ${styles["nav-cta"]}`}
        >
          Signup
        </Link>
      </li>
    </React.Fragment>
  );
};

export default CTAList;
