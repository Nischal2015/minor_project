import React from "react";
import { CustomLink } from "../../components/UI/CustomLink/CustomLink";
import Container from "../../components/UI/Container/Container";
import { ReactComponent as Hero } from "../../assets/svg/about.svg";

import styles from "./Landing.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.section__hero}>
      <Container>
        <div className={styles.hero}>
          <div className={styles["hero__text-box"]}>
            <h1 className="heading--primary">
              How Work
              <br /> Should Work
            </h1>
            <p className={styles.hero__description}>
              An all in one place for finding talents that best suite your
              requirements
            </p>

            <div className={styles.hero__cta}>
              <CustomLink
                to="/login"
                variant="rounded outline"
                ariaLabel="Some dummy text"
              >
                Login
              </CustomLink>
              <CustomLink
                to="/"
                variant="tertiary rounded"
                ariaLabel="Some dummy text"
              >
                Signup
              </CustomLink>
            </div>
          </div>
          <picture className={styles["hero__img-box"]}>
            <Hero />
          </picture>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
