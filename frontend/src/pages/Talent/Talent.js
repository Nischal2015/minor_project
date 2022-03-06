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

import Avatar from "react-avatar";

import { HiArrowNarrowRight } from "react-icons/hi";

import axios from "axios";
import { useSelector } from "react-redux";

import styles from "./Talent.module.scss";
import { MdSearch } from "react-icons/md";

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

  const [users, setUsers] = useState(null);
  const [printUsers, setPrintUsers] = useState(null);
  const uid = useSelector((state) => state.auth.user?.id);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const searchDataHandler = (searchTerm) => {
    console.log(searchTerm);
    const updatedItems =
      users &&
      users.filter((user) =>
        user.skills.some((skill) =>
          skill.skill_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    setPrintUsers(updatedItems);
  };

  useEffect(() => {
    getUsers(uid, isAuthenticated);
  }, [uid, isAuthenticated]);

  const getUsers = async (uid, isAuthenticated) => {
    try {
      const response = isAuthenticated
        ? await axios.post("/api/profiles/", { uid })
        : await axios.get("/api/profiles/");
      setPrintUsers(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
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
              <Searchbar variant='small' onSearch={searchDataHandler} />
            </label>
          </div>
        </Card>

        <Card className={styles.results} variant='boxy'>
          <div className={styles.results__heading}>
            <h3 className='heading--tertiary'>Top Results</h3>
          </div>
          <div className={styles.results__list}>
            {/* FROM API */}

            {users === null ? (
              <LoadingBouncer />
            ) : printUsers.length === 0 ? (
              <div className={styles["not-found"]}>
                <MdSearch className={styles["not-found__svg"]} />
                <h3 className={styles["not-found__heading"]}>
                  No Matching Users Found
                </h3>
                <p className={styles["not-found__message"]}>
                  Please make sure your keywords are spelled correctly.
                </p>
              </div>
            ) : (
              printUsers
                .filter((props) => props.user.id !== uid)
                .map((props) => {
                  const { user, rating, avatar, ...otherList } = props;
                  return (
                    <div className={styles.list} key={user.id}>
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
                            src={`static/${avatar}`}
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
                          to={`/talent/${user.id}`}
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
