import React from "react";

import styles from "./Skills.module.scss";

const Skills = ({ skill }) => {
  return <li className={styles.list}>{skill}</li>;
};

export default Skills;
