import React, { useState, useEffect, useCallback } from "react";
import Avatar from "react-avatar";
import { CustomNavLink } from "../../components/UI/CustomLink/CustomLink";
import Container from "../../components/UI/Container/Container";
import Card from "../../components/UI/Card/Card";
import CircularRating from "../../components/UI/Ratings/CircularRatings/CircularRatings";
import { HiArrowNarrowRight } from "react-icons/hi";
import List from "../../components/List/List";
import LoadingBouncer from "../../components/UI/Loading/LoadingBouncer";
import Price from "../../components/Price/Price";
import Searchbar from "../../components/UI/Searchbar/Searchbar";
import Slider from "../../components/UI/Slider/Slider";
import SearchNotFound from "../../components/SearchNotFound/SearchNotFound";
import { useSelector } from "react-redux";
import axios from "axios";
import { getMemoizedId } from "../../store/auth-slice";
import styles from "./Talent.module.scss";

const ratingsCriteria = [
  { id: 1, name: "Reliability" },
  { id: 2, name: "Punctual" },
  { id: 3, name: "Communication Skills" },
  { id: 4, name: "Quality Work" },
];

const Talent = () => {
  // const RELIABILITY_WEIGHT = 0.25;
  // const PUNCTUAL_WEIGHT = 0.15;
  // const COMMUNICATION_WEIGHT = 0.15;
  // const QUALITYWORK_WEIGHT = 0.45;

  const [users, setUsers] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [printUsers, setPrintUsers] = useState(null);
  const [maxValue, setMaxValue] = useState("");
  const [minValue, setMinValue] = useState("");
  const uid = useSelector(getMemoizedId);
  const searchDataHandler = useCallback(() => {
    const updatedItems =
      users &&
      users.filter((user) => {
        const skillFilter = user.skills.some((skill) =>
          skill.skill_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const minFilter = +user.hourly_rate >= minValue;
        const maxFilter =
          +user.hourly_rate <= (+maxValue !== 0 ? maxValue : 1000000);
        return skillFilter && minFilter && maxFilter;
      });
    setPrintUsers(updatedItems);
  }, [users, searchTerm, minValue, maxValue]);

  const getUsers = useCallback(async () => {
    try {
      const response = uid
        ? await axios.post("/api/profiles/", { uid })
        : await axios.get("/api/profiles/");
      setPrintUsers(response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [uid]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      searchDataHandler();
    }, 300);

    return () => {
      clearTimeout(identifier);
    };
  }, [searchDataHandler]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <section className={styles.section__work}>
      <Container className={styles.talent}>
        <Card className={styles.filter} variant='boxy'>
          <h3 className='heading--tertiary'>Filters</h3>

          {/* Filters pricing section */}
          <Price
            min={minValue}
            max={maxValue}
            onChange={{
              min: (event) => setMinValue(event.target.value),
              max: (event) => setMaxValue(event.target.value),
            }}
          />

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
              <Searchbar
                variant='small'
                onChange={(event) => setSearchTerm(event.target.value)}
              />
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
              <SearchNotFound term='Users' />
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
                            src={`/static/${avatar}`}
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
