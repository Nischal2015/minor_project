import React from "react";
import Container from "../../components/UI/Container/Container";
import Card from "../../components/UI/Card/Card";
import Price from "../../components/Price/Price";
import Input from "../../components/UI/Input/Input";
import Slider from "../../components/UI/Slider/Slider";

import styles from "./Talent.module.scss";

const Talent = () => {
  return (
    <section className={styles.section__work}>
      <Container className={styles.work}>
        <Card className={styles.filter} variant='boxy'>
          <h3 className='heading--tertiary'>Filters</h3>

          {/* Filters pricing section */}
          <Price />

          {/* Filters skills section */}
          <div className={styles.filter__skills}>
            <h4 className={styles.filter__skills__heading}>Skills</h4>

            <Slider text='Reliability' />
            <br />
            <Slider text='Punctual' />
            <br />
            <Slider text='Communication Skill' />
            <br />
            <Slider text='Rating Criteria' />

            <Input type='text' variant='small'></Input>
          </div>
        </Card>
      </Container>
    </section>
  );
};

export default Talent;
