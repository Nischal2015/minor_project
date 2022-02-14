import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import LoginInput from "../../components/UI/Input/LoginInput";

import axios from "axios";

import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";

const PostJob = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      projectLength: null,
      MinBudget: null,
      MaxBudget: null,
      BidDeadline: null,
      BidDeadTime: null,
      Description: "",
      ProjectFile: "",
      Skills: "",
    },
  });

  const registerUser = async (formData) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/postJob/",
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // This is used to reset the form on succesful submission
  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset({
  //       email: "",
  //       password: "",
  //     });
  //   }
  // }, [reset, isSubmitSuccessful]);

  // const file = e.target.files[0];
  // if (file.size > 1 * 1024 * 1024) alert("File size is large");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        registerUser(data);
        if (data.ProjectFile[0].size > 1 * 1024 * 1024)
          alert("File size is large");
        // Later will be handled for fetching data from database
      })}
    >
      <Card className={styles.login} role="group" ariaLabelledBy="kamao">
        <div className={styles.login__header}>
          <h2 className="heading--secondary" id="kamao">
            Kamao
          </h2>
          <span>Project Posting</span>
        </div>
        <div className={styles.login__description}>
          {/* Email */}
          <LoginInput
            type="text"
            name="title"
            placeholder="Enter the title"
            register={register}
            errors={errors}
          />

          <LoginInput
            type="text"
            name="category"
            placeholder="Enter the category"
            register={register}
            errors={errors}
          />

          <LoginInput
            type="number"
            name="projectLength"
            placeholder="Project length in months"
            register={register}
            errors={errors}
          />

          <LoginInput
            type="number"
            name="MinBudget"
            placeholder="Enter the minimum budget"
            register={register}
            errors={errors}
          />

          <LoginInput
            type="number"
            name="MaxBudget"
            placeholder="Enter the maximum budget"
            register={register}
            errors={errors}
          />

          <LoginInput
            type="date"
            name="BidDeadline"
            placeholder="Enter the deadline for bid"
            register={register}
            errors={errors}
          />

          <LoginInput
            type="time"
            name="BidDeadTime"
            placeholder="Enter the deadline for time"
            register={register}
            errors={errors}
          />

          <textarea
            name="Description"
            rows="4"
            cols="50"
            placeholder="Enter the description for the project"
            {...register("Description", {
              required: true,
            })}
          />
          {errors.Description && (
            <p style={{ color: "red", marginTop: "0.8rem" }}>
              This field is required
            </p>
          )}

          {/* <LoginInput
            type="text"
            name="Description"
            placeholder="Enter the description for project"
            register={register}
            errors={errors}
          /> */}

          <LoginInput
            type="file"
            name="ProjectFile"
            placeholder="Add File"
            register={register}
            errors={errors}
          />

          <LoginInput
            type="text"
            name="Skills"
            placeholder="Enter the skills"
            register={register}
            errors={errors}
          />

          <Button type="submit">Post</Button>
        </div>
        {/* <div className={styles.login__footer}>
          <Button type="submit">Post</Button>
        </div> */}
      </Card>
    </form>
  );
};

export default PostJob;
