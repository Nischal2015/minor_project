import React from "react";
import NavList from "./NavList";
import CTAList from "./CTAList";
import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";

import styles from "./MainNav.module.scss";

const MainNav = () => {
  return (
    <React.Fragment>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles["main-nav"]}>
        <ul className={styles["main-nav__list"]}>
          <NavList />
        </ul>
      </nav>

      <input type='text' className={styles["main-nav--search"]} />

      <div className={styles["main-nav--cta"]}>
        <ul className={styles["main-nav__list--cta"]}>
          <CTAList />
        </ul>
      </div>
    </React.Fragment>
  );
};

export default MainNav;
