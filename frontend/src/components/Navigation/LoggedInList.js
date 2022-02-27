import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import styles from "./LoggedInList.module.scss";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth-actions";
import { MdLogout, MdArrowDropDown } from "react-icons/md";
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
              <Link to='/' className={styles["dropdown__content--link"]}>
                <HiUser />
                <p>Profile</p>
              </Link>
            </li>
            <li className={styles["dropdown__content--norm"]}>
              <MdLogout />
              <p onClick={logOutHandler}>Logout</p>
            </li>
          </ul>

          {/* <Button style={style} variant='rounded' onClick={logOutHandler}>
            Logout
          </Button> */}
        </div>
      </div>
    )
  );
};

export default LoggedInList;
