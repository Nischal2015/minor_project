import React from "react";
import { CustomNavLink } from "../../components/UI/CustomLink/CustomLink";
import Container from "../../components/UI/Container/Container";
import { ReactComponent as Hero } from "../../assets/svg/Logo.svg";

import { CustomLink } from "../../components/UI/CustomLink/CustomLink";

import styles from "./Landing.module.scss";

const Landing = () => {
  return (
    <React.Fragment>
      <section className={styles["section__hero"]}>
        <Container>
          <div className={styles["hero"]}>
            <div className={styles["hero__text-box"]}>
              <h1 className='heading--primary'>
                How Work
                <br /> Should Work
              </h1>
              <p className={styles["hero__description"]}>
                An all in one place for finding talents that best suite your
                requirements
              </p>

              <div className={styles.hero__cta}>
                <CustomLink
                  to='/login'
                  variant='rounded outline'
                  ariaLabel='Some dummy text'
                >
                  Login
                </CustomLink>
                <CustomLink
                  to='/'
                  variant='tertiary rounded'
                  ariaLabel='Some dummy text'
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

      {/* Categories Section */}
      <section className={styles["section__popular-cat"]}>
        <Container>
          <h2 className='heading--secondary'>Popular Categories</h2>
        </Container>
        <Container className={styles["popular-cat__list"]}>
          <CustomNavLink to='/' variant='rounded outline primary'>
            Design and Creative
          </CustomNavLink>
          <CustomNavLink to='/' variant='rounded outline primary'>
            Development & IT
          </CustomNavLink>
          <CustomNavLink to='/' variant='rounded outline primary'>
            Sales and Marketing
          </CustomNavLink>
          <CustomNavLink to='/' variant='rounded outline primary'>
            Writing and Translation
          </CustomNavLink>
          <CustomNavLink to='/' variant='rounded outline primary'>
            Accounting & Finance
          </CustomNavLink>
          <CustomNavLink to='/' variant='rounded outline primary'>
            Design and Creative
          </CustomNavLink>
          <CustomNavLink to='/' variant='rounded outline primary'>
            Design and Creative
          </CustomNavLink>
          <CustomNavLink to='/' variant='rounded outline primary'>
            Minor
          </CustomNavLink>
        </Container>
      </section>

      {/* About us Section */}
      <section className={styles["section__about"]}>
        <Container className={styles.about}>
          <div className={styles["about__img-box"]}></div>
          <div className={styles["about__text-box"]}>
            <h2 className='heading--secondary'>About Us</h2>
            <p className={styles["about__description"]}>
              I am an invisible man. No, I am not a spook like those who haunted
              Edgar Allan Poe; nor am I one of your Hollywood-movie ectoplasms.
              I am a man of substance, of flesh and bone, fiber and liquids—and
              I might even be said to possess a mind. I am invisible,
              understand, simply because people refuse to see me. I wanted
              you...
            </p>
            <CustomLink to='about' ariaLabel='Read more about us'>
              Read More
            </CustomLink>
          </div>
        </Container>
      </section>
      <section></section>
    </React.Fragment>
  );
};

export default Landing;
