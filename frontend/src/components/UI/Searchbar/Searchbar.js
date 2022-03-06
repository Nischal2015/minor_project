import React, { useState } from "react";
import styles from "./Searchbar.module.scss";

import { MdSearch } from "react-icons/md";

const Searchbar = ({ value, onSearch = () => {}, variant }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const onChangeHandler = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className={styles.input}>
      <input
        type='text'
        value={searchTerm}
        className={styles.input__search}
        onChange={onChangeHandler}
        aria-label='Search'
        data-variant={variant || null}
        placeholder='Search'
      />
      <span className={styles["span--icon"]}>
        <MdSearch />
      </span>
    </div>
  );
};

export default Searchbar;
