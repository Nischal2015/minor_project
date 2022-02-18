import React, { useState, useEffect, useCallback } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import LoginInput from "../../components/UI/Input/LoginInput";
import Select from "react-select";

import axios from "axios";

import { useForm, Controller } from "react-hook-form";

import styles from "./Login.module.scss";

const PostJob = () => {
  const [categoryArr, setCategoryArr] = useState([]);
  const [skillArr, setSkillArr] = useState([]);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      project_title: "",
      project_description: "",
      // creation_date: null,
      project_length: null,
      budget_min: null,
      budget_max: null,
      // bid_deadline: null,
      job_category: null,
      // BidDeadTime: null,
      // ProjectFile: "",
      skills: [],
      creator: 1,
    },
  });

  const fetchCategory = useCallback(async () => {
    // setError(null);
    // setLoading(true);
    const responseCategory = await axios.get("/categories/");
    setCategoryArr(responseCategory.data);
    console.log(responseCategory.data);
    // try {
    //   // const responseUser = await axios.get(
    //   //   `/users/${responseProfile.data.user}`
    //   // );

    //   // setUser(responseUser.data);
    //   // setProfile(responseProfile.data);
    // } catch (error) {
    //   setError(true);
    //   console.log("Server error");
    // }
    // setLoading(false);
  }, []);

  ///project anusar ko skill haru dekhuna parxa project ma bhako skills haru arry of skill id ko form ma xa

  const fetchSkills = useCallback(async () => {
    // setError(null);
    // setLoading(true);
    const responseSkills = await axios.get("/skills/");
    // console.log(categoryArr);
    // const skillsInProject = responseSkills.data.filter((item)=>categoryArr["skills"].includes(item.id))
    setSkillArr(responseSkills.data);
    console.log(responseSkills.data);
    // try {
    //   // const responseUser = await axios.get(
    //   //   `/users/${responseProfile.data.user}`
    //   // );

    //   // setUser(responseUser.data);
    //   // setProfile(responseProfile.data);
    // } catch (error) {
    //   setError(true);
    //   console.log("Server error");
    // }
    // setLoading(false);
  }, []);

  const registerJob = async (formData) => {
    const skillFromForm = formData["skills"];
    const projectCatFromForm = formData["job_category"];
    const skillIdArr = skillFromForm.map((item) => item.id);
    formData.skills = skillIdArr;
    formData.job_category = projectCatFromForm.id;
    try {
      const response = await axios.post("/postJob/", formData);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);
  useEffect(() => {
    fetchSkills();
  }, [fetchCategory]);

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
        registerJob(data);
        // if (data.ProjectFile[0].size > 1 * 1024 * 1024)
        //   alert("File size is large");
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
            name="project_title"
            placeholder="Enter the title"
            register={register}
            errors={errors}
          />

          <Controller
            name="job_category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select Category"
                getOptionLabel={(option) => option.job_name}
                getOptionValue={(option) => option.id}
                options={categoryArr}
              />
            )}
            rules={{ required: true }}
          />
          {errors.job_category && (
            <p style={{ color: "red", marginTop: "0.8rem" }}>
              This field is required
            </p>
          )}

          {/* <LoginInput
            type="number"
            name="job_category"
            placeholder="Enter the category"
            register={register}
            errors={errors}
          /> */}

          <LoginInput
            type="number"
            name="project_length"
            placeholder="Project length in months"
            register={register}
            errors={errors}
          />

          <LoginInput
            type="number"
            name="budget_min"
            placeholder="Enter the minimum budget"
            register={register}
            errors={errors}
          />

          <LoginInput
            type="number"
            name="budget_max"
            placeholder="Enter the maximum budget"
            register={register}
            errors={errors}
          />

          {/* <LoginInput
            type="date"
            name="BidDeadline"
            placeholder="Enter the deadline for bid"
            register={register}
            errors={errors}
          /> */}

          {/* <LoginInput
            type="datetime-local"
            name="bid_deadline"
            placeholder="Enter the deadline for time"
            register={register}
            errors={errors}
          /> */}

          <textarea
            name="project_description"
            rows="4"
            cols="50"
            placeholder="Enter the description for the project"
            {...register("project_description", {
              required: true,
            })}
          />
          {errors.project_description && (
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

          {/* <LoginInput
            type="file"
            name="ProjectFile"
            placeholder="Add File"
            register={register}
            errors={errors}
          /> */}

          {/* <LoginInput
            type="number"
            name="skills"
            placeholder="Enter the skills"
            register={register}
            errors={errors}
          /> */}
          {/* <Select
            isMulti
            name="skills"
            options={skillArr}
            getOptionLabel={(option) => option.skill_name}
            getOptionValue={(option) => option.id}
            {...register("skills", {
              required: true,
            })}
          /> */}
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                placeholder="Select Skills"
                getOptionLabel={(option) => option.skill_name}
                getOptionValue={(option) => option.id}
                options={skillArr}
              />
            )}
            rules={{ required: true }}
          />
          {errors.skills && (
            <p style={{ color: "red", marginTop: "0.8rem" }}>
              This field is required
            </p>
          )}
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
