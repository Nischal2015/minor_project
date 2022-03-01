import React from "react";

import styles from "./PostedTime.module.scss";

const PostedTime = ({ posted }) => {
  let creationDate = Date.parse(posted);
  let time = Date.now();

  const calculateTime = () => {
    let postedAgo = time - creationDate;
    if (postedAgo < 6e4) {
      return [postedAgo, "seconds"];
    } else if (postedAgo < 3.6e6) {
      let postedTime = Math.floor(postedAgo / 6e4);
      return [postedTime, postedTime === 1 ? "minute" : "minutes"];
    } else if (postedAgo < 8.64e7) {
      let postedTime = Math.floor(postedAgo / 3.6e6);
      return [postedTime, postedTime === 1 ? "hour" : "hours"];
    } else if (postedAgo < 2.628e9) {
      let postedTime = Math.floor(postedAgo / 8.64e7);
      return [postedTime, postedTime === 1 ? "day" : "days"];
    } else if (postedAgo < 3.154e10) {
      let postedTime = Math.floor(postedAgo / 2.628e9);
      return [postedTime, postedTime === 1 ? "month" : "months"];
    } else {
      let postedTime = Math.floor(postedAgo / 3.154e10);
      return [postedTime, postedTime === 1 ? "year" : "years"];
    }
  };

  const displayTime = calculateTime();

  return (
    <p className={styles.posted}>
      Posted {displayTime[0]} {displayTime[1]} ago
    </p>
  );
};

export default PostedTime;
