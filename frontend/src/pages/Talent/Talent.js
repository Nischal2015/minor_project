import React, { useState, useEffect } from "react";

import { CustomNavLink } from "../../components/UI/CustomLink/CustomLink";
import Container from "../../components/UI/Container/Container";
import Card from "../../components/UI/Card/Card";
import CircularRating from "../../components/UI/Ratings/CircularRatings/CircularRatings";
import Price from "../../components/Price/Price";
import Searchbar from "../../components/UI/Searchbar/Searchbar";
import List from "../../components/List/List";
import Slider from "../../components/UI/Slider/Slider";
import LoadingBouncer from "../../components/UI/Loading/LoadingBouncer";

import profilePic from "../../assets/png/user_hero.png";
import Avatar from "react-avatar";

import { HiArrowNarrowRight } from "react-icons/hi";

import axios from "axios";

import styles from "./Talent.module.scss";

export const talentLists = [
  {
    id: 111,
    jobheading: "Aman Shakya",
    img: profilePic,
    description:
      "My name is Aman Shakya. I teach TOC, Software Engineering, DBMS in Pulchowk Engineering Campus. Sometimes, I like to laugh between the middle of lecture on my own jokes, but many students don't consider them to be funny.",
    skills: [
      "TOC",
      "DBMS",
      "Reinforcement Learning",
      ".NET Framework",
      "Java",
      "Backend Development",
      "Software Engineering",
    ],
    rating: {
      reliability: 32,
      punctual: 23,
      communication: 54,
      qualityWork: 59,
    },
    hourlyRate: 35,
  },
];

const ratingsCriteria = [
  { id: 1, name: "Reliability" },
  { id: 2, name: "Punctual" },
  { id: 3, name: "Communication Skills" },
  { id: 4, name: "Quality Work" },
];

const Talent = () => {
  // const RELIABILITY_WEIGHT = 0.25;
  // const PUCNTUAL_WEIGHT = 0.15;
  // const COMMUNICATION_WEIGHT = 0.15;
  // const QUALITYWORK_WEIGHT = 0.45;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("profiles/");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <section className={styles.section__work}>
      <Container className={styles.talent}>
        <Card className={styles.filter} variant='boxy'>
          <h3 className='heading--tertiary'>Filters</h3>

          {/* Filters pricing section */}
          <Price />

          {/* Filters skills section */}
          <div className={styles.filter__skills}>
            <h4 className={styles.filter__skills__heading}>Ratings</h4>
            {ratingsCriteria.map(({ id, name }) => (
              <Slider key={id} text={name} />
            ))}
          </div>

          <div className={styles.filter__skills}>
            <h4 className={styles.filter__skills__heading}>Skills</h4>
            <label>
              <Searchbar variant='small' />
            </label>
          </div>
        </Card>

        <Card className={styles.results} variant='boxy'>
          <div className={styles.results__heading}>
            <h3 className='heading--tertiary'>Top Results</h3>
          </div>
          <div className={styles.results__list}>
            {/* FROM API */}

            {loading ? (
              <LoadingBouncer />
            ) : (
              users.map(({ user, rating, avatar, ...otherList }) => {
                return (
                  <div className={styles.list} key={user}>
                    <picture className={styles.list__picture}>
                      {avatar === null ? (
                        <Avatar
                          name={`${otherList.first_name} ${otherList.last_name}`}
                          round={true}
                          size='100%'
                          textSizeRatio={2.25}
                          alt='Name Initials Avatar'
                          maxInitials={3}
                        />
                      ) : (
                        <Avatar
                          src={avatar}
                          round={true}
                          size='100%'
                          textSizeRatio={2.25}
                          alt='Profile Avatar'
                        />
                      )}
                    </picture>

                    <div className={styles.list__text}>
                      <List {...otherList} />
                    </div>

                    <div className={styles.list__number}>
                      <CircularRating>{rating}</CircularRating>
                      <CustomNavLink
                        className={styles.list__more}
                        to={`/talent/${user}`}
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
                );
              })
            )}
          </div>
          <div className={styles.results__pagination}></div>
        </Card>
      </Container>
    </section>
  );
};

export default Talent;
