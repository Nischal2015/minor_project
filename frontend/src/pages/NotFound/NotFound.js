import React from "react";

import Container from "../../components/UI/Container/Container";
import { CustomNavLink } from "../../components/UI/CustomLink/CustomLink";
import error from "../../assets/jpg/error_404.webp";

import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <section>
      <Container className={styles.error}>
        <div className={styles["error-image"]}>
          {/* <Error />  */}
          <img src={error} alt='Not Found' />
        </div>
        <div className={styles["error-block"]}>
          <div className={styles["error-block__number"]}>404</div>
          <div className={styles["error-block__detail"]}>
            <p>
              Sorry, this page <br />
              isn't available!
            </p>
            <CustomNavLink
              to='/'
              style={{ width: "fit-content" }}
              ariaLabel='Go to Home Page'
            >
              Visit Homepage &rarr;
            </CustomNavLink>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NotFound;
