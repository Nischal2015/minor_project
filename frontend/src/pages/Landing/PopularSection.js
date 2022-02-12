import React from "react";
import Container from "../../components/UI/Container/Container";
import { CustomNavLink } from "../../components/UI/CustomLink/CustomLink";

import styles from "./Landing.module.scss";

const PopularSection = () => {
  return (
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
  );
};

export default PopularSection;
