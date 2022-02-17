import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";

import { useDispatch } from "react-redux";

import styles from "./Login.module.scss";
import { verifyUser } from "../../store/auth-actions";

const ActivateUser = () => {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activateUserHandler = () => {
    dispatch(verifyUser(uid, token));
    navigate("/login", { replace: true });
  };
  return (
    <Card className={styles.login} role='group' ariaLabelledBy='activate'>
      <div className={styles.login__header}>
        <h2 className='heading--secondary' id='activate'>
          Activate User
        </h2>
      </div>

      <Button onClick={activateUserHandler}>Activate</Button>
    </Card>
  );
};

export default ActivateUser;
