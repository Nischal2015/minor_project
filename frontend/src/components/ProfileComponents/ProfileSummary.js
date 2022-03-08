import React from "react";
import styles from "./ProfileSummary.module.scss";
import Card from "../UI/Card/Card";
import Avatar from "react-avatar";
import CircularRatings from "../UI/Ratings/CircularRatings/CircularRatings";
import {
  FaFacebook,
  FaTwitter,
  FaPhoneSquareAlt,
  FaEnvelope,
} from "react-icons/fa";

const ProfileSummary = ({ profile }) => {
  const feature = {
    totalJobs: 78,
    totalHours: 500,
  };
  return (
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
              src={`/static/${profile.avatar}`}
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
  );
};

export default ProfileSummary;
