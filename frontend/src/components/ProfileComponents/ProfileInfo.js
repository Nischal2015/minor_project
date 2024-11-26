import React from "react";
import Card from "../UI/Card/Card";
import styles from "./ProfileInfo.module.scss";
import Button from "../UI/Button/Button";

const ProfileInfo = ({ profile, username, onClick }) => {
  return (
    <Card className={styles.profile__info} variant="boxy">
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
        <div className={styles["info__heading--review"]} />
      </div>
      <p className={styles.info__body}>{profile.bio}</p>
      <div className={styles.info__footer}>
        <Button variant="small" onClick={onClick}>
          Edit Info
        </Button>
      </div>
    </Card>
  );
};

export default ProfileInfo;
