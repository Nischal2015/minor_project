import React from "react";

import styles from "./PostedTime.module.scss";

const PostedTime = ({ posted, className }) => {
  const creationDate = Date.parse(posted);
  const time = Date.now();

  const calculateTime = () => {
    const postedAgo = time - creationDate;
    if (postedAgo < 6e4) {
      const postedTime = Math.floor(postedAgo / 1000);
      return [postedTime, "seconds"];
    } else if (postedAgo < 3.6e6) {
      const postedTime = Math.floor(postedAgo / 6e4);
      return [postedTime, postedTime === 1 ? "minute" : "minutes"];
    } else if (postedAgo < 8.64e7) {
      const postedTime = Math.floor(postedAgo / 3.6e6);
      return [postedTime, postedTime === 1 ? "hour" : "hours"];
    } else if (postedAgo < 2.628e9) {
      const postedTime = Math.floor(postedAgo / 8.64e7);
      return [postedTime, postedTime === 1 ? "day" : "days"];
    } else if (postedAgo < 3.154e10) {
      const postedTime = Math.floor(postedAgo / 2.628e9);
      return [postedTime, postedTime === 1 ? "month" : "months"];
    } else {
      const postedTime = Math.floor(postedAgo / 3.154e10);
      return [postedTime, postedTime === 1 ? "year" : "years"];
    }
  };

  const displayTime = calculateTime();

  return (
    <p className={`${styles.posted} ${className || ""}`}>
      Posted {displayTime[0]} {displayTime[1]} ago
    </p>
  );
};

export default PostedTime;
