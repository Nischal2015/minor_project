import React from "react";
import styles from "./Searchbar.module.scss";

import SearchIcon from "@mui/icons-material/Search";

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
        <SearchIcon />
      </span>
    </div>
  );
};

export default Searchbar;
