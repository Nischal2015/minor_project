import React from "react";
import MainNav from "./MainNav";
import Container from "../UI/Container/Container";
import Grid from "../UI/Grid/Grid";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <header className={styles.header}>
      <Container>
        <Grid>
          <MainNav />
        </Grid>
      </Container>
    </header>
  );
};

export default Navbar;
