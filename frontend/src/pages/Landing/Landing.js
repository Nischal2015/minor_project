import React from "react";
import Button from "../../components/UI/Button/Button";
import Container from "../../components/UI/Container/Container";

import { Link } from "react-router-dom";

import styles from "./Landing.module.scss";

const Landing = () => {
  return (
    <React.Fragment>
      <section className={styles["section__hero"]}>
        <Container>
          <div className={styles["hero"]}>
            <div className={styles["hero__text-box"]}>
              <h1 className='heading--primary'>
                Hero Heading is primary heading of the page
              </h1>
              <p className={styles["hero__description"]}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus rem commodi blanditiis aliquam maiores est ipsum
                molestiae veniam odio ipsam sit officiis, sint laboriosam iusto
                labore quos excepturi velit? Totam ad voluptatem ipsam,
                voluptates vitae expedita soluta exercitationem dolorum sit iste
                delectus quod ex necessitatibus veritatis facilis dolore porro
                nulla ut recusandae? Possimus harum voluptatem!
              </p>
              <Link to='/login'>
                <Button variant='rounded'>Login</Button>
              </Link>
              <Link to='/'>
                <Button variant='rounded'>Button</Button>
              </Link>
            </div>
            <div className={styles["hero__img-box"]}>
              <picture>&nbsp;</picture>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className={styles["section__popular-cat"]}>
        <Container>
          <h2 className='heading--tertiary'>Popular Categories</h2>
        </Container>
        <Container className={styles["popular-cat__list"]}>
          <Button variant='rounded secondary'>Design and Creative</Button>
          <Button variant='rounded secondary'>Developoment & IT</Button>
          <Button variant='rounded secondary'>Sales and Marketing</Button>
          <Button variant='rounded secondary'>Writing and Translation</Button>
          <Button variant='rounded secondary'>Accounting & Finance</Button>
          <Button variant='rounded secondary'>Design and Creative</Button>
          <Button variant='rounded secondary'>Design and Creative</Button>
          <Button variant='rounded secondary'>Design and Creative</Button>
        </Container>
      </section>

      {/* About us Section */}
      <section className={styles["section__about"]}>
        <Container className={styles.about}>
          <div className={styles["about__img-box"]}></div>
          <div className={styles["about__text-box"]}>
            <h2 className='heading--secondary'>About Us</h2>
            <p className={styles["hero__description"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              obcaecati dicta numquam ea nam, laudantium quia sequi, est
              incidunt hic fugiat dolor similique, odio consequuntur? Ratione
              dolorem modi pariatur similique facilis itaque, repellendus
              architecto animi praesentium eveniet voluptatibus voluptas sed.
              Impedit recusandae voluptatem mollitia. Nam aut rem beatae,
              dolorum modi, nemo veritatis numquam et obcaecati eius nihil
              voluptatibus nulla molestiae.
            </p>
            <Link to='/login'>
              <Button>Read More</Button>
            </Link>
          </div>
        </Container>
      </section>
      <section></section>
    </React.Fragment>
  );
};

export default Landing;
