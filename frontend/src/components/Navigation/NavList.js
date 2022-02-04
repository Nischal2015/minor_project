import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavList.module.scss";

const NavList = () => {
  const activeLinkChecker = (navData) =>
    navData.isActive
      ? styles["main-nav__link--active"]
      : styles["main-nav__link"];
  return (
    <React.Fragment>
      <li>
        <NavLink to='/' className={activeLinkChecker}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/talent' className={activeLinkChecker}>
          Find Talent
        </NavLink>
      </li>
      <li>
        <NavLink to='/jobs' className={activeLinkChecker}>
          Find Jobs
        </NavLink>
      </li>
    </React.Fragment>
  );
};

export default NavList;
