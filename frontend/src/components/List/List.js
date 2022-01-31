import React from "react";
import SkillsList from "../Skills/SkillsList";

import styles from "./List.module.scss";

const JobList = ({ jobheading, description, skills }) => {
  return (
    <React.Fragment>
      <h3 className={styles.list__heading}>{jobheading}</h3>
      <p className={styles.list__description}>{description}</p>
      <SkillsList skills={skills} />
    </React.Fragment>
  );
};

export default JobList;
