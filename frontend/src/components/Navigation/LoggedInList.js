import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import styles from "./LoggedInList.module.scss";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth-actions";
import { MdLogout, MdArrowDropDown, MdEditNote } from "react-icons/md";
import { HiUser } from "react-icons/hi";

const LoggedInList = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logout());
  };

  return (
    user && (
      <div className={styles.dropdown}>
        <div className={styles.dropdown__username}>
          <Avatar
            name={user.username}
            size='40px'
            textSizeRatio={2.25}
            alt='Name Initials Avatar'
            maxInitials={3}
          />
          <p className={styles.dropdown__user}>{`@${user.username}`}</p>
          <MdArrowDropDown />
        </div>

        <div className={styles.dropdown__content}>
          <ul className={styles["dropdown__content--list"]}>
            <li>
              <Link to='/profile' className={styles["dropdown__content--link"]}>
                <HiUser />
                <p>Profile</p>
              </Link>
            </li>

            <li>
              <Link to='/postjob' className={styles["dropdown__content--job"]}>
                <MdEditNote />
                <p>Post Job</p>
              </Link>
            </li>
            <li
              onClick={logOutHandler}
              className={styles["dropdown__content--norm"]}
            >
              <MdLogout />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>
    )
  );
};

export default LoggedInList;
