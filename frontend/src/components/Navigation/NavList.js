import React from "react";
import { Link } from "react-router-dom";

import styles from "./NavList.module.scss";

const NavList = () => {
  return (
    <React.Fragment>
      <li>
        <Link to='/' className={styles["main-nav__link"]}>
          Home
        </Link>
      </li>
      <li>
        <Link to='/login' className={styles["main-nav__link"]}>
          Find Talent
        </Link>
      </li>
      <li>
        <Link to='/login' className={styles["main-nav__link"]}>
          Find Jobs
        </Link>
      </li>
    </React.Fragment>
  );
};

export default NavList;
