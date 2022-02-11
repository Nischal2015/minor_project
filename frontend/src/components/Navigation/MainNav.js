import React from "react";
import NavList from "./NavList";
import CTAList from "./CTAList";
import Searchbar from "../UI/Searchbar/Searchbar";

import { ReactComponent as Logo } from "../../assets/svg/Logo.svg";

import styles from "./MainNav.module.scss";
import { NavLink } from "react-router-dom";

const MainNav = () => {
  return (
    <React.Fragment>
      {/* This division holds the logo */}
      <div className={styles.logo}>
        <NavLink to='/' aria-label='Takes user to the home page'>
          <Logo />
        </NavLink>
      </div>

      {/* This is the main navigation */}
      <nav className={styles["main-nav"]}>
        <ul className={styles["main-nav__list"]}>
          <NavList />
        </ul>
      </nav>

      {/* This div holds the search bar */}
      <Searchbar variant='rounded' />

      {/* This div is for the CTA section */}

      <ul className={styles["main-nav__list--cta"]}>
        <CTAList />
      </ul>
    </React.Fragment>
  );
};

export default MainNav;
