import React from "react";
import SkillsList from "../Skills/SkillsList";

import styles from "./List.module.scss";

const JobList = ({
  jobheading,
  first_name,
  last_name,
  bio,
  description,
  skills,
}) => {
  return (
    <React.Fragment>
      <h3 className={styles.list__heading}>
        {jobheading || `${first_name} ${last_name}`}
      </h3>

      <p className={styles.list__description}>{description || bio}</p>
      {skills ? <SkillsList skills={skills} /> : <></>}
    </React.Fragment>
  );
};

export default JobList;
