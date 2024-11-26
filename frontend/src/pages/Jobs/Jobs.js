import React, { useCallback, useEffect, useState } from "react";
import Budget from "../../components/SideList/Budget";
import Container from "../../components/UI/Container/Container";
import Card from "../../components/UI/Card/Card";
import Searchbar from "../../components/UI/Searchbar/Searchbar";
import List from "../../components/List/List";
import Price from "../../components/Price/Price";
import PostedTime from "../../components/SideList/PostedTime";
import { CustomNavLink } from "../../components/UI/CustomLink/CustomLink";
import { HiArrowNarrowRight } from "react-icons/hi";
import styles from "./Jobs.module.scss";
import axios from "axios";
import LoadingBouncer from "../../components/UI/Loading/LoadingBouncer";
import { useSelector } from "react-redux";
import SearchNotFound from "../../components/SearchNotFound/SearchNotFound";
import { getMemoizedId } from "../../store/auth-slice";

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
  const [maxValue, setMaxValue] = useState("");
  const [minValue, setMinValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const creatorId = useSelector(getMemoizedId);

  const searchDataHandler = useCallback(() => {
    const updatedItems =
      jobs &&
      jobs.filter((job) => {
        const skillFilter = job.skills.some((skill) =>
          skill.skill_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const minFilter = +job.budget_min >= minValue;
        const maxFilter =
          +job.budget_max <= (+maxValue !== 0 ? maxValue : 1000000);

        return skillFilter && minFilter && maxFilter;
      });
    setPrintJobs(updatedItems);
  }, [jobs, searchTerm, minValue, maxValue]);

  const fetchJobList = useCallback(async () => {
    try {
      const response = creatorId
        ? await axios.post("/api/jobs/", { creatorId })
        : await axios.get("/api/jobs/");
      setPrintJobs(response.data);
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [creatorId]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      searchDataHandler();
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [searchDataHandler]);

  useEffect(() => {
    fetchJobList();
  }, [fetchJobList]);

  return (
    <section className={styles.section__work}>
      <Container className={styles.work}>
        <Card className={styles.filter} variant="boxy">
          <h3 className="heading--tertiary">Filters</h3>

          {/* Price section */}
          <Price
            max={maxValue}
            min={minValue}
            onChange={{
              max: (event) => setMaxValue(event.target.value),
              min: (event) => setMinValue(event.target.value),
            }}
          />

          {/* Filters skills section */}
          <div className={styles.filter__skills}>
            <h4 className={styles.filter__skills__heading}>Skills</h4>

            <Searchbar
              variant="small"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />

            <ul className={styles.filter__skills__list}>
              {skills.map(({ id, name }) => (
                <li key={id}>
                  <input type="checkbox" id={id} />
                  <label htmlFor={id}>{name}</label>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        {/* This is for the results display section */}
        <Card className={styles.results} variant="boxy">
          <div className={styles.results__heading}>
            <h3 className="heading--tertiary">Top Results</h3>
          </div>
          <div className={styles.results__list}>
            {!jobs ? (
              <LoadingBouncer />
            ) : printJobs.length === 0 ? (
              <SearchNotFound term="Jobs" />
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
                        variant="small primary"
                        ariaLabel="See more detail about the freelancer"
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
