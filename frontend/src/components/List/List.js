import React from "react";
import PropTypes from "prop-types";
import SkillsList from "../Skills/SkillsList";
import styles from "./List.module.scss";

const MAX_CHARACTER = 350;

const getContent = (description) => {
  return description.length > MAX_CHARACTER
    ? description.slice(0, MAX_CHARACTER) + "..."
    : description;
};

const JobList = ({
  project_title,
  first_name,
  last_name,
  bio,
  project_description,
  skills,
}) => {
  return (
    <>
      <h3 className={styles.list__heading}>
        {project_title || `${first_name} ${last_name}`}
      </h3>

      <p className={styles.list__description}>
        {(project_description && getContent(project_description)) ||
          (bio && getContent(bio))}
      </p>
      {skills ? <SkillsList skills={skills} /> : <></>}
    </>
  );
};

export default JobList;

JobList.propTypes = {
  jobheadng: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  bio: PropTypes.string,
  description: PropTypes.string,
  skills: PropTypes.array,
};
