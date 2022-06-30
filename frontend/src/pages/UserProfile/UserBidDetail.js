import React, { useState, useCallback, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import Budget from "../../components/SideList/Budget";
import Button from "../../components/UI/Button/Button";
import NotFound from "../NotFound/NotFound";
import PostedTime from "../../components/SideList/PostedTime";
import axios from "axios";
import Container from "../../components/UI/Container/Container";
import CircularRating from "../../components/UI/Ratings/CircularRatings/CircularRatings";
import Avatar from "react-avatar";
import Modal from "../../components/UI/Modal/Modal";
import List from "../../components/List/List";
import styles from "../Bidding/Bidding.module.scss";
import styles2 from "./UserBidDetail.module.scss";
import styles3 from "../Talent/Talent.module.scss";

const UserBidDetail = () => {
  const [job, setJob] = useState([]);
  const [bidders, setBidders] = useState([]);
  const [bidData, setBidData] = useState([]);
  const { id } = useParams();
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);
  const {
    project_title,
    project_description,
    skills,
    budget_min,
    budget_max,
    creation_date,
    projectFile,
  } = job;

  const fetchJob = useCallback(async () => {
    setError(null);
    try {
      const responseJob = await axios.get(`/api/job/${id}/`);
      setJob(responseJob.data);
    } catch (error) {
      setError(true);
    }
  }, [id]);

  const getBidders = useCallback(async () => {
    try {
      const responseBid = await axios.post("/api/project-bidder-list/", {
        projectId: id,
      });
      setBidders(responseBid.data);
    } catch (error) {
      setError(true);
    }
  }, [id]);

  const getBidDetail = useCallback(
    async (bidderId) => {
      try {
        const responseBidDetail = await axios.post("/api/bid-detail/", {
          bidderId,
          projectId: id,
        });
        setBidData(responseBidDetail.data);
      } catch (error) {
        console.log(error);
      }
    },
    [id]
  );

  const openModalHandler = (event) => {
    setOpenModal((prevValue) => !prevValue);
    event.target?.id && getBidDetail(event.target.id);
  };

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  useEffect(() => {
    getBidders();
  }, [getBidders]);

  if (error) return <NotFound />;

  return (
    <>
      <Modal
        open={openModal}
        openHandler={openModalHandler}
        projectId={id}
        data={{ bidData, setBidders }}
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
                  <Button variant="small outline">{skill.skill_name}</Button>
                </li>
              ))}
          </ul>
        </section>
        <section className={styles.bid__documents}>
          <h4>Related Documents</h4>
          <div />
          <a
            href={`/static${projectFile}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {projectFile}
          </a>
        </section>

        <section className={styles2["received-bids"]} />
      </Container>

      <Container>
        {bidders.map((props) => {
          const { user, rating, avatar, ...otherList } = props;
          return (
            <div className={styles3.list} key={user.id}>
              <picture className={styles3.list__picture}>
                <NavLink to={`/talent/${user.id}`}>
                  {avatar === null ? (
                    <Avatar
                      name={`${otherList.first_name} ${otherList.last_name}`}
                      round
                      size="100%"
                      textSizeRatio={2.25}
                      alt="Name Initials Avatar"
                      maxInitials={3}
                    />
                  ) : (
                    <Avatar
                      src={`/static/${avatar}`}
                      round
                      size="100%"
                      textSizeRatio={2.25}
                      alt="Profile Avatar"
                    />
                  )}
                </NavLink>
              </picture>
              <div className={styles3.list__text}>
                <List {...otherList} />
              </div>

              <div className={styles3.list__number}>
                {console.log(bidders.find((bidder) => bidder))}
                <CircularRating>{rating}</CircularRating>
                {bidders
                  .map((bidder) => bidder.bidder_bids[0])
                  .find((data) => data?.project_define === id)?.bid_status ===
                "A" ? (
                  <Button
                    id={user.id}
                    className={styles.list__more}
                    variant="small tertiary"
                    ariaLabel="Get access to your room"
                  >
                    View Project Activity
                  </Button>
                ) : (
                  <Button
                    id={user.id}
                    className={styles.list__more}
                    onClick={openModalHandler}
                    variant="small"
                    ariaLabel="See more detail about the freelancer"
                  >
                    View Bid
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </Container>
    </>
  );
};

export default UserBidDetail;
