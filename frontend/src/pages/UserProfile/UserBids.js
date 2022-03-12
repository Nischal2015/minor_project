import React, { useState, useEffect, useCallback } from "react";
import styles from "../Jobs/Jobs.module.scss";
import LoadingBouncer from "../../components/UI/Loading/LoadingBouncer";
import Budget from "../../components/SideList/Budget";
import List from "../../components/List/List";
import PostedTime from "../../components/SideList/PostedTime";
import { CustomNavLink } from "../../components/UI/CustomLink/CustomLink";
import axios from "axios";
import Searchbar from "../../components/UI/Searchbar/Searchbar";
import { useSelector } from "react-redux";

const UserBids = () => {
  const [userJobs, setUserJobs] = useState(null);
  const [printUserJobs, setPrintUserJobs] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const bidderId = useSelector((state) => state.auth.user?.id);

  const fetchUserJobs = useCallback(async () => {
    try {
      const response = await axios.post("/api/bidList/", { bidderId });
      setPrintUserJobs(response.data);
      setUserJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [bidderId]);

  const searchDataHandler = useCallback(() => {
    const updatedItems =
      userJobs &&
      userJobs.filter((job) =>
        job.project_title.toLowerCase().includes(searchTerm)
      );
    setPrintUserJobs(updatedItems);
  }, [userJobs, searchTerm]);

  useEffect(() => {
    fetchUserJobs();
  }, [fetchUserJobs]);

  useEffect(() => {
    searchDataHandler();
  }, [searchDataHandler]);

  return (
    <div
      className={styles.results}
      style={{ overflowY: "scroll", height: "800px" }}
    >
      <div className={styles.results__list}>
        <Searchbar
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {!userJobs ? (
          <LoadingBouncer />
        ) : (
          printUserJobs.map(
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
                    to={`/jobs/${id}`}
                    variant='small primary'
                    ariaLabel='See more detail about the job'
                  >
                    See More
                  </CustomNavLink>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default UserBids;
