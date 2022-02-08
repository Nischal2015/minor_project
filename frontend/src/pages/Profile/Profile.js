import React, { useState, useEffect, useCallback } from "react";

import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import CircularRatings from "../../components/UI/Ratings/CircularRatings/CircularRatings";
import Container from "../../components/UI/Container/Container";
import NotFound from "../NotFound/NotFound";
import {
  FaFacebook,
  FaTwitter,
  FaPhoneSquareAlt,
  FaEnvelope,
} from "react-icons/fa";

import styles from "./Profile.module.scss";
import Avatar from "react-avatar";

import { useParams } from "react-router-dom";

// This is the data to be received from the backend
// import { talentLists } from "../Talent/Talent";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [error, setError] = useState(false);

  const feature = {
    hoursPerWeek: 35,
    totalJobs: 78,
    totalHours: 500,
  };
  // This filtering is to be done by the backend
  // const profileHolder = talentLists.filter(
  //   (talentItem) => talentItem.id === +id
  // )[0];

  const fetchUserHandler = useCallback(async () => {
    try {
      const response = await axios.get(`/users/${id}`);
      setUser(response.data);
    } catch (error) {
      setError(true);
      console.log("Server error");
    }
  }, [id]);

  useEffect(() => {
    // console.log("fetch function running");
    fetchUserHandler();
  }, [fetchUserHandler]);

  // if (profileHolder === undefined)
  //   return <div>Navako user lai kina khojeko ho kunni</div>;

  // const { jobheading, description, img, rating, hourlyRate } = profileHolder;
  // const { reliability, punctual, communication, qualityWork } = rating;
  return error ? (
    <NotFound />
  ) : (
    <React.Fragment>
      <Container className={styles.profile__top}>
        <Card className={styles.profile__summary} variant='boxy'>
          <figure className={styles["summary__image"]}>
            <div>
              {user.avatar === null ? (
                <Avatar
                  name={`${user.first_name} ${user.last_name}`}
                  round={true}
                  size='100%'
                  textSizeRatio={2.5}
                  alt='Name Initials Avatar'
                  maxInitials={3}
                />
              ) : (
                <Avatar
                  src={user.avatar}
                  round={true}
                  size='100%'
                  textSizeRatio={2.5}
                  alt='Profile Avatar'
                />
              )}
            </div>
            <figcaption>{`${user.first_name} ${user.last_name}`}</figcaption>
          </figure>
          <div className={styles["summary__rating"]}>
            <div>
              <CircularRatings>{20}</CircularRatings>
              <span className={styles["rating-name"]}>Reliability</span>
            </div>
            <div>
              <CircularRatings>{30}</CircularRatings>
              <span className={styles["rating-name"]}>Punctual</span>
            </div>
            <div>
              <CircularRatings>{37}</CircularRatings>
              <span className={styles["rating-name"]}>Communication</span>
            </div>
            <div>
              <CircularRatings>{80}</CircularRatings>
              <span className={styles["rating-name"]}>Quality Work</span>
            </div>
          </div>
          <div className={styles["summary__feature"]}>
            <span>Hourly Rate: ${25}/hr</span>
            <span>Hours per week: {`<${feature.hoursPerWeek}`} hrs</span>
            <span>{feature.totalJobs} Total jobs</span>
            <span>{feature.totalHours}+ hours worked</span>
          </div>
          <div className={styles["summary__find"]}>
            <p>Find me on</p>
            <div className={styles["summary__find--link"]}>
              <a
                href='https://www.pcampus.edu.np'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook link'
              >
                <FaFacebook />
              </a>
              <a
                href='https://www.pcampus.edu.np'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Envelope link'
              >
                <FaEnvelope />
              </a>
              <a
                href='https://www.pcampus.edu.np'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='WhatsApp link'
              >
                <FaPhoneSquareAlt />
              </a>
              <a
                href='https://www.pcampus.edu.np'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Twitter link'
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </Card>
        <section className={styles.profile__description}>
          <Card className={styles.profile__info} variant='boxy'>
            <div className={styles.info__heading}>
              <div className={styles.info__heading__user}>
                <h4>
                  {`${user.first_name} ${user.last_name} `}
                  <span className={styles["info__heading__user--username"]}>
                    @{user.username}
                  </span>
                </h4>
                <span className={styles["info__heading__user--project-title"]}>
                  {user.profile_title}
                </span>
              </div>
              <div className={styles["info__heading--review"]}></div>
            </div>
            <p className={styles.info__body}>{user.bio}</p>
            <div className={styles.info__footer}>
              <Button variant='small'>Edit Info</Button>
            </div>
          </Card>
          <Card className={styles.profile__projects} variant='boxy'>
            Project Section
          </Card>
        </section>
      </Container>
      <Container>
        <Card className={styles.profile__reviews} variant='boxy'>
          <h3 className={styles.reviews__heading}>Reviews</h3>
          <div className={styles.reviews__projects}></div>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
