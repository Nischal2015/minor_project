import React from "react";
import NavList from "./NavList";
import CTAList from "./CTAList";
import Searchbar from "../UI/Searchbar/Searchbar";

import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";

import styles from "./MainNav.module.scss";

const MainNav = () => {
  return (
    <React.Fragment>
      {/* This division holds the logo */}
      <div className={styles.logo}>
        <Logo />
      </div>

      {/* This is the main navigation */}
      <nav className={styles["main-nav"]}>
        <ul className={styles["main-nav__list"]}>
          <NavList />
        </ul>
      </nav>

      {/* This div holds the search bar */}
      <div className={styles["main-nav__search"]}>
        <Searchbar />
      </div>

      {/* This div is for the CTA section */}
      <div className={styles["main-nav--cta"]}>
        <ul className={styles["main-nav__list--cta"]}>
          <CTAList />
        </ul>
      </div>
    </React.Fragment>
  );
};

export default MainNav;
