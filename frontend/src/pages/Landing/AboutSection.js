import React from "react";
import Container from "../../components/UI/Container/Container";
import { CustomLink } from "../../components/UI/CustomLink/CustomLink";
import { ReactComponent as About } from "../../assets/svg/about.svg";

import styles from "./Landing.module.scss";

const AboutSection = () => {
  return (
    <section className={styles["section__about"]}>
      <Container className={styles.about}>
        <picture className={styles["about__img-box"]}>
          <About />
        </picture>
        <div className={styles["about__text-box"]}>
          <h2 className='heading--secondary'>About Us</h2>
          <p className={styles["about__description"]}>
            I am an invisible man. No, I am not a spook like those who haunted
            Edgar Allan Poe; nor am I one of your Hollywood-movie ectoplasms. I
            am a man of substance, of flesh and bone, fiber and liquids—and I
            might even be said to possess a mind. I am invisible, understand,
            simply because people refuse to see me. I wanted you...
          </p>
          <CustomLink to='about' ariaLabel='Read more about us'>
            Read More
          </CustomLink>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;
