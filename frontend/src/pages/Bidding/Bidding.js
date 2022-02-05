import React from "react";

import Card from "../../components/UI/Card/Card";
import Container from "../../components/UI/Container/Container";

import { useParams } from "react-router-dom";

// This is th data to be received from the backend
import { jobLists } from "../Jobs/Jobs";

import styles from "./Bidding.module.scss";

const Bidding = () => {
  const { id } = useParams();
  const JobItem = jobLists.filter((JobItem) => JobItem.id === +id)[0];
  const { jobheading, description, skills, budget, posted } = JobItem;
  return (
    <section className={styles.section__bid}>
      <Container className={styles.bid__description}>
        <h3 className={styles.list__heading}>{jobheading}</h3>
        <p>{description}</p>
        <div>{skills}</div>
        <div>{budget}</div>
        <div>{posted}</div>

        {/* This is for the results display section */}
        <Card className={styles.bid__client} variant='boxy'></Card>
      </Container>
    </section>
  );
};

export default Bidding;
