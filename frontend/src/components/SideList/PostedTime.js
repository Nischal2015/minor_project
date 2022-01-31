import React from "react";

import styles from "./PostedTime.module.scss";

const PostedTime = ({ posted }) => {
  return <p className={styles.posted}>{posted}</p>;
};

export default PostedTime;
