import React from "react";
import Button from "../Button/Button";
import LoginInput from "../Input/LoginInput";
import { useSelector } from "react-redux";
import axios from "axios";

import { useForm } from "react-hook-form";

import styles from "./PostBid.module.scss";

const PostBid = ({ projectId }) => {
  let userId = useSelector((state) => state.auth.user.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      project_define: null,
      bidder: userId,
      offered_amount: null,
      offered_duration: null,
      bid_description: "",
      bid_status: "P",
    },
  });

  const registerBid = async (formData) => {
    console.log(formData);
    const fData = new FormData();
    fData.append("project_define", projectId);
    fData.append("offered_amount", formData.offered_amount);
    fData.append("offered_duration", formData.offered_duration);
    fData.append("bid_description", formData.bid_description);
    fData.append("bidder", userId);
    fData.append("bid_status", "P");

    try {
      const response = await axios.post("/api/postBid/", fData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
        registerBid(data);
      })}
    >
      <div className={styles.login__description}>
        <LoginInput
          type='number'
          name='offered_duration'
          placeholder='Enter the duration to complete'
          register={register}
          errors={errors}
        />

        <LoginInput
          type='number'
          name='offered_amount'
          placeholder='Enter amount to earn from project'
          register={register}
          errors={errors}
        />

        <textarea
          name='bid_description'
          rows='4'
          cols='50'
          placeholder='Enter the description about you'
          {...register("bid_description", {
            required: true,
          })}
        />
        {errors.bid_description && (
          <p style={{ color: "red", marginTop: "0.8rem" }}>
            This field is required
          </p>
        )}

        <Button variant='small' type='submit'>
          Submit
        </Button>
      </div>
    </form>
  );
};

export default PostBid;
