import React from "react";
import { MdSearch } from "react-icons/md";
import styles from "./SearchNotFound.module.scss";

const SearchNotFound = ({ term }) => {
  return (
    <div className={styles["not-found"]}>
      <MdSearch className={styles["not-found__svg"]} />
      <h3 className={styles["not-found__heading"]}>No Matching {term} Found</h3>
      <p className={styles["not-found__message"]}>
        Please make sure your keywords are spelled correctly.
      </p>
    </div>
  );
};

export default SearchNotFound;
