import axios from "axios";
import React from "react";
import Button from "../Button/Button";

const ViewBid = ({ data, openHandler }) => {
  let bidData = data?.bidData;
  let setBidders = data?.setBidders;
  const acceptBidHandler = async () => {
    try {
      const response = await axios.put("/api/bid-detail/", {
        bidderId: bidData[0].bidder,
        projectId: bidData[0].project_define,
        status: "A",
      });
      openHandler();
      setBidders(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectBidHandler = async () => {
    try {
      const response = await axios.put("/api/bid-detail/", {
        bidderId: bidData[0].bidder,
        projectId: bidData[0].project_define,
        status: "R",
      });
      openHandler();
      setBidders(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Description: {bidData[0]?.bid_description}</div>
      <div>Amount:{bidData[0]?.offered_amount}</div>
      <div>Duration:{bidData[0]?.offered_duration}</div>
      <div>Status:{bidData[0]?.bid_status}</div>
      <Button variant='small' onClick={acceptBidHandler}>
        Accept
      </Button>
      <Button variant='small tertiary' onClick={rejectBidHandler}>
        Reject
      </Button>
    </div>
  );
};

export default ViewBid;
