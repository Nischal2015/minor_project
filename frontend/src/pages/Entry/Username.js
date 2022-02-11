import React from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";

// import axios from "axios";

import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import styles2 from "../../components/UI/Input/Input.module.scss";

const UserDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        // Later will be handled for fetching data from database
      })}
    >
      <Card className={styles.login} role='group' ariaLabelledBy='kamao'>
        <div className={styles.login__header}>
          <h2 className='heading--secondary' id='kamao'>
            Kamao
          </h2>
        </div>
        <div className={styles.login__description}>
          {/* Username */}
          <div className={styles["form-control"]}>
            <input
              className={styles2.input__text}
              type='text'
              name='username'
              placeholder='Username'
              aria-required='true'
              {...register("username", { required: true })}
            />

            {errors.username && (
              <p className={styles["login__description--error"]}>
                This field is required
              </p>
            )}
          </div>
        </div>
        <div className={styles.login__footer}>
          <Button type='submit'>Register</Button>
        </div>
      </Card>
    </form>
  );
};

export default UserDetails;
