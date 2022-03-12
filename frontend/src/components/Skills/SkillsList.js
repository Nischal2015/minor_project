import React from "react";
import Skills from "./Skills";

import styles from "./SkillsList.module.scss";

const SkillsList = ({ skills }) => {
  return (
    <ul className={styles.skills_list}>
      {skills.map((skill) => (
        <Skills key={skill.id} skill={skill.skill_name} />
      ))}
    </ul>
  );
};

export default SkillsList;
