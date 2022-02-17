import React from "react";
import Avatar from "react-avatar";
import Button from "../UI/Button/Button";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

const LoggedInList = () => {
  const style = { fontSize: "1.4rem" };
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(authActions.logOut());
  };

  return (
    user && (
      <React.Fragment>
        <li>
          <Avatar
            name={user.username}
            size='40px'
            textSizeRatio={2.25}
            alt='Name Initials Avatar'
            maxInitials={3}
          />
        </li>
        <li>
          <Button style={style} variant='rounded' onClick={logOutHandler}>
            Logout
          </Button>
        </li>
      </React.Fragment>
    )
  );
};

export default LoggedInList;
