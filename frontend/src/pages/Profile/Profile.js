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

const Profile = () => {
  const name = "Pulchowk Campus";
  const feature = {
    rate: 24,
    hoursPerWeek: 35,
    totalJobs: 78,
    totalHours: 500,
  };

  return (
    <React.Fragment>
      <Container className={styles.profile__top}>
        <Card className={styles.profile__summary} variant='boxy'>
          <figure className={styles["summary__image"]}>
            <div>
              <Avatar
                name={name}
                round={true}
                size='100%'
                textSizeRatio={2.5}
                alt='Name Initials Avatar'
              />
            </div>
            <figcaption>{name}</figcaption>
          </figure>
          <div className={styles["summary__rating"]}>
            <div>
              <CircularRatings>17</CircularRatings>
              <span className={styles["rating-name"]}>Reliability</span>
            </div>
            <div>
              <CircularRatings>88</CircularRatings>
              <span className={styles["rating-name"]}>Satisfaction</span>
            </div>
            <div>
              <CircularRatings>43</CircularRatings>
              <span className={styles["rating-name"]}>Reliability</span>
            </div>
            <div>
              <CircularRatings>62</CircularRatings>
              <span className={styles["rating-name"]}>Reliability</span>
            </div>
          </div>
          <div className={styles["summary__feature"]}>
            <span>Hourly Rate: ${feature.rate}/hr</span>
            <span>Hours per week: {`<${feature.hoursPerWeek}`} hrs</span>
            <span>{feature.totalJobs} Total jobs</span>
            <span>{feature.totalHours}+ hours worked</span>
          </div>
          <div className={styles["summary__find"]}>
            <p>Find us on</p>
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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis
            accusantium, quae neque autem provident error, officia alias
            possimus earum temporibus totam assumenda illo quaerat quasit. Nisi
            fugit facere cupiditate, voluptatibus inventore repellendus natus
            soluta deserunt, temporibus sapiente quidem maxime architecto,
            similique repellat sunt enim alias! Similique cupiditate quasi
            accusamus quae magni dolor. Obcaecati reiciendis, architecto aperiam
            velit dolor beatae quas, eveniet asperiores vitae fuga dignissimos
            quidem illo ea incidunt repellat explicabo perspiciatis! Quibusdam.
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
