import React, { useState, useEffect } from "react";
import Card from "../../components/UI/Card/Card";
import Container from "../../components/UI/Container/Container";
import ProfileSummary from "../../components/ProfileComponents/ProfileSummary";
import LoadingSpinner from "../../components/UI/Loading/LoadingSpinner";
import ProfileInfo from "../../components/ProfileComponents/ProfileInfo";
import UserLink from "./UserLink";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../Profile/Profile.module.scss";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const username = useSelector((state) => state.auth.user?.username);
  const userId = useSelector((state) => state.auth.user?.id);
  let navigate = useNavigate();

  const fetchUserHandler = async (userId) => {
    setError(null);
    try {
      const responseProfile = await axios.post(`/api/user-profile/`, {
        userId,
      });
      setProfile(responseProfile.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    userId && fetchUserHandler(userId);
  }, [userId]);

  if (error)
    return <Navigate to='edit' state={{ profile: "none" }} replace={true} />;

  return !profile ? (
    <LoadingSpinner />
  ) : (
    <React.Fragment>
      <Container className={styles.profile__top}>
        <ProfileSummary profile={profile} username={username} />
        <section className={styles.profile__description}>
          <ProfileInfo
            profile={profile}
            username={username}
            onClick={() =>
              navigate(
                "edit",
                { state: { profile, text: "Edit" } },
                { replace: true }
              )
            }
          />
          <Card variant='boxy'>
            <UserLink />
            <Outlet />
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

export default UserProfile;
