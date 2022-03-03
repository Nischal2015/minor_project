import React, { useEffect, useState } from "react";

import Budget from "../../components/SideList/Budget";
import Container from "../../components/UI/Container/Container";
import Card from "../../components/UI/Card/Card";
import { CustomNavLink } from "../../components/UI/CustomLink/CustomLink";
import Searchbar from "../../components/UI/Searchbar/Searchbar";
import List from "../../components/List/List";
import Price from "../../components/Price/Price";
import PostedTime from "../../components/SideList/PostedTime";

import { HiArrowNarrowRight } from "react-icons/hi";

import styles from "./Jobs.module.scss";
import axios from "axios";
import LoadingBouncer from "../../components/UI/Loading/LoadingBouncer";
import { useSelector } from "react-redux";

// DUMMY data for skills
// will be replaced by data obtained from API
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
  // const [searchTerm, setSearchTerm] = useState("");

  // const updatedItems = lists.filter((list) =>
  //   list.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const searchDataHandler = (event) => {
  //   setSearchTerm(event.target.value);
  // };
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const creatorId = useSelector((state) => state.auth.user?.id);

  const fetchJobList = async (creatorId) => {
    setLoading(true);
    try {
      const response = creatorId
        ? await axios.post("api/jobs/", { creatorId })
        : await axios.get("api/jobs/");
      setJobs(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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

            <Searchbar variant='small' />

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
            {loading ? (
              <LoadingBouncer />
            ) : (
              jobs.map(
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
          <div className={styles.results__pagination}></div>
        </Card>

        {/* <div>
          <Searchbar value={searchTerm} onSearch={searchDataHandler} />
        </div>

        <ul>
          {updatedItems.map(({ id, ...list }) => (
            <li key={id}>
              <span>{list.name}</span>
            </li>
          ))}
        </ul> */}
      </Container>
    </section>
  );
};

export default Work;
