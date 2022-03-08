import React from "react";

const ViewBid = ({ data }) => {
  return (
    <div>
      <div>Description: {data.bid_description}</div>
      <div>Amount:{data.offered_amount}</div>
      <div>Duration:{data.offered_duration}</div>
    </div>
  );
};

export default ViewBid;
