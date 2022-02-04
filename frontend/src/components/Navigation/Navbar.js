import React from "react";
import MainNav from "./MainNav";
import Container from "../UI/Container/Container";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.navigation}>
        <MainNav />
      </Container>
    </header>
  );
};

export default Navbar;
