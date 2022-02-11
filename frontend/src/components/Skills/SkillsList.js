import React from "react";
import Skills from "./Skills";

import styles from "./SkillsList.module.scss";

const SkillsList = ({ skills }) => {
  return (
    <ul className={styles.skills_list}>
      {skills.map((skill, indexer) => (
        <Skills key={indexer} skill={skill} />
      ))}
    </ul>
  );
};

export default SkillsList;
