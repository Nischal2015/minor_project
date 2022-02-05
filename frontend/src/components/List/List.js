import React from "react";
import SkillsList from "../Skills/SkillsList";

import { Link } from "react-router-dom";

import styles from "./List.module.scss";

const JobList = ({ id, jobheading, description, skills }) => {
  return (
    <React.Fragment>
      {id ? (
        <Link to={`${id}`} className={styles.link}>
          {jobheading}
        </Link>
      ) : (
        <h3 className={styles.list__heading}>{jobheading}</h3>
      )}

      <p className={styles.list__description}>{description}</p>
      <SkillsList skills={skills} />
    </React.Fragment>
  );
};

export default JobList;
