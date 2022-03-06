import React, { useEffect, useState } from "react";
import Budget from "../../components/SideList/Budget";
import Container from "../../components/UI/Container/Container";
import Card from "../../components/UI/Card/Card";
import Searchbar from "../../components/UI/Searchbar/Searchbar";
import List from "../../components/List/List";
import Price from "../../components/Price/Price";
import PostedTime from "../../components/SideList/PostedTime";
import { MdSearch } from "react-icons/md";
import { CustomNavLink } from "../../components/UI/CustomLink/CustomLink";
import { HiArrowNarrowRight } from "react-icons/hi";
import styles from "./Jobs.module.scss";
import axios from "axios";
import LoadingBouncer from "../../components/UI/Loading/LoadingBouncer";
import { useSelector } from "react-redux";

const skills = [
  {
    id: 1,
    name: "Your Skill 1",
  },
  {
    id: 2,
    name: "Your Skill 2",
  },
  {
    id: 3,
    name: "Your Skill 3",
  },
  {
    id: 4,
    name: "Your Skill 4",
  },
  {
    id: 5,
    name: "Your Skill 5",
  },
];

const Work = () => {
  const [jobs, setJobs] = useState(null);
  const [printJobs, setPrintJobs] = useState(null);
  const creatorId = useSelector((state) => state.auth.user?.id);
  const searchDataHandler = (searchTerm) => {
    const updatedItems =
      jobs &&
      jobs.filter((job) =>
        job.skills.some((skill) =>
          skill.skill_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    setPrintJobs(updatedItems);
  };

  const fetchJobList = async (creatorId) => {
    try {
      const response = creatorId
        ? await axios.post("/api/jobs/", { creatorId })
        : await axios.get("/api/jobs/");
      setPrintJobs(response.data);
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchJobList(creatorId);
  }, [creatorId]);

  return (
    <section className={styles.section__work}>
      <Container className={styles.work}>
        <Card className={styles.filter} variant='boxy'>
          <h3 className='heading--tertiary'>Filters</h3>

          {/* Price section */}
          <Price />

          {/* Filters skills section */}
          <div className={styles.filter__skills}>
            <h4 className={styles.filter__skills__heading}>Skills</h4>

            <Searchbar variant='small' onSearch={searchDataHandler} />

            <ul className={styles.filter__skills__list}>
              {skills.map(({ id, name }) => (
                <li key={id}>
                  <input type='checkbox' id={id} />
                  <label htmlFor={id}>{name}</label>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* This is for the results display section */}
        <Card className={styles.results} variant='boxy'>
          <div className={styles.results__heading}>
            <h3 className='heading--tertiary'>Top Results</h3>
          </div>
          <div className={styles.results__list}>
            {!jobs ? (
              <LoadingBouncer />
            ) : printJobs.length === 0 ? (
              <div className={styles["not-found"]}>
                <MdSearch className={styles["not-found__svg"]} />
                <h3 className={styles["not-found__heading"]}>
                  No Matching Jobs Found
                </h3>
                <p className={styles["not-found__message"]}>
                  Please make sure your keywords are spelled correctly.
                </p>
              </div>
            ) : (
              printJobs.map(
                ({ id, budget_min, budget_max, creation_date, ...jobList }) => (
                  <div className={styles.list} key={id}>
                    <div className={styles.list__text}>
                      <List id={id} {...jobList} />
                    </div>

                    <div className={styles.list__number}>
                      <Budget budgetMin={budget_min} budgetMax={budget_max} />
                      <PostedTime posted={creation_date} />
                      <CustomNavLink
                        className={styles.list__more}
                        to={`${id}`}
                        variant='small primary'
                        ariaLabel='See more detail about the freelancer'
                      >
                        See More{" "}
                        <span>
                          <HiArrowNarrowRight />
                        </span>
                      </CustomNavLink>
                    </div>
                  </div>
                )
              )
            )}
          </div>
          {/* <div className={styles.results__pagination}></div> */}
        </Card>
      </Container>
    </section>
  );
};

export default Work;
