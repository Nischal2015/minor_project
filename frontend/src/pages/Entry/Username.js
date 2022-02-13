import React from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";

// import axios from "axios";

import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import LoginInput from "../../components/UI/Input/LoginInput";

const UserDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
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

        {/* Username */}
        <LoginInput
          type='text'
          name='username'
          placeholder='Username'
          register={register}
          errors={errors}
        />
        <div className={styles.login__footer}>
          <Button type='submit'>Register</Button>
        </div>
      </Card>
    </form>
  );
};

export default UserDetails;
