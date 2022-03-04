import React, { useEffect, useState, useCallback } from "react";
import styles from "../Jobs/Jobs.module.scss";
import LoadingBouncer from "../../components/UI/Loading/LoadingBouncer";
import Budget from "../../components/SideList/Budget";
import List from "../../components/List/List";
import PostedTime from "../../components/SideList/PostedTime";
import { CustomNavLink } from "../../components/UI/CustomLink/CustomLink";

import axios from "axios";

import { useSelector } from "react-redux";

const UserJobPosts = () => {
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const creatorId = useSelector((state) => state.auth.user?.id);
  const username = useSelector((state) => state.auth.user?.username);

  const fetchUserJobs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/jobs/", { creatorId, username });
      setUserJobs(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [creatorId, username]);

  useEffect(() => {
    fetchUserJobs();
  }, [fetchUserJobs]);

  return (
    <div
      className={styles.results}
      style={{ overflowY: "scroll", height: "800px" }}
    >
      <div className={styles.results__list}>
        {loading ? (
          <LoadingBouncer />
        ) : (
          userJobs.map(
            ({ id, budget_min, budget_max, creation_date, ...jobList }) => (
              <div className={styles.list} key={id}>
                <div className={styles.list__text}>
                  <List id={id} {...jobList} />
                </div>

                <div className={styles.list__number}>
                  <Budget budgetMin={budget_min} budgetMax={budget_max} />
                  <PostedTime posted={creation_date} />
                  <CustomNavLink
                    className={styles.list__more}
                    to={`${id}`}
                    variant='small primary'
                    ariaLabel='See more detail about the freelancer'
                  ></CustomNavLink>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default UserJobPosts;
