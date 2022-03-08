import React, { useState, useEffect, useCallback } from "react";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Container from "../../components/UI/Container/Container";
import NotFound from "../NotFound/NotFound";
import PostedTime from "../../components/SideList/PostedTime";
import Budget from "../../components/SideList/Budget";
import { FaMapMarkerAlt, FaClock, FaUser } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import styles from "./Bidding.module.scss";
import LoadingBouncer from "../../components/UI/Loading/LoadingBouncer";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
// import { getMemoizedId } from "../../store/auth-slice";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Bidding = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [bidExistList, setBidExistList] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const bidderId = useSelector((state) => state.auth.user?.id);
  // const abc = useSelector(getMemoizedId);

  const fetchJob = useCallback(async () => {
    console.log("fetch job running");
    setError(null);
    try {
      const responseJob = await axios.get(`/api/job/${id}/`);
      const responseProfile = await axios.get(
        `/api/profile/${responseJob.data.creator.id}/`
      );
      setJob(responseJob.data);
      setProfile(responseProfile.data);
    } catch (error) {
      setError(true);
    }
  }, [id]);

  const openModalHandler = () => {
    setOpenModal((prevValue) => !prevValue);
  };

  const fetchBids = useCallback(async () => {
    setBidExistList(null);
    try {
      const response = await axios.post("/api/bid-detail/", {
        bidderId,
        projectId: +id,
      });
      setBidExistList(response.data);
    } catch (error) {
      console.log(error);
      setBidExistList(false);
    }
  }, [bidderId, id]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  useEffect(() => {
    bidderId && fetchBids();
  }, [bidderId, fetchBids]);

  if (error) return <NotFound />;

  const {
    project_title,
    project_description,
    skills,
    budget_min,
    budget_max,
    creation_date,
    projectFile,
  } = job;

  const { country, created } = profile;
  let fullDate = new Date(created);
  let fullYear = fullDate.getFullYear();
  let month = fullDate.getMonth();
  let date = fullDate.getDate();
  return job.length !== 0 && profile.length !== 0 ? (
    <React.Fragment>
      <Modal
        open={openModal}
        openHandler={openModalHandler}
        projectId={id}
        data={bidExistList}
      />
      <Container className={styles.bid}>
        <section className={styles.bid__description}>
          <div className={styles.bid__heading}>
            <div className={styles.bid__title}>
              <h3 className={styles["bid__title--heading"]}>{project_title}</h3>

              <PostedTime
                posted={creation_date}
                className={styles["bid__title--posted"]}
              />
            </div>

            <div className={styles.bid__time}>
              <Budget budgetMin={budget_min} budgetMax={budget_max} />
            </div>
          </div>

          <p>{project_description}</p>
          <ul className={styles.bid__skills}>
            {skills &&
              skills.map((skill) => (
                <li key={skill.id}>
                  <Button variant='small outline'>{skill.skill_name}</Button>
                </li>
              ))}
          </ul>
        </section>

        <section className={styles.bid__client}>
          <h3 className={styles["bid__client--header"]}>About Client</h3>

          <div className={styles["bid__client--description"]}>
            <div className={styles["bid__client--flex"]}>
              <FaMapMarkerAlt />
              <p>{country}</p>
            </div>
            <div className={styles["bid__client--flex"]}>
              <FaUser />
            </div>
            <div className={styles["bid__client--flex"]}>
              <FaClock />
              <p>
                Member since
                {` ${monthNames[month]} ${date}, ${fullYear}`}
              </p>
            </div>
          </div>
        </section>
        <section className={styles.bid__documents}>
          <h4>Related Documents</h4>
          <div></div>
          <a
            href={`/static${projectFile}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            {projectFile}
          </a>
        </section>
        <section className={styles.bid__bids}>Your bids</section>

        <div className={styles["bid-button"]}>
          {bidExistList.length !== 0 ? (
            <Button variant='small tertiary' onClick={openModalHandler}>
              View Bid
            </Button>
          ) : (
            <Button variant='small' onClick={openModalHandler}>
              Place Bid
            </Button>
          )}
        </div>
      </Container>
    </React.Fragment>
  ) : (
    <LoadingBouncer />
  );
};

export default Bidding;
