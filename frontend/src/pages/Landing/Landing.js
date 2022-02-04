import React from "react";
import Button from "../../components/UI/Button/Button";
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
          <h2 className='heading--tertiary'>Popular Categories</h2>
        </Container>
        <Container className={styles["popular-cat__list"]}>
          <Button variant='rounded outline primary'>Design and Creative</Button>
          <Button variant='rounded outline primary'>Developoment & IT</Button>
          <Button variant='rounded outline primary'>Sales and Marketing</Button>
          <Button variant='rounded outline primary'>
            Writing and Translation
          </Button>
          <Button variant='rounded outline primary'>
            Accounting & Finance
          </Button>
          <Button variant='rounded outline primary'>Design and Creative</Button>
          <Button variant='rounded outline primary'>Design and Creative</Button>
          <Button variant='rounded outline primary'>Minor</Button>
        </Container>
      </section>

      {/* About us Section */}
      <section className={styles["section__about"]}>
        <Container className={styles.about}>
          <div className={styles["about__img-box"]}></div>
          <div className={styles["about__text-box"]}>
            <h2 className='heading--secondary'>About Us</h2>
            <p className={styles["about__description"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              obcaecati dicta numquam ea nam, laudantium quia sequi, est
              incidunt hic fugiat dolor similique, odio consequuntur? Ratione
              dolorem modi pariatur similique facilis itaque, repellendus
              architecto animi praesentium eveniet voluptatibus voluptas sed.
              Impedit recusandae voluptatem mollitia. Nam aut rem beatae,
              dolorum modi, nemo veritatis numquam et obcaecati eius nihil
              voluptatibus nulla molestiae.
            </p>
            <CustomLink to='/login' ariaLabel='Read more about us'>
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
