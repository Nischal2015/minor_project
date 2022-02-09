import React, { useRef } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";

import axios from "axios";

import styles from "./Login.module.scss";

const Login = () => {
  const username = useRef();
  const password = useRef();
  const email = useRef();

  const registerUser = async (formData) => {
    try {
      const response = await axios.post("/register/", formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const formData = {
      password: password.current.value,
      username: username.current.value,
      email: email.current.value,
    };
    registerUser(formData);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Card className={styles.login} role='group' ariaLabelledBy='kamao'>
        <div className={styles.login__header}>
          <h2 className='heading--secondary' id='kamao'>
            Kamao
          </h2>
          <span>Welcome to you</span>
        </div>
        <div className={styles.login__description}>
          <Input
            type='email'
            placeholder='Email address'
            ariaRequired={true}
            reference={email}
            required={true}
          />
          <Input
            type='password'
            placeholder='Password'
            ariaRequired={true}
            reference={password}
            required={true}
          />
          <div className={styles.login__constraints}>
            <span>
              <input type='checkbox' id='remember' />
              <label htmlFor='remember'>Remember me</label>
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
    </form>
  );
};

export default Login;
