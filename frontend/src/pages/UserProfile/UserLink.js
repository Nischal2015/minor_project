import React from "react";
import styles from "./UserLink.module.scss";
import { NavLink } from "react-router-dom";

const UserLink = () => {
  const activeLinkChecker = (navData) =>
    navData.isActive ? styles["nav__link--active"] : styles.nav__link;
  return (
    <div className={styles.nav}>
      <NavLink to="bids" className={activeLinkChecker}>
        Your Bids
      </NavLink>

      <NavLink to="job-posts" className={activeLinkChecker}>
        Posted Jobs
      </NavLink>

      <NavLink to="three" className={activeLinkChecker}>
        Link3
      </NavLink>

      <NavLink to="four" className={activeLinkChecker}>
        Link4
      </NavLink>
    </div>
  );
};

export default UserLink;
