import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./NavList.module.scss";

const NavList = () => {
  return (
    <React.Fragment>
      <li>
        <NavLink
          to='/'
          className={(navData) =>
            navData.isActive
              ? styles["main-nav__link--active"]
              : styles["main-nav__link"]
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/talent'
          className={(navData) =>
            navData.isActive
              ? styles["main-nav__link--active"]
              : styles["main-nav__link"]
          }
        >
          Find Talent
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/jobs'
          className={(navData) =>
            navData.isActive
              ? styles["main-nav__link--active"]
              : styles["main-nav__link"]
          }
        >
          Find Jobs
        </NavLink>
      </li>
    </React.Fragment>
  );
};

export default NavList;
