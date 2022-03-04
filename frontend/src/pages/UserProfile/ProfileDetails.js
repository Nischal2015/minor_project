import React, { useState, useEffect } from "react";
import Button from "../../components/UI/Button/Button";
import Card from "../../components/UI/Card/Card";
import LoginInput from "../../components/UI/Input/LoginInput";
import axios from "axios";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import Select from "react-select";
import { Navigate, useLocation } from "react-router-dom";
import styles from "../Entry/Login.module.scss";
import LoadingSlider from "../../components/UI/Loading/LoadingSlider";
import { alertActions } from "../../store/alert-slice";

const ProfileDetails = () => {
  const [skillArr, setSkillArr] = useState([]);
  const uid = useSelector((state) => state.auth.user?.id);
  const isProcessing = useSelector((state) => state.auth.isProcessing);
  const [profileCreationSuccess, setProfileCreationSuccess] = useState(false);
  const dispatch = useDispatch();
  let location = useLocation();
  let profile = location.state?.profile;
  console.log(profile?.avatar);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .default(profile?.first_name || "")
      .required("Firstname is required"),
    lastname: Yup.string()
      .default(profile?.last_name || "")
      .required("Username is required"),
    profileTitle: Yup.string()
      .default(profile?.profile_title || "")
      .required("Username is required"),
    avatar: Yup.mixed(),
    bio: Yup.string()
      .default(profile?.bio || "")
      .required("Username is required"),
    dob: Yup.date()
      .required("DOB is required")
      .max(new Date(), "Not a valid date"),
    country: Yup.string()
      .default(profile?.country || "")
      .required("Country is required"),
    hourlyRate: Yup.number()
      .typeError("you must specify a number")
      .default(profile?.hourly_rate)
      .required("Hourly Rate is required"),
    hoursPerWeek: Yup.number()
      .typeError("you must specify a number")
      .default(profile?.hours_per_week)
      .required("Hourly per Week is required"),
    state: Yup.string().default(profile?.state || ""),
    city: Yup.string().default(profile?.city || ""),
    skills: Yup.mixed().default(
      profile?.skills ? profile.skills.map((item) => item) : ""
    ),
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: validationSchema.cast(),
  };

  const fetchSkills = async () => {
    const responseSkills = await axios.get("/api/skills/");
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

  const dateConvert = (dob) => {
    let today = new Date(dob);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };

  const sendUserData = async (data) => {
    const formData = new FormData();
    const skillsIdArr = data["skills"].map((item) => item.id);

    formData.append("user", uid);
    formData.append("first_name", data.firstname);
    formData.append("last_name", data.lastname);
    formData.append("avatar", data.avatar.length === 0 ? "" : data.avatar[0]);
    formData.append("profile_title", data.profileTitle);
    formData.append("bio", data.bio);
    formData.append("dob", dateConvert(data.dob));
    formData.append("country", data.country);
    formData.append("city", data?.city || null);
    formData.append("state", data?.state || null);
    formData.append("skills", skillsIdArr);
    formData.append("hourly_rate", data.hourlyRate);
    formData.append("hours_per_week", data.hoursPerWeek);

    const configuration = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };

    try {
      const request = profile === "none" ? axios.post : axios.put;
      const response = await request(
        "/api/user-profile/edit/",
        formData,
        configuration
      );
      console.log(response.data);
      dispatch(
        alertActions.success("Your profile has been successfully updated")
      );
      setProfileCreationSuccess(true);
    } catch (error) {
      console.log(error);
      dispatch(alertActions.error("Failed to update your profile"));
    }
  };

  return (
    <Card className={styles.login} role='group' ariaLabelledBy='kamao'>
      {isProcessing && <LoadingSlider />}
      {profileCreationSuccess && <Navigate to='/profile' replace={true} />}
      <div className={styles.login__header}>
        <h2 className='heading--secondary' id='kamao'>
          Kamao
        </h2>
        <span>Welcome to you</span>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          sendUserData(data);
        })}
      >
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
            Save Profile
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProfileDetails;
