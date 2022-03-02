import React, { useState, useEffect, useCallback } from "react";

import Card from "../../components/UI/Card/Card";
import Container from "../../components/UI/Container/Container";
import NotFound from "../NotFound/NotFound";
import LoadingSpinner from "../../components/UI/Loading/LoadingSpinner";

import { useParams } from "react-router-dom";
import axios from "axios";

import styles from "./Bidding.module.scss";

const Bidding = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchJobHandler = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const responseProfile = await axios.get(`/api/job/${id}/`);
      // const responseUser = await axios.get(
      //   `/api/users/${responseProfile.data.user}/`
      // );

      // setUser(responseUser.data);
      setJob(responseProfile.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchJobHandler();
  }, [fetchJobHandler]);

  if (error) return <NotFound />;

  const {
    project_title,
    project_description,
    skills,
    budget_min,
    budget_max,
    creation_date,
  } = job;
  return loading ? (
    <LoadingSpinner />
  ) : (
    <section className={styles.section__bid}>
      <Container className={styles.bid__description}>
        <h3 className={styles.list__heading}>{project_title}</h3>
        <p>{project_description}</p>
        {skills &&
          skills.map((skill) => <div key={skill.id}>{skill.skill_name}</div>)}

        <div>{budget_min}</div>
        <div>{budget_max}</div>
        <div>{creation_date}</div>

        {/* This is for the results display section */}
        <Card className={styles.bid__client} variant='boxy'></Card>
      </Container>
    </section>
  );
};

export default Bidding;
