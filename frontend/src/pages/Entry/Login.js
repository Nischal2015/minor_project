import React from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import Container from "../../components/UI/Container/Container";

import styles from "./Login.module.scss";
import styles2 from "../../index.module.scss";

const Login = () => {
  return (
    <Container>
      <Card className={styles.login}>
        <div className={styles.login__header}>
          <h2 className={styles2.heading__secondary}>Kamao</h2>
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
            <Button className='btn--full'>Continue with Google</Button>
            <Button className='btn--full'>Continue with Facebook</Button>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
