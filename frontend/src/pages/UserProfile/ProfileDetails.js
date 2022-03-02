import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import LoginInput from "../../components/UI/Input/LoginInput";
import Input from "../../components/UI/Input/Input";
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
  const uid = useSelector((state) => state.auth.user.username);
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Username is required"),
    profileTitle: Yup.string().required("Username is required"),
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
    try {
      const response = await axios.post("/api/user-profile/edit/", data, {
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
        const formData = new FormData();
        formData.append("user", uid);
        formData.append("first_name", data.firstname);
        formData.append("last_name", data.lastname);
        formData.append("avatar", data?.avatar ? data?.avatar[0] : null);
        formData.append("profile_title", data.profileTitle);
        formData.append("bio", data.bio);
        formData.append("dob", data.dob);
        formData.append("country", data.country);
        formData.append("city", data?.city || null);
        formData.append("state", data?.state || null);
        console.log(formData);

        sendUserData(formData);
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
          <Input type='file' name='avatar' placeholder='Avatar' />
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
          <Input name='state' placeholder='State' />
          <Input type='text' name='city' placeholder='City' />
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
