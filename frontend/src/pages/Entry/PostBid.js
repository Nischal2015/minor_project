import React, { useState, useEffect, useCallback } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import LoginInput from "../../components/UI/Input/LoginInput";
import Select from "react-select";

import axios from "axios";

import { useForm, Controller } from "react-hook-form";

import styles from "./Login.module.scss";

const PostBid = () => {
  const [JobArr, setJobArr] = useState([]);
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      project_define: null,
      bidder: 1,
      offered_amount: null,
      offered_duration: null,
      bid_description: "",
      bid_status: "P",
    },
  });

  const fetchJobs = useCallback(async () => {
    const responseJob = await axios.get("/jobList/");
    setJobArr(responseJob.data);
    console.log(responseJob.data);
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

  //   const fetchSkills = useCallback(async () => {
  //     const responseSkills = await axios.get("/skills/");
  //     // console.log(categoryArr);
  //     // const skillsInProject = responseSkills.data.filter((item)=>categoryArr["skills"].includes(item.id))
  //     setSkillArr(responseSkills.data);
  //     console.log(responseSkills.data);
  //   }, []);

  const registerBid = async (formData) => {
    const projectFromForm = formData["project_define"];
    formData.project_define = projectFromForm.id;
    console.log(formData);
    const fData = new FormData();
    fData.append("project_define", formData.project_define);
    fData.append("offered_amount", formData.offered_amount);
    fData.append("offered_duration", formData.offered_duration);
    fData.append("bid_description", formData.bid_description);
    fData.append("bidder", 1);
    fData.append("bid_status", "P");
    console.log(fData);

    try {
      const response = await axios.post("/postBid/", fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  //   useEffect(() => {
  //     fetchSkills();
  //   }, [fetchCategory]);

  // This is used to reset the form on succesful submission
  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     reset({
  //       email: "",
  //       password: "",
  //     });
  //   }
  // }, [reset, isSubmitSuccessful]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        registerBid(data);
      })}
    >
      <Card className={styles.login} role="group" ariaLabelledBy="kamao">
        <div className={styles.login__header}>
          <h2 className="heading--secondary" id="kamao">
            Kamao
          </h2>
          <span>Bid For Project</span>
        </div>
        <div className={styles.login__description}>
          <Controller
            name="project_define"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                className={styles["form-control"]}
                placeholder="Select jobs to bid"
                getOptionLabel={(option) => option.project_title}
                getOptionValue={(option) => option.id}
                options={JobArr}
              />
            )}
            rules={{ required: true }}
          />
          {errors.project_define && (
            <p style={{ color: "red", marginTop: "0.8rem" }}>
              This field is required
            </p>
          )}

          <LoginInput
            type="number"
            name="offered_duration"
            placeholder="Enter the duration to complete"
            register={register}
            errors={errors}
          />

          <LoginInput
            type="number"
            name="offered_amount"
            placeholder="Enter amount to earn from project"
            register={register}
            errors={errors}
          />

          <textarea
            name="bid_description"
            rows="4"
            cols="50"
            placeholder="Enter the description about you"
            {...register("bid_description", {
              required: true,
            })}
          />
          {errors.bid_description && (
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

export default PostBid;
