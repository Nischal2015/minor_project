import React, { useState, useEffect, useCallback } from "react";

import Card from "../../components/UI/Card/Card";
import Container from "../../components/UI/Container/Container";
import NotFound from "../NotFound/NotFound";

import styles from "./Profile.module.scss";

import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/UI/Loading/LoadingSpinner";
import ProfileSummary from "../../components/ProfileComponents/ProfileSummary";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserHandler = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const responseProfile = await axios.get(`/api/profile/${id}/`);
      setProfile(responseProfile.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchUserHandler();
  }, [fetchUserHandler]);

  let username = profile?.user?.username;

  // const { reliability, punctual, communication, qualityWork } = rating;

  if (error) return <NotFound />;

  return loading ? (
    <LoadingSpinner />
  ) : (
    <React.Fragment>
      <Container className={styles.profile__top}>
        <ProfileSummary profile={profile} />
        <section className={styles.profile__description}>
          <ProfileInfo profile={profile} username={username} />
          <Card className={styles.profile__projects} variant='boxy'>
            Project Section
          </Card>
        </section>
      </Container>
      <Container>
        <Card className={styles.profile__reviews} variant='boxy'>
          <h3 className={styles.reviews__heading}>Reviews</h3>
          <div className={styles.reviews__projects}></div>
        </Card>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
