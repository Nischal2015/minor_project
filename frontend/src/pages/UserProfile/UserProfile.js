import React, { useState, useEffect } from "react";
import Card from "../../components/UI/Card/Card";
import CircularRatings from "../../components/UI/Ratings/CircularRatings/CircularRatings";
import Container from "../../components/UI/Container/Container";
import {
  FaFacebook,
  FaTwitter,
  FaPhoneSquareAlt,
  FaEnvelope,
} from "react-icons/fa";

import { useSelector } from "react-redux";

import styles from "../Profile/Profile.module.scss";
import styles2 from "./UserProfile.module.scss";
import Avatar from "react-avatar";

import { Navigate, useNavigate, NavLink, Outlet, Link } from "react-router-dom";

import axios from "axios";
import LoadingSpinner from "../../components/UI/Loading/LoadingSpinner";
import Button from "../../components/UI/Button/Button";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const username = useSelector((state) => state.auth.user?.username);
  const userId = useSelector((state) => state.auth.user?.id);
  let navigate = useNavigate();

  const feature = {
    hoursPerWeek: 35,
    totalJobs: 78,
    totalHours: 500,
  };

  const fetchUserHandler = async (userId) => {
    setError(null);
    try {
      const responseProfile = await axios.post(`/api/user-profile/`, {
        userId,
      });
      setProfile(responseProfile.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    userId && fetchUserHandler(userId);
  }, [userId]);

  if (error)
    return <Navigate to='edit' state={{ profile: "none" }} replace={true} />;

  return !profile ? (
    <LoadingSpinner />
  ) : (
    <React.Fragment>
      <Container className={styles.profile__top}>
        <Card className={styles.profile__summary} variant='boxy'>
          <figure className={styles["summary__image"]}>
            <div>
              {profile.avatar === null ? (
                <Avatar
                  name={`${profile.first_name} ${profile.last_name}`}
                  round={true}
                  size='100%'
                  textSizeRatio={2.5}
                  alt='Name Initials Avatar'
                  maxInitials={3}
                />
              ) : (
                <Avatar
                  src={`static/${profile.avatar}`}
                  round={true}
                  size='100%'
                  textSizeRatio={2.5}
                  alt='Profile Avatar'
                />
              )}
            </div>
            <figcaption>{`${profile.first_name} ${profile.last_name}`}</figcaption>
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
            <span>Hourly Rate: ${profile.hourly_rate}/hr</span>
            <span>Hours per week: {`<${profile.hours_per_week}`} hrs</span>
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
                  {`${profile.first_name} ${profile.last_name} `}
                  <span className={styles["info__heading__user--username"]}>
                    @{username}
                  </span>
                </h4>
                <span className={styles["info__heading__user--project-title"]}>
                  {profile.profile_title}
                </span>
              </div>
              <div className={styles["info__heading--review"]}></div>
            </div>
            <p className={styles.info__body}>{profile.bio}</p>
            <div className={styles.info__footer}>
              <Button
                variant='small'
                onClick={() =>
                  navigate("edit", { state: { profile } }, { replace: true })
                }
              >
                Edit Info
              </Button>
            </div>
          </Card>
          <Card className={styles.profile__projects} variant='boxy'>
            <div className={styles2["profile__cat--navigation"]}>
              <div className={styles2["profile__cat--link"]}>
                <Link to='bids'>Bids</Link>
                {" | "}
                <NavLink to='job-posts'>Job Posts</NavLink>
                {" | "}
                <NavLink to='three'>Link3</NavLink>
                {" | "}
                <NavLink to='four'>Link4</NavLink>
              </div>
            </div>
            <Outlet />
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

export default UserProfile;
