import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import LoginInput from "../../components/UI/Input/LoginInput";
import axios from "axios";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";

import Select from "react-select";

import styles from "../Entry/Login";
import LoadingSlider from "../../components/UI/Loading/LoadingSlider";

const ProfileDetails = () => {
  const [skillArr, setSkillArr] = useState([]);
  const uid = useSelector((state) => state.auth.user?.id);
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Username is required"),
    profileTitle: Yup.string().required("Username is required"),
    avatar: Yup.mixed(),
    bio: Yup.string().required("Username is required"),
    dob: Yup.date()
      .required("DOB is required")
      .max(new Date(), "Not a valid date"),
    country: Yup.string().required("Country is required"),
    hourlyRate: Yup.number()
      .typeError("you must specify a number")
      .required("Hourly Rate is required"),
    hoursPerWeek: Yup.number()
      .typeError("you must specify a number")
      .required("Hourly per Week is required"),
    state: Yup.string(),
    city: Yup.string(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const fetchSkills = async () => {
    const responseSkills = await axios.get("/api/skills/");
    // console.log(categoryArr);
    // const skillsInProject = responseSkills.data.filter((item)=>categoryArr["skills"].includes(item.id))
    setSkillArr(responseSkills.data);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const isProcessing = useSelector((state) => state.auth.isProcessing);

  const sendUserData = async (data) => {
    console.log(data);
    const formData = new FormData();
    const skillsIdArr = data["skills"].map((item) => item.id);
    let today = new Date(data.dob);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    let dob = yyyy + "-" + mm + "-" + dd;

    formData.append("user", uid);
    formData.append("first_name", data.firstname);
    formData.append("last_name", data.lastname);
    formData.append("avatar", data.avatar.length === 0 ? "" : data.avatar[0]);
    formData.append("profile_title", data.profileTitle);
    formData.append("bio", data.bio);
    formData.append("dob", dob);
    formData.append("country", data.country);
    formData.append("city", data?.city || null);
    formData.append("state", data?.state || null);
    formData.append("skills", skillsIdArr);
    formData.append("hourly_rate", data.hourlyRate);
    formData.append("hours_per_week", data.hoursPerWeek);
    console.log(formData);
    console.log(data.avatar.length);

    try {
      const response = await axios.put("/api/user-profile/edit/", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Return Statement
  return (
    <form
      onSubmit={handleSubmit((data) => {
        sendUserData(data);
      })}
    >
      <Card className={styles.login} role='group' ariaLabelledBy='kamao'>
        {isProcessing && <LoadingSlider />}
        <div className={styles.login__header}>
          <h2 className='heading--secondary' id='kamao'>
            Kamao
          </h2>
          <span>Welcome to you</span>
        </div>
        <div className={styles.login__description}>
          {/* Firstname */}
          <LoginInput
            name='firstname'
            placeholder='Firstname'
            register={register}
            errors={errors}
          />
          <LoginInput
            name='lastname'
            placeholder='Lastname'
            register={register}
            errors={errors}
          />

          <input
            type='file'
            name='avatar'
            accept='image/*'
            placeholder='Avatar'
            {...register("avatar")}
          />

          <LoginInput
            name='profileTitle'
            placeholder='Profile Title'
            register={register}
            errors={errors}
          />
          <textarea name='bio' placeholder='Bio' {...register("bio")} />
          <LoginInput
            type='date'
            name='dob'
            placeholder='DOB'
            register={register}
            errors={errors}
          />
          <LoginInput
            name='country'
            placeholder='Country'
            register={register}
            errors={errors}
          />
          <LoginInput
            name='state'
            placeholder='State'
            register={register}
            errors={errors}
          />
          <LoginInput
            name='city'
            placeholder='City'
            register={register}
            errors={errors}
          />
          <Controller
            name='skills'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isMulti
                placeholder='Select skills for the project'
                getOptionLabel={(option) => option.skill_name}
                getOptionValue={(option) => option.id}
                options={skillArr}
              />
            )}
            rules={{ required: true }}
          />
          <LoginInput
            type='number'
            name='hourlyRate'
            placeholder='Hourly Rate'
            register={register}
            errors={errors}
          />
          <LoginInput
            type='number'
            name='hoursPerWeek'
            placeholder='Hours Per Week'
            register={register}
            errors={errors}
          />
        </div>
        <div className={styles.login__footer}>
          <Button type='submit' disabled={isProcessing}>
            Login
          </Button>
        </div>
      </Card>
    </form>
  );
};

export default ProfileDetails;
