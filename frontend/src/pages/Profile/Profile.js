import React from "react";

import Card from "../../components/UI/Card/Card";
import CircularRatings from "../../components/UI/Ratings/CircularRatings/CircularRatings";
import Container from "../../components/UI/Container/Container";
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
import { talentLists } from "../Talent/Talent";

const Profile = () => {
  const { id } = useParams();

  // This filtering is to be done by the backend
  const profileHolder = talentLists.filter(
    (talentItem) => talentItem.id === +id
  )[0];

  const feature = {
    hoursPerWeek: 35,
    totalJobs: 78,
    totalHours: 500,
  };

  const { jobheading, description, img, rating, hourlyRate } = profileHolder;
  const { reliability, punctual, communication, qualityWork } = rating;

  return (
    <React.Fragment>
      <Container className={styles.profile__top}>
        <Card className={styles.profile__summary} variant='boxy'>
          <figure className={styles["summary__image"]}>
            <div>
              {img === null ? (
                <Avatar
                  name={jobheading}
                  round={true}
                  size='100%'
                  textSizeRatio={2.5}
                  alt='Name Initials Avatar'
                  maxInitials={3}
                />
              ) : (
                <Avatar
                  src={img}
                  round={true}
                  size='100%'
                  textSizeRatio={2.5}
                  alt='Profile Avatar'
                />
              )}
            </div>
            <figcaption>{jobheading}</figcaption>
          </figure>
          <div className={styles["summary__rating"]}>
            <div>
              <CircularRatings>{reliability}</CircularRatings>
              <span className={styles["rating-name"]}>Reliability</span>
            </div>
            <div>
              <CircularRatings>{punctual}</CircularRatings>
              <span className={styles["rating-name"]}>Punctual</span>
            </div>
            <div>
              <CircularRatings>{communication}</CircularRatings>
              <span className={styles["rating-name"]}>Communication</span>
            </div>
            <div>
              <CircularRatings>{qualityWork}</CircularRatings>
              <span className={styles["rating-name"]}>Quality Work</span>
            </div>
          </div>
          <div className={styles["summary__feature"]}>
            <span>Hourly Rate: ${hourlyRate}/hr</span>
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
            {description}
          </Card>
          <Card className={styles.profile__projects} variant='boxy'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
            accusantium, quae neque autem provident error, officia alias
            possimus earum temporibus totam assumenda illo quaerat quasi
            laudantium quisquam, expedita facilis. Veniam suscipit mollitia modi
            autem earum, rem dolorum sed dolor laboriosam maiores voluptas! Enim
            architecto rerum minima dolor esse, sapiente neque corporis laborum
            adipisci assumenda, repellendus atque eveniet, nulla eligendi! Odio
            ipsa alias cupiditate voluptatibus consequuntur ea neque autem
            voluptatu ipsa dolorem excepturi. Accusamus tenetur autem dicta quis
            asperiores sunt temporibus, aperis, architecto aperiam velit dolor
            beatae quas, eveniet asperiores vitae fuga dignissimos quidem illo
            ea incidunt repellat explicabo perspiciatis! Quibusdam.
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
