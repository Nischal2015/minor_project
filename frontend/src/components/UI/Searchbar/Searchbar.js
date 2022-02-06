import React from "react";
import styles from "./Searchbar.module.scss";

import { MdSearch } from "react-icons/md";

const Searchbar = ({ value, onSearch }) => {
  return (
    <div className={styles.input}>
      <input
        type='text'
        value={value}
        className={styles.input__search}
        onChange={onSearch}
      />
      <span className={styles["span--icon"]}>
        <MdSearch />
      </span>
    </div>
  );
};

export default Searchbar;
