import React from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";

import styles from "./Login.module.scss";
import "../../index.scss";

const Login = () => {
  return (
    <Card className={styles.login}>
      <div className={styles.login__header}>
        <h2 className='heading--secondary'>Kamao</h2>
        <span>Welcome to you</span>
      </div>
      <div className={styles.login__description}>
        <Input type='text' placeholder='Email or username' />
        <Input type='password' placeholder='Password' />
        <div className={styles.login__constraints}>
          <span>
            <input type='checkbox' />
            <span>Remember me</span>
          </span>
          <span>Forgot Password?</span>
        </div>
      </div>
      <div className={styles.login__footer}>
        <Button type='submit'>Login</Button>

        <div className={styles["login__footer--other"]}>
          <Button>Continue with Google</Button>
          <Button variant='small secondary'>Continue with Facebook</Button>
        </div>
      </div>
    </Card>
  );
};

export default Login;
